import { NextResponse } from 'next/server';
import { getAllPageSettings, initializeDefaultPages } from '@/lib/pageSettings';

/**
 * GET: Fetch all page settings for admin
 */
export async function GET() {
    try {
        // Initialize defaults if needed
        await initializeDefaultPages();
        
        const pages = await getAllPageSettings();
        
        // Group by category for easier frontend rendering
        const grouped = {
            main: pages.filter(p => p.category === 'main'),
            footer: pages.filter(p => p.category === 'footer'),
            legal: pages.filter(p => p.category === 'legal'),
        };

        return NextResponse.json({ 
            pages,
            grouped,
            categories: ['main', 'footer', 'legal']
        });
    } catch (error) {
        console.error('Fetch page settings error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch page settings' },
            { status: 500 }
        );
    }
}

/**
 * POST: Initialize default pages (can be called to reset)
 */
export async function POST() {
    try {
        const result = await initializeDefaultPages();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Initialize pages error:', error);
        return NextResponse.json(
            { error: 'Failed to initialize pages' },
            { status: 500 }
        );
    }
}
