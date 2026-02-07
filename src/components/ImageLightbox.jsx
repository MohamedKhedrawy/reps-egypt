'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function ImageLightbox({ image, title, onDelete, isOwnProfile }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this image?')) return;
    if (onDelete) {
      try {
        await onDelete();
        setShowModal(false);
        toast.success('Image deleted successfully');
      } catch (error) {
        toast.error('Failed to delete image');
      }
    }
  };

  return (
    <>
      {/* Image Container - Clickable */}
      <div
        className="w-full h-full cursor-pointer group relative"
        onClick={() => setShowModal(true)}
      >
        <img
          src={image}
          alt={title || 'Image'}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors z-10 text-3xl font-bold"
              title="Close"
            >
              ✕
            </button>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden">
              <img
                src={image}
                alt={title || 'Image'}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Info and Actions */}
            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              {title && (
                <p className="text-white text-sm font-medium flex-1">{title}</p>
              )}
              
              <div className="flex gap-3">
                {isOwnProfile && (
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-bold flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                )}
                
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
