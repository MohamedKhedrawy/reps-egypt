import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

export default function GalleryDashboard({ dictionary }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Certification");

  const categories = ["Certification", "Workshops", "Events", "Community"];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const res = await fetch("/api/admin/gallery");
    if (res.ok) {
      const data = await res.json();
      setImages(data.images || []);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      setNewImage(reader.result);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = async () => {
    if (!newImage) return toast.error(dictionary?.admin?.gallery?.select_image || "Choose an image first");
    setUploading(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: newImage, title: newTitle, category: newCategory }),
    });
    if (res.ok) {
      toast.success(dictionary?.admin?.gallery?.image_added || "Image added to gallery successfully");
      setNewImage(null);
      setNewTitle("");
      setNewCategory("Certification");
      setShowModal(false);
      fetchGallery();
    } else {
      toast.error(dictionary?.admin?.gallery?.add_failed || "Failed to add image");
    }
    setUploading(false);
  };

  const handleDeleteImage = async (id) => {
    if (!confirm(dictionary?.admin?.gallery?.delete_confirm || "Delete this image?")) return;
    const res = await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast.success(dictionary?.admin?.gallery?.image_deleted || "Image deleted successfully");
      fetchGallery();
    } else {
      toast.error(dictionary?.admin?.gallery?.delete_failed || "Failed to delete image");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{dictionary?.admin?.gallery?.title || "Gallery Control"}</h2>
      <button className="bg-red-600 text-white px-4 py-2 rounded mb-6 hover:bg-red-700 transition-colors" onClick={() => setShowModal(true)}>
        {dictionary?.admin?.gallery?.add_image_btn || "Add Image to Gallery"}
      </button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map(img => (
          <div key={img._id} className="relative border border-border rounded-lg overflow-hidden">
            <img src={img.image} alt={img.title || (dictionary?.admin?.gallery?.gallery_image || "Gallery image")} className="w-full h-48 object-cover" />
            {img.title && <div className="p-2 text-center text-sm bg-black/60 text-white">{img.title}</div>}
            <button className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors" onClick={() => handleDeleteImage(img._id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <div className={`fixed inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'} flex items-center justify-center z-50`}>
          <div className={`${isDark ? 'bg-secondary border border-border' : 'bg-white border border-gray-200'} p-6 rounded-lg shadow-lg w-full max-w-md`}>
            <h3 className="text-xl font-bold mb-4">{dictionary?.admin?.gallery?.add_image_modal || "Add Image to Gallery"}</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              disabled={uploading} 
              className={`mb-4 w-full px-3 py-2 rounded border ${isDark ? 'bg-tertiary border-border' : 'bg-gray-50 border-gray-300'}`}
            />
            {newImage && <img src={newImage} alt={dictionary?.admin?.gallery?.image_preview || "Preview"} className="w-full h-40 object-cover mb-4 rounded" />}
            <input 
              type="text" 
              placeholder={dictionary?.admin?.gallery?.image_title_placeholder || "Image title (optional)"} 
              value={newTitle} 
              onChange={e => setNewTitle(e.target.value)} 
              className={`w-full border rounded px-3 py-2 mb-4 ${isDark ? 'bg-tertiary border-border' : 'bg-gray-50 border-gray-300'}`}
            />
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className={`w-full border rounded px-3 py-2 mb-4 ${isDark ? 'bg-tertiary border-border' : 'bg-gray-50 border-gray-300'}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button 
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50" 
                onClick={handleAddImage} 
                disabled={uploading}
              >
                {dictionary?.admin?.gallery?.add || "Add"}
              </button>
              <button 
                className={`flex-1 px-4 py-2 rounded transition-colors ${isDark ? 'bg-tertiary hover:bg-background' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => { 
                  setShowModal(false); 
                  setNewImage(null); 
                  setNewTitle("");
                  setNewCategory("Certification");
                }}
              >
                {dictionary?.admin?.gallery?.cancel || "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
