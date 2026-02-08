'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function PartnersDashboard({ dictionary }) {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tier: 'gold',
    logo: '',
    description: '',
    website: '',
    category: '',
    isActive: true
  });

  // Get text with fallback
  const t = (key, fallback = '') => {
    if (!dictionary) return fallback;
    const keys = key.split('.');
    let value = dictionary;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || fallback;
  };

  // Fetch partners
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/partners');
      const data = await response.json();
      if (data.success) {
        setPartners(data.partners);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error(t('fetch_failed', 'Failed to fetch partners'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Handle logo upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, logo: reader.result });
        toast.success(t('logo_uploaded', 'Logo uploaded successfully'));
      };
      reader.onerror = () => {
        toast.error(t('upload_failed', 'Upload failed'));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.tier || !formData.logo) {
      toast.error(t('required_fields', 'Please fill in all required fields'));
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await fetch(`/api/admin/partners/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch('/api/admin/partners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      const data = await response.json();
      if (data.success) {
        toast.success(editingId ? t('updated', 'Partner updated successfully') : t('added', 'Partner added successfully'));
        resetForm();
        fetchPartners();
      } else {
        toast.error(data.error || t('error', 'An error occurred'));
      }
    } catch (error) {
      console.error('Error saving partner:', error);
      toast.error(t('error', 'An error occurred'));
    }
  };

  // Handle edit
  const handleEdit = (partner) => {
    setFormData({
      name: partner.name,
      tier: partner.tier,
      logo: partner.logo,
      description: partner.description || '',
      website: partner.website || '',
      category: partner.category || '',
      isActive: partner.isActive === true || partner.isActive === 'true'
    });
    setEditingId(partner.id);
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm(t('delete_confirm', 'Are you sure you want to delete this partner?'))) return;

    try {
      const response = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        toast.success(t('deleted', 'Partner deleted successfully'));
        fetchPartners();
      } else {
        toast.error(t('delete_failed', 'Failed to delete partner'));
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error(t('delete_failed', 'Failed to delete partner'));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      tier: 'gold',
      logo: '',
      description: '',
      website: '',
      category: '',
      isActive: true
    });
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Add Partner Button */}
      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
      >
        <span>+</span>
        {t('add_partner', 'Add New Partner')}
      </button>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-muted">
          {t('loading', 'Loading partners...')}
        </div>
      )}

      {/* Empty State */}
      {!loading && partners.length === 0 && (
        <div className="bg-secondary border border-border rounded-lg p-8 text-center">
          <p className="text-muted mb-4">{t('no_partners', 'No partners added yet')}</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            {t('add_first', 'Add the first partner')}
          </button>
        </div>
      )}

      {/* Partners List */}
      {!loading && partners.length > 0 && (
        <div className="space-y-4">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-secondary border border-border rounded-lg p-6 hover:border-red-600/30 transition-colors"
            >
              <div className="flex gap-6 items-start">
                {/* Logo */}
                {partner.logo && (
                  <div className="flex-shrink-0">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-20 h-20 object-cover rounded-lg border border-border" 
                    />
                  </div>
                )}
                
                {/* Partner Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-lg">{partner.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      partner.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {partner.isActive ? t('active', 'Active') : t('inactive', 'Inactive')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted capitalize mb-2">
                    {t(`tier_${partner.tier}`, partner.tier)}
                  </p>
                  
                  {partner.description && (
                    <p className="text-sm text-muted mb-3 line-clamp-2">
                      {partner.description}
                    </p>
                  )}
                  
                  {partner.website && (
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      {partner.website}
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    title={t('edit', 'Edit')}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    title={t('delete', 'Delete')}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto border border-border">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? t('edit_partner', 'Edit Partner') : t('add_partner', 'Add New Partner')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('fields.name', 'Partner Name')} *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-tertiary border border-border rounded-lg focus:outline-none focus:border-red-600"
                  placeholder={t('placeholder_name', 'Enter partner name')}
                  required
                />
              </div>

              {/* Tier */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('fields.tier', 'Partnership Tier')} *</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full px-4 py-2 bg-tertiary border border-border rounded-lg focus:outline-none focus:border-red-600"
                >
                  <option value="strategic">{t('tier_strategic', 'Strategic Partner')}</option>
                  <option value="gold">{t('tier_gold', 'Gold Partner')}</option>
                  <option value="educational">{t('tier_educational', 'Educational Partner')}</option>
                </select>
              </div>

              {/* Logo */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('fields.logo', 'Partner Logo')} *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full px-4 py-2 bg-tertiary border border-border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                />
                {formData.logo && (
                  <img src={formData.logo} alt="Preview" className="w-24 h-24 object-cover rounded-lg mt-3 border border-border" />
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('fields.description', 'Description')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-tertiary border border-border rounded-lg focus:outline-none focus:border-red-600 resize-none"
                  rows="3"
                  placeholder={t('placeholder_desc', 'Describe this partner...')}
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('fields.website', 'Website URL')}</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 bg-tertiary border border-border rounded-lg focus:outline-none focus:border-red-600"
                  placeholder="https://example.com"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('fields.category', 'Category')}</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-tertiary border border-border rounded-lg focus:outline-none focus:border-red-600"
                  placeholder={t('placeholder_cat', 'e.g., Equipment, Services')}
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 p-4 bg-tertiary rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-border"
                />
                <label className="text-sm font-semibold cursor-pointer">{t('fields.active', 'Active')}</label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {editingId ? t('fields.save', 'Save Changes') : t('fields.add', 'Add Partner')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {t('fields.cancel', 'Cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
