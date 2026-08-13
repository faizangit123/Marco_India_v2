import { useState, useEffect } from 'react';
import { Loader, AlertCircle, Search, Mail, Phone, Eye, Trash2, MessageSquare } from 'lucide-react';
import apiClient from '../../api/client';

const STATUS_LABELS = { new: 'New', read: 'Read', replied: 'Replied', archived: 'Archived' };
const STATUS_OPTIONS = ['new', 'read', 'replied', 'archived'];
const FILTER_TABS = ['All', ...STATUS_OPTIONS];

const ManageContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [notesMap, setNotesMap] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await apiClient.get('/api/contact/all/');
        const list = Array.isArray(data) ? data : data.results || [];
        setMessages(list);
        const notes = {};
        list.forEach(m => { notes[m.id] = m.admin_notes || ''; });
        setNotesMap(notes);
      } catch {
        setError('Unable to load contact messages.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      await apiClient.patch(`/api/contact/${id}/`, { status: newStatus });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    } catch { /* silent */ }
    finally { setUpdating(null); }
  };

  const handleSaveNotes = async (id) => {
    try {
      await apiClient.patch(`/api/contact/${id}/`, { admin_notes: notesMap[id] || '' });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, admin_notes: notesMap[id] } : m));
    } catch { /* silent */ }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact message permanently?')) return;
    try {
      await apiClient.delete(`/api/contact/${id}/`);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch { /* silent */ }
  };

  const filtered = messages
    .filter(m => filter === 'All' || m.status === filter)
    .filter(m => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (m.name || '').toLowerCase().includes(q) ||
             (m.email || '').toLowerCase().includes(q) ||
             (m.service_type || '').toLowerCase().includes(q) ||
             (m.message || '').toLowerCase().includes(q);
    });

  if (loading) return <div className="admin-loading"><Loader size={24} className="auth-form__spinner" /> Loading contacts...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Contact Messages</h1>
        <p className="admin-header__subtitle">Manage all contact form submissions ({messages.length} total)</p>
      </div>

      {error ? (
        <div className="admin-empty"><AlertCircle size={24} />{error}</div>
      ) : (
        <>
          <div className="admin-filters">
            {FILTER_TABS.map(t => (
              <button key={t} className={`admin-filter ${filter === t ? 'admin-filter--active' : ''}`}
                onClick={() => setFilter(t)}>{STATUS_LABELS[t] || t}</button>
            ))}
          </div>

          <div style={{ position: 'relative', marginBottom: 'var(--spacing-xl)' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input type="text" placeholder="Search by name, email, service, or message..." className="admin-search"
              style={{ paddingLeft: 36, marginBottom: 0 }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {filtered.length === 0 ? (
            <div className="admin-empty">No contact messages found.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(m => (
                    <>
                      <tr key={m.id} style={{ cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}>
                        <td>{m.name}</td>
                        <td>
                          <a href={`mailto:${m.email}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
                            {m.email}
                          </a>
                        </td>
                        <td>{m.phone || '-'}</td>
                        <td>{m.service_type}</td>
                        <td>
                          <span className={`profile__status status--${m.status === 'new' ? 'submitted' : m.status === 'replied' ? 'completed' : m.status === 'archived' ? 'cancelled' : 'under_review'}`}>
                            {STATUS_LABELS[m.status] || m.status}
                          </span>
                        </td>
                        <td>{m.created_at ? new Date(m.created_at).toLocaleDateString('en-IN') : '-'}</td>
                        <td>
                          <div className="admin-actions" onClick={e => e.stopPropagation()}>
                            <select value={m.status}
                              onChange={e => handleStatusChange(m.id, e.target.value)}
                              disabled={updating === m.id}
                              className="admin-search"
                              style={{ maxWidth: 120, marginBottom: 0, padding: '0.3rem 0.5rem', fontSize: '0.78rem' }}>
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                              ))}
                            </select>
                            <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(m.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedId === m.id && (
                        <tr key={`${m.id}-detail`}>
                          <td colSpan={7} style={{ padding: 'var(--spacing-md) var(--spacing-lg)', background: 'rgba(17, 24, 39, 0.5)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                              <div>
                                <strong style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Message:</strong>
                                <p style={{ marginTop: 4, fontSize: '0.875rem', color: 'var(--color-text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                  {m.message}
                                </p>
                              </div>
                              <div>
                                <strong style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Admin Notes:</strong>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 4 }}>
                                  <textarea
                                    className="admin-search"
                                    style={{ marginBottom: 0, flex: 1, minHeight: 60, resize: 'vertical', maxWidth: 'none' }}
                                    placeholder="Add internal notes..."
                                    value={notesMap[m.id] || ''}
                                    onChange={e => setNotesMap(p => ({ ...p, [m.id]: e.target.value }))}
                                  />
                                  <button className="admin-btn admin-btn--primary" style={{ alignSelf: 'flex-end' }}
                                    onClick={() => handleSaveNotes(m.id)}>Save</button>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: 'var(--spacing-md)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                <span><Mail size={12} style={{ marginRight: 4 }} /><a href={`mailto:${m.email}`} style={{ color: 'var(--color-accent)' }}>{m.email}</a></span>
                                {m.phone && <span><Phone size={12} style={{ marginRight: 4 }} /><a href={`tel:${m.phone}`} style={{ color: 'var(--color-accent)' }}>{m.phone}</a></span>}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
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

export default ManageContacts;
