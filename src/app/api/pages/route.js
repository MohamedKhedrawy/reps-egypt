import { NextResponse } from 'next/server';
import { getVisiblePagesGrouped, initializeDefaultPages } from '@/lib/pageSettings';

/**
 * GET: Public endpoint to fetch visible pages for navigation
 * This is called by Navbar and Footer components
 */
export async function GET() {
    try {
        const pages = await getVisiblePagesGrouped();
        
        return NextResponse.json(pages);
    } catch (error) {
        console.error('Fetch visible pages error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pages' },
            { status: 500 }
        );
    }
}
