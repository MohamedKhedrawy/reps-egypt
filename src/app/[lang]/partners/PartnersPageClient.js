'use client';

import { useState, useEffect } from 'react';

export default function PartnersPageClient({ lang, dictionary }) {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/admin/partners');
        const data = await response.json();
        if (data.success) {
          setPartners(data.partners.filter(p => p.isActive));
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading partners...</div>;
  }

  const groupedPartners = {
    strategic: partners.filter(p => p.tier === 'strategic'),
    gold: partners.filter(p => p.tier === 'gold'),
    educational: partners.filter(p => p.tier === 'educational')
  };

  const renderTierSection = (tier, title, partners) => {
    if (partners.length === 0) return null;

    const gridCols = tier === 'strategic' ? 'grid-cols-1 md:grid-cols-2' : 
                     tier === 'gold' ? 'grid-cols-2 md:grid-cols-3' : 
                     'grid-cols-2 md:grid-cols-4';

    return (
      <div key={tier} className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">{typeof title === 'object' ? title.name : title}</h2>
        <div className={`grid ${gridCols} gap-6`}>
          {partners.map((partner) => (
            <div key={partner.id} className="bg-secondary border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
              {partner.logo && (
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-semibold text-lg mb-2">{partner.name}</h3>
              {partner.description && (
                <p className="text-sm text-muted mb-3 line-clamp-2">{partner.description}</p>
              )}
              {partner.website && (
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline text-sm font-semibold"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {groupedPartners.strategic.length === 0 && groupedPartners.gold.length === 0 && groupedPartners.educational.length === 0 ? (
          <div className="text-center text-muted py-12">
            No active partners available
          </div>
        ) : (
          <>
            {renderTierSection('strategic', dictionary.partners_page?.tier_strategic, groupedPartners.strategic)}
            {renderTierSection('gold', dictionary.partners_page?.tier_gold, groupedPartners.gold)}
            {renderTierSection('educational', dictionary.partners_page?.tier_educational, groupedPartners.educational)}
          </>
        )}
      </div>
    </section>
  );
}
