import clientPromise from './mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * Default pages configuration
 */
const DEFAULT_PAGES = [
    // Main Navigation
    { pageId: 'home', name: 'Home', path: '/', category: 'main', order: 0, icon: '🏠' },
    { pageId: 'coaches', name: 'Coaches', path: '/coaches', category: 'main', order: 1, icon: '👥' },
    { pageId: 'programs', name: 'Programs', path: '/programs', category: 'main', order: 2, icon: '📚' },
    { pageId: 'gallery', name: 'Gallery', path: '/gallery', category: 'main', order: 3, icon: '🖼️' },
    { pageId: 'news', name: 'News', path: '/news', category: 'main', order: 4, icon: '📰' },
    { pageId: 'member-benefits', name: 'Benefits', path: '/member-benefits', category: 'footer', order: 4, icon: '⭐' },
    { pageId: 'standards', name: 'Standards', path: '/standards', category: 'footer', order: 5, icon: '📋' },
    
    // Footer Links
    { pageId: 'faq', name: 'FAQ', path: '/faq', category: 'footer', order: 0, icon: '❓' },
    { pageId: 'about', name: 'About', path: '/about', category: 'footer', order: 1, icon: 'ℹ️' },
    { pageId: 'partners', name: 'Partners', path: '/partners', category: 'footer', order: 2, icon: '🤝' },
    { pageId: 'jobs', name: 'Jobs', path: '/jobs', category: 'footer', order: 3, icon: '💼' },
    
    // Legal Pages
    { pageId: 'code-of-ethics', name: 'Code of Ethics', path: '/code-of-ethics', category: 'legal', order: 0, icon: '⚖️' },
    { pageId: 'privacy-policy', name: 'Privacy Policy', path: '/privacy-policy', category: 'legal', order: 1, icon: '🔒' },
    { pageId: 'terms-of-service', name: 'Terms of Service', path: '/terms-of-service', category: 'legal', order: 2, icon: '📄' },
    
    // Pricing
    { pageId: 'pricing', name: 'Pricing', path: '/pricing', category: 'main', order: 1.5, icon: '💎' },
];

/**
 * Get page settings collection
 */
export async function getPageSettingsCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection('page_settings');
}

/**
 * Get all page settings
 */
export async function getAllPageSettings() {
    const collection = await getPageSettingsCollection();
    return collection.find({}).sort({ category: 1, order: 1 }).toArray();
}

/**
 * Get visible pages, optionally filtered by category
 */
export async function getVisiblePages(category = null) {
    const collection = await getPageSettingsCollection();
    const filter = { isVisible: true };
    if (category) filter.category = category;
    return collection.find(filter).sort({ order: 1 }).toArray();
}

/**
 * Get pages grouped by category (for public API)
 */
export async function getVisiblePagesGrouped() {
    const pages = await getVisiblePages();
    return {
        main: pages.filter(p => p.category === 'main'),
        footer: pages.filter(p => p.category === 'footer'),
        legal: pages.filter(p => p.category === 'legal'),
    };
}

/**
 * Update page visibility
 */
export async function updatePageVisibility(pageId, isVisible, adminId = null) {
    const collection = await getPageSettingsCollection();
    return collection.updateOne(
        { pageId },
        { 
            $set: { 
                isVisible, 
                updatedAt: new Date(),
                updatedBy: adminId 
            }
        }
    );
}

/**
 * Update page order
 */
export async function updatePageOrder(pageId, order) {
    const collection = await getPageSettingsCollection();
    return collection.updateOne(
        { pageId },
        { $set: { order, updatedAt: new Date() } }
    );
}

/**
 * Initialize default pages if collection is empty
 */
export async function initializeDefaultPages() {
    const collection = await getPageSettingsCollection();
    const count = await collection.countDocuments();
    
    if (count === 0) {
        const pages = DEFAULT_PAGES.map(page => ({
            ...page,
            isVisible: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        await collection.insertMany(pages);
        return { initialized: true, count: pages.length };
    }
    
    return { initialized: false, count };
}

/**
 * Get a single page setting by pageId
 */
export async function getPageSetting(pageId) {
    const collection = await getPageSettingsCollection();
    return collection.findOne({ pageId });
}
