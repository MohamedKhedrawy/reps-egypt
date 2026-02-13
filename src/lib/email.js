import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a message from a user to a coach
 * SECURITY: Coach's real email is never exposed to frontend
 * 
 * @param {Object} params
 * @param {string} params.fromName - Name of the sender (visitor)
 * @param {string} params.fromEmail - Email of the sender (visitor) - used as Reply-To
 * @param {string} params.toEmail - Email of the recipient (coach) - kept secure on backend
 * @param {string} params.subject - Message subject from visitor
 * @param {string} params.message - The message content
 */
export async function sendCoachMessage({ fromName, fromEmail, toEmail, subject, message }) {
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        throw new Error("Email service not configured");
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'REPS Egypt <no-reply@reps-egypt.com>', // Must be a verified domain
            to: [toEmail],
            reply_to: fromEmail,
            // SECURITY: Email subject includes visitor's subject line for context
            subject: `[REPS Contact] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
                        <h2 style="margin: 0; font-size: 24px;">📧 New Message Received</h2>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;">
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                            You have received a new message from <strong style="color: #dc2626;">${fromName}</strong> via your REPS Egypt coach profile.
                        </p>
                        
                        <div style="background: white; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0 0 10px 0; color: #666; font-size: 12px;">
                                <strong>Subject:</strong> ${subject}
                            </p>
                            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                        </div>

                        <div style="background: #f0f9ff; padding: 10px; border-radius: 4px; margin: 15px 0;">
                            <p style="margin: 0; font-size: 14px; color: #0369a1;">
                                <strong>Reply to:</strong> <a href="mailto:${fromEmail}" style="color: #dc2626; text-decoration: none;">Click to reply</a>
                            </p>
                            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
                                Simply reply to this email to contact the visitor directly at ${fromEmail}
                            </p>
                        </div>

                        <p style="margin: 20px 0 0 0; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af;">
                            This message was sent through REPS Egypt's coach contact system.
                        </p>
                    </div>
                </div>
            `,
            text: `You received a new message from ${fromName} via REPS Egypt\n\nSubject: ${subject}\n\n${message}\n\nTo reply, use this email: ${fromEmail}`
        });

        if (error) {
            console.error("Resend API error:", error);
            throw new Error(error.message || "Email sending failed");
        }

        return { success: true, id: data.id };
    } catch (error) {
        console.error("Resend error:", error);
        throw new Error(error.message || "Failed to send email");
    }
}

/**
 * Send bulk emails to multiple recipients
 * @param {Object} params
 * @param {string} params.fromEmail - Sender email address
 * @param {string} params.fromLabel - Sender label/name
 * @param {string[]} params.recipients - Array of recipient email addresses
 * @param {string} params.subject - Email subject
 * @param {string} params.htmlContent - HTML content of the email
 * @param {string} params.textContent - Plain text content (fallback)
 */
export async function sendBulkEmail({ fromEmail, fromLabel, recipients, subject, htmlContent, textContent }) {
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        throw new Error("Email service not configured");
    }

    try {
        // Resend batch API supports up to 100 emails per request
        const BATCH_SIZE = 100;
        const results = [];

        for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
            const batch = recipients.slice(i, i + BATCH_SIZE);
            
            // Create batch of emails
            const emails = batch.map(to => ({
                from: `${fromLabel || 'REPS Egypt'} <${fromEmail}>`,
                to: [to],
                subject,
                html: htmlContent,
                text: textContent,
            }));

            const { data, error } = await resend.batch.send(emails);

            if (error) {
                console.error("Resend batch API error:", error);
                throw new Error(error.message || "Batch email sending failed");
            }

            results.push(...(data?.data || []));
        }

        return { 
            success: true, 
            id: results[0]?.id || 'batch-sent',
            sentCount: recipients.length 
        };
    } catch (error) {
        console.error("Resend bulk error:", error);
        throw new Error(error.message || "Failed to send bulk emails");
    }
}

