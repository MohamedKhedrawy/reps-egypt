import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/user';

/**
 * GET: Fetch analytics data for the admin dashboard
 */
export async function GET() {
    try {
        const users = await getUsersCollection();
        
        // Get date ranges
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        
        // Aggregate user growth by month for last 6 months
        const userGrowthPipeline = [
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ];
        
        const userGrowthData = await users.aggregate(userGrowthPipeline).toArray();
        
        // Format user growth for chart
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const userGrowth = userGrowthData.map(item => ({
            month: monthNames[item._id.month - 1],
            users: item.count
        }));
        
        // Fill missing months with 0
        const filledGrowth = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = monthNames[date.getMonth()];
            const existing = userGrowth.find(g => g.month === monthName);
            filledGrowth.push({
                month: monthName,
                users: existing ? existing.users : 0
            });
        }
        
        // Get approval statistics
        const [approved, rejected, pending, total] = await Promise.all([
            users.countDocuments({ status: 'approved' }),
            users.countDocuments({ status: 'rejected' }),
            users.countDocuments({ status: 'pending' }),
            users.countDocuments()
        ]);
        
        const approvalRate = total > 0 ? Math.round((approved / (approved + rejected || 1)) * 100) : 0;
        
        // Get users this month vs last month for growth percentage
        const thisMonthUsers = await users.countDocuments({ createdAt: { $gte: thisMonth } });
        const lastMonthUsers = await users.countDocuments({ 
            createdAt: { $gte: lastMonth, $lt: thisMonth } 
        });
        
        const growthPercentage = lastMonthUsers > 0 
            ? Math.round(((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100)
            : thisMonthUsers > 0 ? 100 : 0;
        
        // Get registrations by role
        const [trainers, trainees] = await Promise.all([
            users.countDocuments({ role: 'trainer' }),
            users.countDocuments({ role: 'trainee' })
        ]);
        
        // Get recent registrations
        const recentRegistrations = await users.find()
            .project({ fullName: 1, email: 1, role: 1, status: 1, createdAt: 1 })
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();
        
        return NextResponse.json({
            userGrowth: filledGrowth,
            approvalStats: {
                approved,
                rejected,
                pending,
                approvalRate
            },
            growthPercentage,
            registrationsByRole: {
                trainers,
                trainees
            },
            recentRegistrations: recentRegistrations.map(r => ({
                id: r._id.toString(),
                name: r.fullName,
                email: r.email,
                role: r.role,
                status: r.status,
                createdAt: r.createdAt
            }))
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
