import { NextResponse } from 'next/server';
import { getNewsArticles, createNewsArticle } from '@/lib/news';
import { newsSchema } from '@/lib/schemas';

export async function GET() {
    try {
        const articles = await getNewsArticles();
        
        const formatted = articles.map(article => ({
            id: article._id.toString(),
            title: article.title,
            category: article.category,
            description: article.description,
            content: article.content,
            imageUrl: article.imageUrl,
            image: article.image,
            images: article.images || [],
            isPublished: article.isPublished,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
        }));

        return NextResponse.json({ articles: formatted });
    } catch (error) {
        console.error('News list error:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const userRole = request.headers.get('x-user-role');

        // Security: Explicit Role Check
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized: Admins only' }, { status: 403 });
        }

        // Validate with Zod
        const validation = newsSchema.safeParse(body);
        if (!validation.success) {
            const firstError = validation.error.errors[0];
            return NextResponse.json(
                { error: `Invalid ${firstError.path[0]}: ${firstError.message}` },
                { status: 400 }
            );
        }

        const { title, category, description, content, imageUrl, images, isPublished } = validation.data;

        const result = await createNewsArticle({
            title,
            category,
            description,
            content,
            imageUrl,
            images,
            isPublished: isPublished ?? true,
        });

        return NextResponse.json(
            { message: 'Article created', id: result.insertedId.toString() },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create news error:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
