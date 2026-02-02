import { NextResponse } from 'next/server';
import { getNewsById, updateNewsArticle, deleteNewsArticle } from '@/lib/news';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const article = await getNewsById(id);
        
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({
            article: { ...article, id: article._id.toString() }
        });
    } catch (error) {
        console.error('Get article error:', error);
        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        
        await updateNewsArticle(id, body);
        return NextResponse.json({ message: 'Article updated successfully' });
    } catch (error) {
        console.error('Update article error:', error);
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await deleteNewsArticle(id);
        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Delete article error:', error);
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}
