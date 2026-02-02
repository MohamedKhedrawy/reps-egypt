import { NextResponse } from 'next/server';
import { getUserStats } from '@/lib/user';
import { getNewsCount } from '@/lib/news';

export async function GET() {
    try {
        const [userStats, newsCount] = await Promise.all([
            getUserStats(),
            getNewsCount(),
        ]);

        return NextResponse.json({
            totalUsers: userStats.totalUsers,
            activeTrainers: userStats.activeTrainers,
            pendingApprovals: userStats.pendingApprovals,
            totalNews: newsCount,
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
