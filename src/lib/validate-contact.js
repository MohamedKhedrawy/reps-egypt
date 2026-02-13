/**
 * Input validation utilities for the contact coach feature
 * Ensures all inputs are properly validated before processing
 */

/**
 * Validate email format
 * SECURITY: Strict validation to prevent email header injection
 */
export function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return { valid: false, message: 'Email is required' };
    }

    const trimmed = email.trim();
    
    // Prevent extremely long emails
    if (trimmed.length > 254) {
        return { valid: false, message: 'Email is too long' };
    }

    // Validate format using RFC 5322 simplified regex
    // This prevents most injection attacks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return { valid: false, message: 'Invalid email format' };
    }

    // Prevent header injection by checking for newlines and carriage returns
    if (/[\r\n]/.test(trimmed)) {
        return { valid: false, message: 'Invalid email format' };
    }

    return { valid: true, value: trimmed.toLowerCase() };
}

/**
 * Validate email subject line
 * SECURITY: Prevent header injection attacks
 */
export function validateSubject(subject) {
    if (!subject || typeof subject !== 'string') {
        return { valid: false, message: 'Subject is required' };
    }

    const trimmed = subject.trim();

    // Check length constraints
    if (trimmed.length < 3) {
        return { valid: false, message: 'Subject must be at least 3 characters' };
    }

    if (trimmed.length > 200) {
        return { valid: false, message: 'Subject must be less than 200 characters' };
    }

    // SECURITY: Prevent header injection by blocking newlines/carriage returns
    if (/[\r\n]/.test(trimmed)) {
        return { valid: false, message: 'Subject cannot contain line breaks' };
    }

    // Prevent null bytes
    if (trimmed.includes('\0')) {
        return { valid: false, message: 'Subject contains invalid characters' };
    }

    return { valid: true, value: trimmed };
}

/**
 * Validate message body
 */
export function validateMessage(message) {
    if (!message || typeof message !== 'string') {
        return { valid: false, message: 'Message is required' };
    }

    const trimmed = message.trim();

    // Check length constraints
    if (trimmed.length < 10) {
        return { valid: false, message: 'Message must be at least 10 characters' };
    }

    if (trimmed.length > 2000) {
        return { valid: false, message: 'Message must be less than 2000 characters' };
    }

    // Prevent null bytes (could cause injection)
    if (trimmed.includes('\0')) {
        return { valid: false, message: 'Message contains invalid characters' };
    }

    return { valid: true, value: trimmed };
}

/**
 * Validate coach ID (MongoDB ObjectId format)
 */
export function validateCoachId(coachId) {
    if (!coachId || typeof coachId !== 'string') {
        return { valid: false, message: 'Coach ID is required' };
    }

    // MongoDB ObjectId is 24 hex characters
    const objectIdRegex = /^[0-9a-f]{24}$/i;
    if (!objectIdRegex.test(coachId)) {
        return { valid: false, message: 'Invalid coach ID format' };
    }

    return { valid: true, value: coachId };
}

/**
 * Validate sender name (optional but if provided, validate it)
 */
export function validateSenderName(name) {
    if (!name || typeof name !== 'string') {
        return { valid: false, message: 'Sender name is required' };
    }

    const trimmed = name.trim();

    if (trimmed.length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
    }

    if (trimmed.length > 100) {
        return { valid: false, message: 'Name must be less than 100 characters' };
    }

    // Prevent null bytes
    if (trimmed.includes('\0')) {
        return { valid: false, message: 'Name contains invalid characters' };
    }

    return { valid: true, value: trimmed };
}

/**
 * Validate all inputs for contact message
 * Returns combined validation result
 */
export function validateContactMessage(data) {
    const errors = {};

    // Validate email
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.valid) {
        errors.email = emailValidation.message;
    }

    // Validate subject
    const subjectValidation = validateSubject(data.subject);
    if (!subjectValidation.valid) {
        errors.subject = subjectValidation.message;
    }

    // Validate message
    const messageValidation = validateMessage(data.message);
    if (!messageValidation.valid) {
        errors.message = messageValidation.message;
    }

    // Validate sender name
    const nameValidation = validateSenderName(data.senderName);
    if (!nameValidation.valid) {
        errors.senderName = nameValidation.message;
    }

    // Validate coachId
    const coachIdValidation = validateCoachId(data.coachId);
    if (!coachIdValidation.valid) {
        errors.coachId = coachIdValidation.message;
    }

    const isValid = Object.keys(errors).length === 0;

    return {
        isValid,
        errors,
        data: isValid
            ? {
                email: emailValidation.value,
                subject: subjectValidation.value,
                message: messageValidation.value,
                senderName: nameValidation.value,
                coachId: coachIdValidation.value,
              }
            : null,
    };
}
