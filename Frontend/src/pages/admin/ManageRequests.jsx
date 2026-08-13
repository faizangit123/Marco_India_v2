import { useState, useEffect } from 'react';
import { Loader, AlertCircle, Search } from 'lucide-react';
import apiClient from '../../api/client';

const STATUS_OPTIONS = ['submitted', 'under_review', 'in_progress', 'completed', 'cancelled'];
const STATUS_LABELS = { submitted: 'Submitted', under_review: 'Under Review', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled' };
const FILTER_TABS = ['All', ...STATUS_OPTIONS];

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
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
        const { data } = await apiClient.get('/api/inquiries/');
        const list = Array.isArray(data) ? data : data.results || [];
        setRequests(list);
        const notes = {};
        list.forEach(r => { notes[r.id] = r.admin_notes || ''; });
        setNotesMap(notes);
      } catch {
        setError('Unable to load service requests.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      await apiClient.patch(`/api/inquiries/${id}/`, { status: newStatus });
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch { /* silent */ }
    finally { setUpdating(null); }
  };

  const handleSaveNotes = async (id) => {
    try {
      await apiClient.patch(`/api/inquiries/${id}/`, { admin_notes: notesMap[id] || '' });
      setRequests(prev => prev.map(r => r.id === id ? { ...r, admin_notes: notesMap[id] } : r));
    } catch { /* silent */ }
  };

  const filtered = requests
    .filter(r => filter === 'All' || r.status === filter)
    .filter(r => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (r.name || '').toLowerCase().includes(q) ||
             (r.phone || '').toLowerCase().includes(q) ||
             (r.service_type || '').toLowerCase().includes(q);
    });

  if (loading) return <div className="admin-loading"><Loader size={24} className="auth-form__spinner" /> Loading requests...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Service Requests</h1>
        <p className="admin-header__subtitle">Manage all incoming service inquiries ({requests.length} total)</p>
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
            <input type="text" placeholder="Search by name, phone, or service..." className="admin-search"
              style={{ paddingLeft: 36, marginBottom: 0 }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {filtered.length === 0 ? (
            <div className="admin-empty">No requests found.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <>
                      <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}>
                        <td>{r.name}</td>
                        <td><a href={`tel:${r.phone}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>{r.phone}</a></td>
                        <td>{r.service_type}</td>
                        <td>
                          <span className={`profile__status status--${r.status}`}>
                            {STATUS_LABELS[r.status] || r.status}
                          </span>
                        </td>
                        <td>{r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : '-'}</td>
                        <td onClick={e => e.stopPropagation()}>
                          <select value={r.status}
                            onChange={e => handleStatusChange(r.id, e.target.value)}
                            disabled={updating === r.id}
                            className="admin-search"
                            style={{ maxWidth: 160, marginBottom: 0, padding: '0.3rem 0.5rem', fontSize: '0.78rem' }}>
                            {STATUS_OPTIONS.map(s => (
                              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      {expandedId === r.id && (
                        <tr key={`${r.id}-notes`}>
                          <td colSpan={6} style={{ padding: 'var(--spacing-md) var(--spacing-lg)', background: 'rgba(17, 24, 39, 0.5)' }}>
                            <strong style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Admin Notes:</strong>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 4 }}>
                              <textarea
                                className="admin-search"
                                style={{ marginBottom: 0, flex: 1, minHeight: 60, resize: 'vertical', maxWidth: 'none' }}
                                placeholder="Add internal notes about this inquiry..."
                                value={notesMap[r.id] || ''}
                                onChange={e => setNotesMap(p => ({ ...p, [r.id]: e.target.value }))}
                              />
                              <button className="admin-btn admin-btn--primary" style={{ alignSelf: 'flex-end' }}
                                onClick={() => handleSaveNotes(r.id)}>Save</button>
                            </div>
                            {r.user_email && (
                              <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                Submitted by: {r.user_email}
                              </p>
                            )}
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

export default ManageRequests;
