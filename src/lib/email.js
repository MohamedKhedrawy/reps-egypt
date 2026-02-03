import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a message from a user to a coach
 * @param {Object} params
 * @param {string} params.fromName - Name of the sender (user)
 * @param {string} params.fromEmail - Email of the sender (user) - used as Reply-To
 * @param {string} params.toEmail - Email of the recipient (coach)
 * @param {string} params.message - The message content
 */
export async function sendCoachMessage({ fromName, fromEmail, toEmail, message }) {
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        throw new Error("Email service not configured");
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'REPS Egypt <no-reply@reps-egypt.com>', // Must be a verified domain
            to: [toEmail],
            reply_to: fromEmail,
            subject: `New message from ${fromName} on REPS Egypt`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>New Message Received</h2>
                    <p>You have received a new message from <strong>${fromName}</strong> via your REPS Egypt profile.</p>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    </div>

                    <p style="color: #666; font-size: 14px;">
                        To reply, simply reply to this email. You will be communicating directly with the user at <a href="mailto:${fromEmail}">${fromEmail}</a>.
                    </p>
                </div>
            `,
            text: `New message from ${fromName}:\n\n${message}\n\nReply to this email to contact the user at ${fromEmail}.`
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
