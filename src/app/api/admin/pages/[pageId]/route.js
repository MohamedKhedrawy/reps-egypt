import { NextResponse } from 'next/server';
import { updatePageVisibility, getPageSetting } from '@/lib/pageSettings';

/**
 * GET: Fetch single page setting
 */
export async function GET(request, { params }) {
    try {
        const { pageId } = await params;
        const page = await getPageSetting(pageId);
        
        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json({ page });
    } catch (error) {
        console.error('Get page setting error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch page setting' },
            { status: 500 }
        );
    }
}

/**
 * PATCH: Update page visibility
 */
export async function PATCH(request, { params }) {
    try {
        const { pageId } = await params;
        const { isVisible } = await request.json();
        const adminId = request.headers.get('x-user-id');

        if (typeof isVisible !== 'boolean') {
            return NextResponse.json(
                { error: 'isVisible must be a boolean' },
                { status: 400 }
            );
        }

        await updatePageVisibility(pageId, isVisible, adminId);
        
        return NextResponse.json({ 
            message: `Page ${isVisible ? 'shown' : 'hidden'} successfully`,
            pageId,
            isVisible
        });
    } catch (error) {
        console.error('Update page visibility error:', error);
        return NextResponse.json(
            { error: 'Failed to update page visibility' },
            { status: 500 }
        );
    }
}
