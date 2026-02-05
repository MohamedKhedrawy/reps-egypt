import { NextResponse } from 'next/server';
import { chatbotFlow } from '@/lib/chatbot-flow';
import { z } from 'zod';

const flowSchema = z.object({
    currentNodeId: z.string().optional().default('root'),
});

export async function POST(request) {
    try {
        const body = await request.json();
        const userRole = request.headers.get('x-user-role') || 'guest';

        // Validate Input
        const validation = flowSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const nodeId = validation.data.currentNodeId;
        const node = chatbotFlow[nodeId];

        // Security: Ensure node exists, fallback to root if invalid
        if (!node) {
             return NextResponse.json({ 
                 text: "I'm sorry, I lost track. Let's start over.", 
                 options: chatbotFlow['root'].options 
             });
        }

        // Filter options based on Role
        // If option has no requiredRole, it is public.
        // If option HAS requiredRole, userRole must be in the list.
        const safeOptions = node.options.filter(opt => {
            if (!opt.requiredRole) return true; // Public
            // Allow if userRole is included in required roles
            // Note: 'admin' should practically access everything, but explicit list is safer
            const roles = Array.isArray(opt.requiredRole) ? opt.requiredRole : [opt.requiredRole];
            return roles.includes(userRole) || userRole === 'admin';
        });

        // Return safe payload
        return NextResponse.json({
            text: node.text,
            options: safeOptions
        });

    } catch (error) {
        console.error('Chatbot API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
