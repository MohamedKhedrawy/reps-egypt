import { NextResponse } from 'next/server';
import { createQualificationChange } from '@/lib/qualifications';
import { findUserById } from '@/lib/user';

export async function POST(request) {
    try {
        const userId = request.headers.get('x-user-id');
        
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { newQualifications, newSpecialization } = body;

        if ((!newQualifications || newQualifications.length === 0) && !newSpecialization) {
             return NextResponse.json({ error: 'No qualifications or specialization provided' }, { status: 400 });
        }

        const user = await findUserById(userId);
        if (!user) {
             return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Create the change request
        await createQualificationChange(
            userId, 
            user.uploadedFiles || [], // Previous files
            newQualifications || user.uploadedFiles || [], // New files or keep old if only spec changed? 
            // If newQualifications is null, we assume no file changes? 
            // Better logic: pass what changed.
            // If I pass current files as new, it implies no change?
            // Actually createQualificationChange signature is (trainerId, prevQuals, newQuals, newSpec)
            // If newQuals is null/undefined, it might break if logic assumes array.
            // Let's pass null if not provided, and handle in lib (lib handles optional).
            newQualifications, 
            newSpecialization
        );

        return NextResponse.json({ message: 'Qualification change request submitted' });

    } catch (error) {
        console.error('Qualification request error:', error);
        return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }
}
