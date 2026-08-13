import { useState, useEffect } from 'react';
import { Loader, AlertCircle, Star, Send, Trash2 } from 'lucide-react';
import apiClient from '../../api/client';

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sectionActive, setSectionActive] = useState(true);
  const [form, setForm] = useState({ name: '', role: '', company: '', text: '', rating: 5 });
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, settingsRes] = await Promise.all([
          apiClient.get('/api/testimonials/all/'),
          apiClient.get('/api/testimonials/settings/').catch(() => ({ data: { active: true } })),
        ]);
        const list = Array.isArray(allRes.data) ? allRes.data : allRes.data.results || [];
        setItems(list);
        setSectionActive(settingsRes.data.active);
      } catch {
        setError('Unable to load testimonials.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSectionActive = async () => {
    const next = !sectionActive;
    try {
      await apiClient.patch('/api/testimonials/settings/', { active: next });
      setSectionActive(next);
    } catch { /* silent */ }
  };

  const toggleItem = async (id, current) => {
    try {
      await apiClient.patch(`/api/testimonials/${id}/`, { is_active: !current });
      setItems(prev => prev.map(i => i.id === id ? { ...i, is_active: !current } : i));
    } catch { /* silent */ }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial permanently?')) return;
    try {
      await apiClient.delete(`/api/testimonials/${id}/`);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch { /* silent */ }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setPosting(true);
    try {
      const { data } = await apiClient.post('/api/testimonials/create/', {
        name: form.name.trim(),
        role: form.role.trim(),
        company: form.company.trim(),
        text: form.text.trim(),
        rating: form.rating,
        is_active: true,
      });
      setItems(prev => [data, ...prev]);
      setForm({ name: '', role: '', company: '', text: '', rating: 5 });
    } catch { /* silent */ }
    finally { setPosting(false); }
  };

  if (loading) return <div className="admin-loading"><Loader size={24} className="auth-form__spinner" /> Loading testimonials...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Testimonials Management</h1>
        <p className="admin-header__subtitle">Manage reviews. Only 4-5 star active reviews are shown to users. ({items.length} total)</p>
      </div>

      {error ? (
        <div className="admin-empty"><AlertCircle size={24} />{error}</div>
      ) : (
        <>
          <div className="admin-toggle">
            <span className="admin-toggle__label">Testimonials section is {sectionActive ? 'Active' : 'Inactive'}</span>
            <div className={`admin-toggle__switch ${sectionActive ? 'admin-toggle__switch--on' : ''}`} onClick={toggleSectionActive} role="switch" aria-checked={sectionActive} />
          </div>

          {/* Write review */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-2xl)', maxWidth: 480 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>Add a Testimonial</h3>
            <input type="text" placeholder="Reviewer Name *" className="admin-search" style={{ marginBottom: 0 }}
              value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} maxLength={100} />
            <input type="text" placeholder="Role / Job Title" className="admin-search" style={{ marginBottom: 0 }}
              value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} maxLength={100} />
            <input type="text" placeholder="Company" className="admin-search" style={{ marginBottom: 0 }}
              value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} maxLength={100} />
            <textarea placeholder="Review text *" className="admin-search" style={{ marginBottom: 0, minHeight: 80, resize: 'vertical', maxWidth: 'none' }}
              value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} maxLength={500} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Rating:</span>
              {[1,2,3,4,5].map(n => (
                <Star key={n} size={18} onClick={() => setForm(p => ({ ...p, rating: n }))}
                  style={{ cursor: 'pointer', color: n <= form.rating ? 'var(--color-warning)' : 'var(--color-border)', fill: n <= form.rating ? 'var(--color-warning)' : 'none' }} />
              ))}
            </div>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={posting} style={{ alignSelf: 'flex-start', padding: '0.5rem 1.25rem' }}>
              {posting ? 'Posting...' : <><Send size={14} /> Submit Review</>}
            </button>
          </form>

          {/* List */}
          {items.length === 0 ? (
            <div className="admin-empty">No testimonials yet.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Role</th><th>Company</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map(t => (
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td>{t.role || '-'}</td>
                      <td>{t.company || '-'}</td>
                      <td>
                        <span style={{ display: 'flex', gap: 2 }}>
                          {Array.from({length: 5}, (_, i) => (
                            <Star key={i} size={12} style={{ color: i < t.rating ? 'var(--color-warning)' : 'var(--color-border)', fill: i < t.rating ? 'var(--color-warning)' : 'none' }} />
                          ))}
                        </span>
                      </td>
                      <td>
                        <span className={`profile__status ${t.is_active ? 'status--completed' : 'status--cancelled'}`}>
                          {t.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-btn admin-btn--primary" onClick={() => toggleItem(t.id, t.is_active)}>
                            {t.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(t.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
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

export default ManageTestimonials;
