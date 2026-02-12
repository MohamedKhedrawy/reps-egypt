import { NextResponse } from 'next/server';
import { getPendingUsers } from '@/lib/user';
import { getPendingQualificationChanges } from '@/lib/qualifications';

export async function GET() {
    try {
        const [pendingUsers, pendingQualifications] = await Promise.all([
            getPendingUsers(),
            getPendingQualificationChanges()
        ]);
        
        // Format users
        const formattedUsers = pendingUsers.map(user => ({
            id: user._id.toString(),
            name: user.fullName,
            email: user.email,
            phone: user.phone || null,
            birthDate: user.birthDate || null,
            age: user.age || null,
            gender: user.gender || null,
            governorate: user.governorate || null,
            repsId: user.repsId || null,
            specialization: user.specialization || null,
            profilePhoto: user.profilePhoto || null,
            socialMedia: user.socialMedia || null,
            uploadedFiles: user.uploadedFiles || user.certifications || null,
            role: user.role || 'trainer',
            type: 'Trainer Application',
            info: user.specialization || 'Not specified',
            date: user.createdAt,
            rawDate: user.createdAt,
            actionType: 'user'
        }));

        // Format qualifications
        const formattedQualifications = pendingQualifications.map(change => ({
            id: change._id.toString(),
            name: change.trainerName,
            email: change.trainerEmail,
            type: 'Qualification Update', // Distinguisher
            info: `${change.previousQualifications?.length || 0} → ${change.newQualifications?.length || 0} certs`,
            newSpecialization: change.newSpecialization, // Pass specifically for UI
            date: change.createdAt,
            rawDate: change.createdAt,
            // Action needed is 'approve_qualification'
            actionType: 'qualification'
        }));

        // Combine and sort by date (newest first)
        const allPending = [...formattedUsers, ...formattedQualifications]
            .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
            .map(item => ({
                ...item,
                date: item.date ? new Date(item.date).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', year: 'numeric' 
                }) : 'Unknown'
            }));

        return NextResponse.json({ pending: allPending });
    } catch (error) {
        console.error('Pending approvals error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pending approvals' },
            { status: 500 }
        );
    }
}

