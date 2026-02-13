/**
 * In-memory rate limiter for preventing abuse
 * Tracks IP addresses and their request counts within time windows
 * 
 * SECURITY NOTE: For production with distributed servers, use Redis instead
 * This in-memory store works for single-server deployments
 */

const rateLimitStore = new Map();

/**
 * Clean up expired rate limit entries (runs periodically)
 */
function cleanupExpiredEntries() {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
        if (data.expiresAt < now) {
            rateLimitStore.delete(key);
        }
    }
}

/**
 * Check if a request from an IP should be rate limited
 * @param {string} identifier - Usually IP address or user ID
 * @param {number} maxRequests - Max requests allowed in the time window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} { allowed: boolean, remaining: number, retryAfter: number }
 */
export function isRateLimited(identifier, maxRequests = 5, windowMs = 3600000) {
    // Clean up every 100 checks to avoid memory leaks
    if (Math.random() < 0.01) {
        cleanupExpiredEntries();
    }

    const now = Date.now();
    const windowStart = now - windowMs;
    
    const data = rateLimitStore.get(identifier) || {
        requests: [],
        expiresAt: now + windowMs,
    };

    // Filter out requests outside the current window
    data.requests = data.requests.filter(timestamp => timestamp > windowStart);

    // Check if rate limit exceeded
    const allowed = data.requests.length < maxRequests;
    
    if (allowed) {
        data.requests.push(now);
    }

    // Calculate retry-after header (seconds until oldest request leaves the window)
    const oldestRequest = data.requests[0];
    const retryAfter = oldestRequest 
        ? Math.ceil((oldestRequest - windowStart) / 1000)
        : 0;

    // Update expiration time
    data.expiresAt = now + windowMs;
    rateLimitStore.set(identifier, data);

    return {
        allowed,
        remaining: Math.max(0, maxRequests - data.requests.length),
        retryAfter,
    };
}

/**
 * Get request count for an identifier
 */
export function getRequestCount(identifier) {
    const data = rateLimitStore.get(identifier);
    return data ? data.requests.length : 0;
}

/**
 * Reset rate limit for an identifier (admin only)
 */
export function resetRateLimit(identifier) {
    rateLimitStore.delete(identifier);
}

/**
 * Extract IP address from request headers
 * Handles proxies and various deployment scenarios
 */
export function getClientIp(request) {
    // Try to get IP from various header sources
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        // x-forwarded-for can contain multiple IPs, take the first one
        return forwardedFor.split(',')[0].trim();
    }

    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
        return realIp;
    }

    // Fallback to direct connection IP
    return request.headers.get('x-client-ip') || 'unknown';
}
