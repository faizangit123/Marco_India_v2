import { useState, useEffect } from 'react';
import { Loader, AlertCircle, Search, UserX, UserCheck, Trash2, Shield, ShieldOff } from 'lucide-react';
import apiClient from '../../api/client';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | inactive | admin

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await apiClient.get('/api/admin/users/');
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch {
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const toggleActive = async (id, currentActive) => {
    try {
      await apiClient.patch(`/api/admin/users/${id}/`, { is_active: !currentActive });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: !currentActive } : u));
    } catch { /* silent */ }
  };

  const toggleAdmin = async (id, currentStaff) => {
    if (!window.confirm(currentStaff ? 'Remove admin privileges?' : 'Grant admin privileges?')) return;
    try {
      await apiClient.patch(`/api/admin/users/${id}/`, { is_staff: !currentStaff });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_staff: !currentStaff } : u));
    } catch { /* silent */ }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this user? This cannot be undone.')) return;
    try {
      await apiClient.delete(`/api/admin/users/${id}/`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete user.');
    }
  };

  const filtered = users
    .filter(u => {
      if (filter === 'active') return u.is_active;
      if (filter === 'inactive') return !u.is_active;
      if (filter === 'admin') return u.is_staff;
      return true;
    })
    .filter(u => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (u.name || '').toLowerCase().includes(q) ||
             (u.email || '').toLowerCase().includes(q) ||
             (u.phone || '').toLowerCase().includes(q);
    });

  if (loading) return <div className="admin-loading"><Loader size={24} className="auth-form__spinner" /> Loading users...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Users</h1>
        <p className="admin-header__subtitle">Manage all registered users ({users.length} total)</p>
      </div>

      {error ? (
        <div className="admin-empty"><AlertCircle size={24} />{error}</div>
      ) : (
        <>
          {/* Filters */}
          <div className="admin-filters">
            {[
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'inactive', label: 'Inactive' },
              { key: 'admin', label: 'Admins' },
            ].map(f => (
              <button key={f.key} className={`admin-filter ${filter === f.key ? 'admin-filter--active' : ''}`}
                onClick={() => setFilter(f.key)}>{f.label}</button>
            ))}
          </div>

          <div style={{ position: 'relative', marginBottom: 'var(--spacing-xl)' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input type="text" placeholder="Search by name, email, or phone..." className="admin-search"
              style={{ paddingLeft: 36, marginBottom: 0 }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {filtered.length === 0 ? (
            <div className="admin-empty">No users found.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id} style={{ opacity: u.is_active === false ? 0.5 : 1 }}>
                      <td>{u.name || '-'}</td>
                      <td>{u.email}</td>
                      <td>{u.phone || '-'}</td>
                      <td>
                        <span className={`profile__status ${u.is_staff ? 'status--in_progress' : 'status--submitted'}`}>
                          {u.is_staff ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td>
                        <span className={`profile__status ${u.is_active !== false ? 'status--completed' : 'status--cancelled'}`}>
                          {u.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{u.date_joined ? new Date(u.date_joined).toLocaleDateString('en-IN') : '-'}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-btn admin-btn--primary"
                            onClick={() => toggleActive(u.id, u.is_active !== false)}
                            title={u.is_active !== false ? 'Deactivate user' : 'Activate user'}>
                            {u.is_active !== false ? <><UserX size={14} /></> : <><UserCheck size={14} /></>}
                          </button>
                          <button className="admin-btn admin-btn--primary"
                            onClick={() => toggleAdmin(u.id, u.is_staff)}
                            title={u.is_staff ? 'Remove admin' : 'Make admin'}>
                            {u.is_staff ? <ShieldOff size={14} /> : <Shield size={14} />}
                          </button>
                          <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(u.id)}
                            title="Delete user">
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

export default ManageUsers;
