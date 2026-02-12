"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PageSettingsContext = createContext(null);

export function PageSettingsProvider({ children }) {
    const [pages, setPages] = useState({ main: [], footer: [], legal: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch visible pages from API (no caching - always fresh from server)
     */
    const fetchPages = useCallback(async () => {
        try {
            const res = await fetch('/api/pages', { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch pages');
            
            const data = await res.json();
            setPages(data);
        } catch (err) {
            console.error('PageSettings fetch error:', err);
            setError(err.message);
            
            // Fallback to defaults if fetch fails
            setPages({
                main: [
                    { pageId: 'home', name: 'Home', path: '/' },
                    { pageId: 'coaches', name: 'Coaches', path: '/coaches' },
                    { pageId: 'programs', name: 'Programs', path: '/programs' },
                    { pageId: 'gallery', name: 'Gallery', path: '/gallery' },
                    { pageId: 'news', name: 'News', path: '/news' },
                    { pageId: 'member-benefits', name: 'Benefits', path: '/member-benefits' },
                    { pageId: 'standards', name: 'Standards', path: '/standards' },
                ],
                footer: [
                    { pageId: 'faq', name: 'FAQ', path: '/faq' },
                ],
                legal: [
                    { pageId: 'code-of-ethics', name: 'Code of Ethics', path: '/code-of-ethics' },
                    { pageId: 'privacy-policy', name: 'Privacy Policy', path: '/privacy-policy' },
                    { pageId: 'terms-of-service', name: 'Terms of Service', path: '/terms-of-service' },
                ]
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    // Poll every 60 seconds so all users pick up page visibility changes
    useEffect(() => {
        const interval = setInterval(() => fetchPages(), 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchPages]);

    /**
     * Check if a specific page path is visible
     */
    const isPageVisible = useCallback((path) => {
        const allPages = [...pages.main, ...pages.footer, ...pages.legal];
        const page = allPages.find(p => p.path === path);
        // If page not found in settings, assume visible (backwards compatibility)
        return page ? true : true;
    }, [pages]);

    /**
     * Get visible pages for a specific category
     */
    const getVisiblePages = useCallback((category) => {
        return pages[category] || [];
    }, [pages]);

    /**
     * Force refresh pages from server (used by admin after toggling)
     */
    const refreshPages = useCallback(() => {
        return fetchPages();
    }, [fetchPages]);

    const value = {
        pages,
        loading,
        error,
        isPageVisible,
        getVisiblePages,
        refreshPages,
    };

    return (
        <PageSettingsContext.Provider value={value}>
            {children}
        </PageSettingsContext.Provider>
    );
}

export function usePageSettings() {
    const context = useContext(PageSettingsContext);
    if (!context) {
        throw new Error('usePageSettings must be used within a PageSettingsProvider');
    }
    return context;
}
