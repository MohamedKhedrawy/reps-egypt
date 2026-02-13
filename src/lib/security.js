/**
 * Security utilities for sanitizing content
 * Prevents XSS attacks and other injection vulnerabilities
 */

/**
 * Escape HTML special characters to prevent XSS
 * SECURITY: Must be applied before rendering in emails
 */
export function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Sanitize email content for safe display
 * Removes potentially dangerous content while preserving readability
 */
export function sanitizeEmailContent(content) {
    // Remove null bytes
    let sanitized = content.replace(/\0/g, '');

    // Escape HTML entities
    sanitized = escapeHtml(sanitized);

    // Preserve line breaks for readability
    sanitized = sanitized.replace(/\n/g, '<br>');

    return sanitized;
}

/**
 * Check if a string contains common XSS patterns
 * SECURITY: Additional detection layer
 */
export function containsXSSPatterns(text) {
    const xssPatterns = [
        /<script[^>]*>[\s\S]*?<\/script>/gi,
        /on\w+\s*=/gi, // Event handlers like onclick=
        /javascript:/gi,
        /vbscript:/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
        /<link/gi,
        /<meta/gi,
        /<style/gi,
    ];

    for (const pattern of xssPatterns) {
        if (pattern.test(text)) {
            return true;
        }
    }

    return false;
}

/**
 * Check if a string contains common SQL injection patterns
 * SECURITY: Additional detection layer (MongoDB uses different queries but still validate)
 */
export function containsMaliciousPatterns(text) {
    // Check for SQL-like patterns
    const sqlPatterns = [
        /union[\s\r\n]+select/gi,
        /drop[\s\r\n]+(table|database)/gi,
        /insert[\s\r\n]+into/gi,
        /delete[\s\r\n]+from/gi,
        /update[\s\r\n]+/gi,
    ];

    for (const pattern of sqlPatterns) {
        if (pattern.test(text)) {
            return { detected: true, type: 'sql' };
        }
    }

    // Check for NoSQL injection patterns
    if (typeof text === 'string' && (
        text.includes('$where') ||
        text.includes('$ne:') ||
        text.includes('$gt:')
    )) {
        return { detected: true, type: 'nosql' };
    }

    return { detected: false };
}

/**
 * Validate and sanitize a complete contact message
 * Combines multiple security checks
 */
export function secureMessage(email, subject, message, senderName) {
    const checks = [];

    // Check for XSS patterns
    if (containsXSSPatterns(email)) {
        checks.push('Invalid characters in email');
    }
    if (containsXSSPatterns(subject)) {
        checks.push('Invalid characters in subject');
    }
    if (containsXSSPatterns(message)) {
        checks.push('Invalid characters in message');
    }
    if (containsXSSPatterns(senderName)) {
        checks.push('Invalid characters in sender name');
    }

    // Check for injection patterns
    const emailMalicious = containsMaliciousPatterns(email);
    const subjectMalicious = containsMaliciousPatterns(subject);
    const messageMalicious = containsMaliciousPatterns(message);
    const nameMalicious = containsMaliciousPatterns(senderName);

    if (emailMalicious.detected || subjectMalicious.detected || 
        messageMalicious.detected || nameMalicious.detected) {
        checks.push('Message contains suspicious patterns');
    }

    if (checks.length > 0) {
        return {
            safe: false,
            errors: checks,
        };
    }

    // All checks passed, return sanitized versions
    return {
        safe: true,
        email: email.toLowerCase(),
        subject: sanitizeEmailContent(subject),
        message: sanitizeEmailContent(message),
        senderName: sanitizeEmailContent(senderName),
    };
}
