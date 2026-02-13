/**
 * POST /api/contact-coach/[coachId]
 * 
 * SECURITY REQUIREMENTS:
 * - No authentication required (allows anonymous visitors)
 * - Rate limited to prevent abuse
 * - Input validation to prevent injection attacks
 * - Email sent to coach's mailbox (real email NOT exposed to frontend)
 * - Reply-to header includes visitor's email for direct communication
 * - All inputs sanitized before email sending
 * 
 * REQUEST BODY:
 * {
 *   "email": "visitor@example.com",
 *   "subject": "I'd like to know more",
 *   "message": "Your training programs look great...",
 *   "senderName": "John Doe"
 * }
 * 
 * RESPONSES:
 * 200 - Message sent successfully
 * 400 - Validation errors
 * 404 - Coach not found or not a trainer
 * 429 - Rate limit exceeded
 * 500 - Server error
 */

import { NextResponse } from 'next/server';
import { findUserById } from '@/lib/user';
import { sendCoachMessage } from '@/lib/email';
import { getClientIp, isRateLimited } from '@/lib/rate-limiter';
import { validateContactMessage } from '@/lib/validate-contact';
import { secureMessage } from '@/lib/security';

// Rate limiting config
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 messages per IP per hour

export async function POST(request, { params }) {
    try {
        const { coachId } = await params;

        // STEP 1: Rate limiting (prevent spam/abuse)
        const clientIp = getClientIp(request);
        const rateLimitKey = `contact-coach:${clientIp}`;
        const rateLimitResult = isRateLimited(
            rateLimitKey,
            RATE_LIMIT_MAX_REQUESTS,
            RATE_LIMIT_WINDOW_MS
        );

        if (!rateLimitResult.allowed) {
            // Return 429 Too Many Requests with Retry-After header
            return NextResponse.json(
                {
                    error: 'Too many requests. Please try again later.',
                    message: 'You have exceeded the maximum number of messages you can send in one hour.',
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(rateLimitResult.retryAfter),
                    },
                }
            );
        }

        // STEP 2: Parse and validate request body
        const body = await request.json();

        const validation = validateContactMessage({
            email: body.email,
            subject: body.subject,
            message: body.message,
            senderName: body.senderName,
            coachId,
        });

        if (!validation.isValid) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: validation.errors,
                },
                { status: 400 }
            );
        }

        const validatedData = validation.data;

        // STEP 3: Security check - additional sanitization
        const securityCheck = secureMessage(
            validatedData.email,
            validatedData.subject,
            validatedData.message,
            validatedData.senderName
        );

        if (!securityCheck.safe) {
            // Log security incident (in production, log to monitoring service)
            console.warn('[SECURITY] Suspicious message detected:', {
                ip: clientIp,
                coachId,
                errors: securityCheck.errors,
            });

            return NextResponse.json(
                {
                    error: 'Message contains invalid content',
                    message: 'Your message could not be processed. Please check the content and try again.',
                },
                { status: 400 }
            );
        }

        // STEP 4: Verify coach exists and has 'trainer' role
        let coach;
        try {
            coach = await findUserById(coachId);
        } catch (error) {
            console.error('Database error checking coach:', error);
            return NextResponse.json(
                { error: 'An error occurred. Please try again.' },
                { status: 500 }
            );
        }

        if (!coach) {
            return NextResponse.json(
                { error: 'Coach not found' },
                { status: 404 }
            );
        }

        // CRITICAL SECURITY: Verify user is actually a trainer
        // Prevents messages being sent to non-trainer users
        if (coach.role !== 'trainer') {
            return NextResponse.json(
                {
                    error: 'Invalid recipient',
                    message: 'This user is not a coach.',
                },
                { status: 404 }
            );
        }

        // Verify coach has email address
        if (!coach.email) {
            console.error('Coach has no email:', coachId);
            return NextResponse.json(
                { error: 'Coach contact information not available' },
                { status: 500 }
            );
        }

        // STEP 5: Send email to coach (actual email is secure on backend)
        try {
            await sendCoachMessage({
                fromName: securityCheck.senderName,
                fromEmail: securityCheck.email,
                toEmail: coach.email, // Coach's real email - never exposed to frontend
                subject: securityCheck.subject,
                message: securityCheck.message,
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            return NextResponse.json(
                {
                    error: 'Failed to send message',
                    message: 'An error occurred while sending your message. Please try again.',
                },
                { status: 500 }
            );
        }

        // STEP 6: Success response
        // Do NOT return coach's email address to frontend
        return NextResponse.json(
            {
                success: true,
                message: 'Your message has been sent successfully!',
                data: {
                    coachName: coach.fullName,
                    timestamp: new Date().toISOString(),
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact coach endpoint error:', error);

        // Generic error response (don't expose internal details to frontend)
        return NextResponse.json(
            {
                error: 'An unexpected error occurred',
                message: 'Please try again or contact support.',
            },
            { status: 500 }
        );
    }
}

/**
 * Disable OPTIONS preflight, we handle CORS at middleware level
 */
export async function OPTIONS(request) {
    return NextResponse.json({ success: true });
}
