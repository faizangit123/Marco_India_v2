import { useState, useEffect, useRef } from 'react';
import { 
  Loader, Trash2, Upload, AlertCircle, CheckCircle2, 
  Image as ImageIcon, Link as LinkIcon, Eye, X, Plus, Sparkles 
} from 'lucide-react';
import apiClient from '../../api/client';

const CATEGORIES = ['CCTV', 'Telecom', 'Signal Boosting', 'Networking', 'Fiber Optic', 'Other'];

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const formatImageUrl = (url) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${API_BASE}${url}`;
};

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [galleryActive, setGalleryActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);

  const [form, setForm] = useState({ 
    title: '', 
    location: '', 
    category: 'CCTV', 
    description: '',
    imageUrl: '',
    isFeatured: false
  });

  const fileRef = useRef(null);

  const fetchItems = async () => {
    try {
      const { data } = await apiClient.get('/api/gallery/admin/');
      const list = Array.isArray(data) ? data : data.results || [];
      setItems(list.map(i => ({ ...i, image: formatImageUrl(i.image || i.src) })));
      if (data.active !== undefined) setGalleryActive(data.active);
      setError('');
    } catch {
      setError('Unable to load gallery items from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const toggleActive = async () => {
    const next = !galleryActive;
    try {
      await apiClient.patch('/api/gallery/settings/', { active: next });
      setGalleryActive(next);
      setSuccessMessage(`Gallery visibility updated: ${next ? 'Active (visible)' : 'Inactive (hidden)'}`);
      setTimeout(() => setSuccessMessage(''), 3500);
    } catch {
      setError('Failed to update gallery visibility setting.');
    }
  };

  const handleUpload = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!form.title.trim()) {
      setError('Please provide a title for this project installation.');
      return;
    }

    if (uploadMode === 'file' && !selectedFile) {
      setError('Please select an image file to upload.');
      return;
    }

    if (uploadMode === 'url' && !form.imageUrl.trim()) {
      setError('Please enter a valid image web URL.');
      return;
    }

    setUploading(true);
    try {
      let createdData;
      if (uploadMode === 'file') {
        const fd = new FormData();
        fd.append('image', selectedFile);
        fd.append('title', form.title.trim());
        fd.append('location', form.location.trim());
        fd.append('category', form.category);
        fd.append('description', form.description.trim());
        fd.append('is_featured', form.isFeatured);
        const { data } = await apiClient.post('/api/gallery/upload/', fd);
        createdData = data;
      } else {
        const { data } = await apiClient.post('/api/gallery/upload/', {
          title: form.title.trim(),
          location: form.location.trim(),
          category: form.category,
          description: form.description.trim(),
          image_url: form.imageUrl.trim(),
          is_featured: form.isFeatured
        });
        createdData = data;
      }

      setItems((prev) => [{ ...createdData, image: formatImageUrl(createdData.image) }, ...prev]);
      setForm({ title: '', location: '', category: 'CCTV', description: '', imageUrl: '', isFeatured: false });
      clearSelectedFile();
      setSuccessMessage('Project photo successfully uploaded to gallery!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Failed to upload photo. Please check your image format and try again.';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await apiClient.delete(`/api/gallery/${id}/`);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSuccessMessage('Gallery item deleted.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      setError('Failed to delete gallery item.');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <Loader size={28} className="auth-form__spinner" />
        <p>Loading project gallery management...</p>
      </div>
    );
  }

  return (
    <div className="manage-gallery">
      {/* Header */}
      <div className="admin-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="admin-header__title">Project Gallery Management</h1>
        <p className="admin-header__subtitle">
          Upload and showcase verified enterprise installations across CCTV, telecom towers, fiber optics, and networking. ({items.length} total items)
        </p>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 18px',
          background: 'rgba(45, 122, 79, 0.1)',
          border: '1px solid rgba(45, 122, 79, 0.3)',
          color: '#2D7A4F',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 18px',
          background: 'rgba(196, 62, 62, 0.1)',
          border: '1px solid rgba(196, 62, 62, 0.3)',
          color: '#C43E3E',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Visibility Toggle Card */}
      <div className="admin-toggle" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="admin-toggle__label">
            Public Gallery Visibility: <strong>{galleryActive ? 'Active (Live on Website)' : 'Inactive (Hidden from Visitors)'}</strong>
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            When active, clients can browse your project showcase on the Home page and dedicated Gallery page.
          </span>
        </div>
        <div 
          className={`admin-toggle__switch ${galleryActive ? 'admin-toggle__switch--on' : ''}`} 
          onClick={toggleActive} 
          role="switch" 
          aria-checked={galleryActive} 
        />
      </div>

      {/* Upload Form Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-border, #E5E2DB)',
        borderRadius: '16px',
        padding: '1.75rem',
        marginBottom: '2.5rem',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
            Add New Project Installation Photo
          </h3>

          {/* Mode Switch Pills */}
          <div style={{ display: 'flex', gap: '6px', background: '#F5F3EE', padding: '4px', borderRadius: '8px' }}>
            <button
              type="button"
              onClick={() => setUploadMode('file')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: uploadMode === 'file' ? '#FFFFFF' : 'transparent',
                color: uploadMode === 'file' ? 'var(--color-accent, #C75B2B)' : 'var(--color-text-secondary)',
                boxShadow: uploadMode === 'file' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              <Upload size={14} />
              <span>Upload File</span>
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('url')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: uploadMode === 'url' ? '#FFFFFF' : 'transparent',
                color: uploadMode === 'url' ? 'var(--color-accent, #C75B2B)' : 'var(--color-text-secondary)',
                boxShadow: uploadMode === 'url' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              <LinkIcon size={14} />
              <span>Web Image URL</span>
            </button>
          </div>
        </div>

        {/* Upload Dropzone or URL Input */}
        {uploadMode === 'file' ? (
          <div style={{ marginBottom: '1.25rem' }}>
            {filePreview ? (
              <div style={{
                position: 'relative',
                display: 'inline-block',
                border: '2px solid var(--color-accent, #C75B2B)',
                borderRadius: '12px',
                overflow: 'hidden',
                maxHeight: '220px'
              }}>
                <img src={filePreview} alt="Selected preview" style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'cover', display: 'block' }} />
                <button
                  type="button"
                  onClick={clearSelectedFile}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Remove selected image"
                >
                  <X size={16} />
                </button>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {selectedFile?.name} ({(selectedFile?.size / 1024).toFixed(1)} KB)
                </div>
              </div>
            ) : (
              <div 
                className="admin-upload" 
                onClick={() => fileRef.current?.click()}
                style={{
                  border: '2px dashed var(--color-border, #E5E2DB)',
                  borderRadius: '12px',
                  background: '#FAF8F5',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                <Upload size={32} style={{ color: 'var(--color-accent, #C75B2B)', marginBottom: '8px' }} />
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>
                  Click to select a project photo from your device
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Supports JPG, PNG, WebP, AVIF, GIF up to 10MB
                </p>
                <input type="file" ref={fileRef} accept="image/*" onChange={handleFileChange} hidden />
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Direct Image Web URL *
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or https://cdn.yourdomain.com/photo.jpg"
              className="admin-search"
              style={{ maxWidth: '100%', marginBottom: form.imageUrl ? '10px' : '0' }}
              value={form.imageUrl}
              onChange={(e) => setForm(p => ({ ...p, imageUrl: e.target.value }))}
            />
            {form.imageUrl && (
              <div style={{ marginTop: '8px', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', maxWidth: '300px' }}>
                <img 
                  src={form.imageUrl} 
                  alt="URL Preview" 
                  style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>
        )}

        {/* Project Meta Inputs */}
        <form onSubmit={handleUpload} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              Project Title *
            </label>
            <input 
              type="text" 
              placeholder="e.g. Multi-tier CCTV Deployment" 
              className="admin-search" 
              style={{ marginBottom: 0, width: '100%', maxWidth: 'none' }}
              value={form.title} 
              onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} 
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              Service Category *
            </label>
            <select 
              className="admin-search" 
              style={{ marginBottom: 0, width: '100%', maxWidth: 'none' }}
              value={form.category} 
              onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              Location (City, State)
            </label>
            <input 
              type="text" 
              placeholder="e.g. Jamshedpur, Jharkhand" 
              className="admin-search" 
              style={{ marginBottom: 0, width: '100%', maxWidth: 'none' }}
              value={form.location} 
              onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              Project Scope / Notes (Optional)
            </label>
            <input 
              type="text" 
              placeholder="e.g. 32-channel 4K NVR & armored cabling" 
              className="admin-search" 
              style={{ marginBottom: 0, width: '100%', maxWidth: 'none' }}
              value={form.description} 
              onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} 
            />
          </div>

          <div>
            <button 
              type="submit" 
              className="admin-btn admin-btn--primary" 
              disabled={uploading}
              style={{ width: '100%', padding: '0.75rem 1.25rem', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {uploading ? (
                <>
                  <Loader size={16} className="auth-form__spinner" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Publish to Gallery</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Items Listing Table */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
        Current Gallery Showcase ({items.length})
      </h3>

      {items.length === 0 ? (
        <div className="admin-empty" style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
          <ImageIcon size={36} style={{ color: 'var(--color-text-muted)', marginBottom: 8 }} />
          <p>No project photos uploaded yet. Use the form above to add your first installation photo.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div 
                      onClick={() => setLightboxItem(item)} 
                      style={{ cursor: 'pointer', position: 'relative', display: 'inline-block', borderRadius: '8px', overflow: 'hidden' }}
                      title="Click to view full preview"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: 75, height: 50, objectFit: 'cover', display: 'block' }} 
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&q=80';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        opacity: 0,
                        transition: 'opacity 150ms ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                      >
                        <Eye size={16} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>{item.title}</strong>
                    {item.description && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', margin: '2px 0 0 0' }}>
                        {item.description}
                      </p>
                    )}
                  </td>
                  <td>
                    <span className="analytics-status-badge analytics-status-badge--submitted" style={{ fontWeight: 700 }}>
                      {item.category}
                    </span>
                  </td>
                  <td>{item.location || '—'}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td>
                    <button 
                      className="admin-btn admin-btn--danger" 
                      onClick={() => handleDelete(item.id)}
                      title="Delete from gallery"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {lightboxItem && (
        <div 
          onClick={() => setLightboxItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              maxWidth: '750px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid #E5E2DB' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{lightboxItem.title}</h4>
              <button 
                onClick={() => setLightboxItem(null)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>
            <img 
              src={lightboxItem.image} 
              alt={lightboxItem.title} 
              style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', background: '#1A1A1A', display: 'block' }} 
            />
            <div style={{ padding: '12px 18px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              <span>Category: <strong>{lightboxItem.category}</strong></span>
              <span>Location: <strong>{lightboxItem.location || 'N/A'}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
