import { useState, useEffect, useRef } from 'react';
import { Loader, Trash2, Upload, AlertCircle } from 'lucide-react';
import apiClient from '../../api/client';

const CATEGORIES = ['CCTV', 'Telecom', 'Signal Boosting', 'Networking', 'Fiber Optic', 'Other'];

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [galleryActive, setGalleryActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', category: 'CCTV', description: '' });
  const fileRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await apiClient.get('/api/gallery/admin/');
        setItems(Array.isArray(data) ? data : data.results || []);
        if (data.active !== undefined) setGalleryActive(data.active);
      } catch {
        setError('Unable to load gallery items.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const toggleActive = async () => {
    const next = !galleryActive;
    try {
      await apiClient.patch('/api/gallery/settings/', { active: next });
      setGalleryActive(next);
    } catch { /* silent */ }
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !form.title.trim()) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('title', form.title.trim());
      fd.append('location', form.location.trim());
      fd.append('category', form.category);
      fd.append('description', form.description.trim());
      const { data } = await apiClient.post('/api/gallery/upload/', fd);
      setItems((prev) => [data, ...prev]);
      setForm({ title: '', location: '', category: 'CCTV', description: '' });
      if (fileRef.current) fileRef.current.value = '';
    } catch { /* silent */ }
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try {
      await apiClient.delete(`/api/gallery/${id}/`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch { /* silent */ }
  };

  if (loading) return <div className="admin-loading"><Loader size={24} className="auth-form__spinner" /> Loading gallery...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Gallery Management</h1>
        <p className="admin-header__subtitle">Add, remove, and toggle project gallery visibility ({items.length} items)</p>
      </div>

      {error ? (
        <div className="admin-empty"><AlertCircle size={24} />{error}</div>
      ) : (
        <>
          <div className="admin-toggle">
            <span className="admin-toggle__label">Gallery is {galleryActive ? 'Active' : 'Inactive'} — {galleryActive ? 'visible to users' : 'hidden from users'}</span>
            <div className={`admin-toggle__switch ${galleryActive ? 'admin-toggle__switch--on' : ''}`} onClick={toggleActive} role="switch" aria-checked={galleryActive} />
          </div>

          <div className="admin-upload" onClick={() => fileRef.current?.click()}>
            <Upload size={28} className="admin-upload__icon" />
            <p>Click to select a photo</p>
            <input type="file" ref={fileRef} accept="image/*" hidden />
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Title *" className="admin-search" style={{ marginBottom: 0 }}
              value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} />
            <input type="text" placeholder="Location" className="admin-search" style={{ marginBottom: 0 }}
              value={form.location} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))} />
            <select className="admin-search" style={{ marginBottom: 0, maxWidth: 160 }}
              value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Description (optional)" className="admin-search" style={{ marginBottom: 0, maxWidth: 240 }}
              value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} />
            <button className="admin-btn admin-btn--primary" onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>

          {items.length === 0 ? (
            <div className="admin-empty">No gallery items yet.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Image</th><th>Title</th><th>Category</th><th>Location</th><th>Featured</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td><img src={item.image || item.src} alt={item.title} style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} /></td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.location || '-'}</td>
                      <td>
                        <span className={`profile__status ${item.is_featured ? 'status--completed' : 'status--submitted'}`}>
                          {item.is_featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(item.id)}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageGallery;
