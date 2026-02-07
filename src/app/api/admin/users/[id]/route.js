import { NextResponse } from 'next/server';
import { findUserById, updateUser, updateUserStatus, deleteUser } from '@/lib/user';
import { verifyPassword, hashPassword } from '@/lib/auth';
import { userUpdateSchema, passwordChangeSchema } from '@/lib/schemas';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const user = await findUserById(id);
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { password, ...userData } = user;
        return NextResponse.json({ user: { 
            ...userData, 
            id: user._id?.toString ? user._id.toString() : user._id,
            alerts: user.alerts || [],
            activityNotes: user.activityNotes || []
        } });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const adminId = request.headers.get('x-user-id');
        const userRole = request.headers.get('x-user-role');

        // Defense in Depth: Role Check
        // Allow if admin OR if mapping to same user (self-update)
        // Note: Proxy handles this generally, but explicit check is safer.
        if (userRole !== 'admin' && adminId !== id) {
             return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 403 });
        }

        // Check if this is a status update
        if (body.status && ['approved', 'rejected', 'pending'].includes(body.status)) {
            // Only admins can change status
            if (userRole !== 'admin') {
                return NextResponse.json({ error: 'Unauthorized: Only admins can change status' }, { status: 403 });
            }
            await updateUserStatus(id, body.status, adminId);
            return NextResponse.json({ message: `User ${body.status} successfully` });
        }

        // Check if this is a password update request
        if (body.newPassword) {
             const user = await findUserById(id);
             if (!user) {
                 return NextResponse.json({ error: 'User not found' }, { status: 404 });
             }

             // Validate password change payload
             const passwordValidation = passwordChangeSchema.safeParse(body);
             if (!passwordValidation.success) {
                 const firstError = passwordValidation.error.errors[0];
                 return NextResponse.json({ error: firstError.message }, { status: 400 });
             }

             // Scenario A: User updating their own password (requires currentPassword)
             if (body.currentPassword) {
                 const isValid = await verifyPassword(body.currentPassword, user.password);
                 if (!isValid) {
                     return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
                 }
             } 
             
             const hashedPassword = await hashPassword(body.newPassword);
             await updateUser(id, { password: hashedPassword });
             
             return NextResponse.json({ message: 'Password updated successfully' });
        }

        // Otherwise update user data
        // Validate with userUpdateSchema
        // For simplicity and safety: 
        // 1. Strip sensitive fields (status, password, role) from body manually
        // 2. Validate the rest
        // 3. Remove empty strings and undefined values
        
        const { status, password, role, ...potentialUpdateData } = body;
        
        // Clean up empty values before validation
        const cleanedData = Object.entries(potentialUpdateData).reduce((acc, [key, value]) => {
            // Skip empty strings, but allow null and 0
            if (value === '' || value === undefined) {
                return acc;
            }
            // For socialMedia object, clean up nested empty strings
            if (key === 'socialMedia' && typeof value === 'object') {
                acc[key] = Object.entries(value).reduce((mediaAcc, [mediaKey, mediaValue]) => {
                    if (mediaValue !== '' && mediaValue !== undefined) {
                        mediaAcc[mediaKey] = mediaValue;
                    }
                    return mediaAcc;
                }, {});
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        
        // Run schema validation on cleaned data
        const updateValidation = userUpdateSchema.safeParse(cleanedData);
        
        if (!updateValidation.success) {
             const firstError = updateValidation.error.errors[0];
             console.error('Validation error:', firstError);
             return NextResponse.json({ error: `Invalid ${firstError.path[0]}: ${firstError.message}` }, { status: 400 });
        }

        // Use the validated data from Zod to ensure only whitelisted fields are updated
        const safeUpdateData = updateValidation.data;
        
        try {
            await updateUser(id, safeUpdateData);
            return NextResponse.json({ message: 'User updated successfully' });
        } catch (dbError) {
            console.error('Database update error:', dbError);
            return NextResponse.json({ error: 'Failed to update user in database' }, { status: 500 });
        }
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await deleteUser(id);
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
