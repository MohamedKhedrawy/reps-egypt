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
        const article = await db.collection('news').findOne(
            { _id: new ObjectId(id) },
            { projection: { imageUrl: 1 } }
        );

        if (!article || !article.imageUrl) {
            return new NextResponse('Not Found', { status: 404 });
        }

        const image = article.imageUrl;

        // Case 1: Base64 string
        if (image.startsWith('data:image')) {
            const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
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

        // Case 2: URL
        if (image.startsWith('http')) {
            return NextResponse.redirect(image);
        }

        return new NextResponse('Not Found', { status: 404 });

    } catch (error) {
        console.error('[API] Error serving news image:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
