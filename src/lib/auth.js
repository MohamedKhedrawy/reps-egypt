import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const secret = process.env.JWT_SECRET || 'default-secret-change-me';

if (process.env.NODE_ENV === 'production' && (secret === 'default-secret-change-me' || !process.env.JWT_SECRET)) {
    throw new Error('FATAL: JWT_SECRET is not defined or is set to default in PRODUCTION. Please set a strong secret.');
}

const JWT_SECRET = new TextEncoder().encode(secret);

/**
 * Hash a plaintext password
 * @param {string} password 
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}

/**
 * Compare a plaintext password with a hash
 * @param {string} password 
 * @param {string} hashedPassword 
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Create a JWT token for a user
 * @param {object} payload - User data to encode (e.g., { userId, email })
 * @param {string} expiresIn - Expiration time (default: '7d')
 * @returns {Promise<string>}
 */
export async function createToken(payload, expiresIn = '7d') {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(JWT_SECRET);
}

/**
 * Verify and decode a JWT token
 * @param {string} token 
 * @returns {Promise<object|null>} - Decoded payload or null if invalid
 */
export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}

/**
 * Extract token from Authorization header or cookie
 * @param {Request} request 
 * @returns {string|null}
 */
export function getTokenFromRequest(request) {
    // Check Authorization header first
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    
    // Check cookies
    const cookieHeader = request.headers.get('Cookie');
    if (cookieHeader) {
        const cookies = Object.fromEntries(
            cookieHeader.split('; ').map(c => c.split('='))
        );
        return cookies['token'] || null;
    }
    
    return null;
}
