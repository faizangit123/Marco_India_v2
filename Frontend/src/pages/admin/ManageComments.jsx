import { useState, useEffect } from 'react';
import { Loader, AlertCircle, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import apiClient from '../../api/client';

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | visible | hidden

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await apiClient.get('/api/comments/all/');
        setComments(Array.isArray(data) ? data : data.results || []);
      } catch {
        setError('Unable to load comments.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const toggleVisibility = async (id, currentVisible) => {
    try {
      await apiClient.patch(`/api/comments/${id}/`, { is_visible: !currentVisible });
      setComments(prev => prev.map(c => c.id === id ? { ...c, is_visible: !currentVisible } : c));
    } catch { /* silent */ }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment permanently?')) return;
    try {
      await apiClient.delete(`/api/comments/${id}/`);
      setComments(prev => prev.filter(c => c.id !== id));
    } catch { /* silent */ }
  };

  const filtered = comments
    .filter(c => {
      if (filter === 'visible') return c.is_visible;
      if (filter === 'hidden') return !c.is_visible;
      return true;
    })
    .filter(c => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (c.user_name || '').toLowerCase().includes(q) ||
             (c.user_email || '').toLowerCase().includes(q) ||
             (c.text || '').toLowerCase().includes(q) ||
             (c.page || '').toLowerCase().includes(q);
    });

  if (loading) return <div className="admin-loading"><Loader size={24} className="auth-form__spinner" /> Loading comments...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Comments</h1>
        <p className="admin-header__subtitle">Moderate user comments across all pages ({comments.length} total)</p>
      </div>

      {error ? (
        <div className="admin-empty"><AlertCircle size={24} />{error}</div>
      ) : (
        <>
          {/* Filters */}
          <div className="admin-filters">
            {['all', 'visible', 'hidden'].map(f => (
              <button key={f} className={`admin-filter ${filter === f ? 'admin-filter--active' : ''}`}
                onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f === 'visible' ? '✓ Visible' : '✗ Hidden'}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', marginBottom: 'var(--spacing-xl)' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input type="text" placeholder="Search by user, email, page, or text..." className="admin-search"
              style={{ paddingLeft: 36, marginBottom: 0 }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {filtered.length === 0 ? (
            <div className="admin-empty">No comments found.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Page</th>
                    <th>Comment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c.id} style={{ opacity: c.is_visible === false ? 0.5 : 1 }}>
                      <td>{c.user_name || '-'}</td>
                      <td style={{ fontSize: '0.8rem' }}>{c.user_email || '-'}</td>
                      <td>{c.page}</td>
                      <td style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.text}</td>
                      <td>
                        <span className={`profile__status ${c.is_visible !== false ? 'status--completed' : 'status--cancelled'}`}>
                          {c.is_visible !== false ? 'Visible' : 'Hidden'}
                        </span>
                      </td>
                      <td>{c.created_at ? new Date(c.created_at).toLocaleDateString('en-IN') : '-'}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-btn admin-btn--primary"
                            onClick={() => toggleVisibility(c.id, c.is_visible !== false)}
                            title={c.is_visible !== false ? 'Hide comment' : 'Show comment'}>
                            {c.is_visible !== false ? <><EyeOff size={14} /> Hide</> : <><Eye size={14} /> Show</>}
                          </button>
                          <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(c.id)}>
                            <Trash2 size={14} /> Delete
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

export default ManageComments;
