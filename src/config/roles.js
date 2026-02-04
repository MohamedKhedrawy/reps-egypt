/**
 * Role Definitions and Permissions
 * 
 * Defines which roles can access which pages/features.
 * This is primarily used for UI filtering (Navbar, etc.).
 */

export const ROLES = {
    ADMIN: 'admin',
    TRAINER: 'trainer',
    TRAINEE: 'trainee',
    GUEST: 'guest',
};

// Pages that are restricted to specific roles
// If a page is not listed here, it is assumed to be accessible by everyone (Guests included)
const RESTRICTED_PAGES = {
    '/admin': [ROLES.ADMIN],
    // Pricing, Coaches, Programs are now accessible to everyone as per user request
};

/**
 * Check if a role can access a specific path
 * @param {string} role - The user's role (default: 'guest')
 * @param {string} path - The path to check
 * @returns {boolean}
 */
export function canAccess(role = ROLES.GUEST, path) {
    // If the path is not in the restricted list, everyone can access it
    // We check if any restricted path prefix matches
    const restrictedEntry = Object.entries(RESTRICTED_PAGES).find(([restrictedPath]) => 
        path.startsWith(restrictedPath)
    );

    if (!restrictedEntry) {
        return true;
    }

    const [, allowedRoles] = restrictedEntry;
    return allowedRoles.includes(role);
}

/**
 * Filter navigation links based on role
 * @param {import('../lib/pageSettings').PageSetting[]} links 
 * @param {string} role 
 */
export function getNavLinksForRole(links, role = ROLES.GUEST) {
    return links.filter(link => canAccess(role, link.path));
}
