import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        
        if (!id || !ObjectId.isValid(id)) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(id) },
            { projection: { profilePhoto: 1, fullName: 1 } }
        );

        // Case 1: No user or no photo -> Redirect to UI Avatars
        if (!user || !user.profilePhoto) {
            const name = user?.fullName || 'User';
            return NextResponse.redirect(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dc2626&color=fff`);
        }

        const photo = user.profilePhoto;

        // Case 2: Photo is a Base64 string
        if (photo.startsWith('data:image')) {
            const matches = photo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                const contentType = matches[1];
                const buffer = Buffer.from(matches[2], 'base64');

                return new NextResponse(buffer, {
                    headers: {
                        'Content-Type': contentType,
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                });
            }
        }

        // Case 3: Photo is a URL (e.g. from Google Auth or external)
        if (photo.startsWith('http')) {
            return NextResponse.redirect(photo);
        }

        // Fallback
        return NextResponse.redirect(`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=dc2626&color=fff`);

    } catch (error) {
        console.error('[API] Error serving photo:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
