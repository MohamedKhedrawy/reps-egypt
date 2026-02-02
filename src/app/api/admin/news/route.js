import { NextResponse } from 'next/server';
import { getNewsArticles, createNewsArticle } from '@/lib/news';

export async function GET() {
    try {
        const articles = await getNewsArticles();
        
        const formatted = articles.map(article => ({
            id: article._id.toString(),
            title: article.title,
            category: article.category,
            description: article.description,
            imageUrl: article.imageUrl,
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
        const { title, category, description, imageUrl, isPublished } = body;

        if (!title || !category || !description) {
            return NextResponse.json(
                { error: 'Title, category, and description are required' },
                { status: 400 }
            );
        }

        const result = await createNewsArticle({
            title,
            category,
            description,
            imageUrl,
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
