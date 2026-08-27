import { useState, useEffect } from 'react';
import { ClipboardList, Users, Image, MessageSquare, Mail, Loader, TrendingUp, Clock, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import apiClient from '../../api/client';
import './AdminLayout.css';

const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiClient.get('/api/admin/stats/');
        setStats(data);
        setChartData(data.chart_data || []);
        setRecentInquiries(data.recent_inquiries || []);
        setRecentContacts(data.recent_contacts || []);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load live dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="admin-loading"><Loader size={24} className="auth-form__spinner" /> Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="admin-header">
        <h1 className="admin-header__title">Dashboard</h1>
        <p className="admin-header__subtitle">Real-time overview of your Marco India operations</p>
        {error && <span className="dashboard-preview-badge">{error}</span>}
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <Link to="/admin/requests" className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="admin-stat__icon"><ClipboardList size={20} /></div>
          <div className="admin-stat__value">{stats?.total_inquiries ?? 0}</div>
          <div className="admin-stat__label">Total Inquiries</div>
        </Link>
        <Link to="/admin/requests" className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="admin-stat__icon admin-stat__icon--warning"><Clock size={20} /></div>
          <div className="admin-stat__value">{stats?.pending_requests ?? 0}</div>
          <div className="admin-stat__label">Pending Requests</div>
        </Link>
        <Link to="/admin/contacts" className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="admin-stat__icon admin-stat__icon--contact"><Mail size={20} /></div>
          <div className="admin-stat__value">{stats?.total_contacts ?? 0}</div>
          <div className="admin-stat__label">Contact Messages</div>
        </Link>
        <Link to="/admin/users" className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="admin-stat__icon admin-stat__icon--success"><Users size={20} /></div>
          <div className="admin-stat__value">{stats?.total_users ?? 0}</div>
          <div className="admin-stat__label">Registered Users</div>
        </Link>
        <Link to="/admin/gallery" className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="admin-stat__icon admin-stat__icon--purple"><Image size={20} /></div>
          <div className="admin-stat__value">{stats?.gallery_items ?? 0}</div>
          <div className="admin-stat__label">Gallery Items</div>
        </Link>
        <Link to="/admin/comments" className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="admin-stat__icon"><MessageSquare size={20} /></div>
          <div className="admin-stat__value">{stats?.total_comments ?? 0}</div>
          <div className="admin-stat__label">Comments</div>
        </Link>
        <Link to="/admin/testimonials" className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="admin-stat__icon admin-stat__icon--warning"><Star size={20} /></div>
          <div className="admin-stat__value">{stats?.total_testimonials ?? 0}</div>
          <div className="admin-stat__label">Testimonials</div>
        </Link>
      </div>

      {/* Charts Section */}
      <div className="dashboard-charts">
        <div className="dashboard-chart-card">
          <div className="dashboard-chart-card__header">
            <TrendingUp size={18} />
            <h3>Inquiries & Contacts Over Time</h3>
          </div>
          <div className="dashboard-chart-card__body">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="inquiryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C75B2B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C75B2B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="contactGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DB" />
                <XAxis dataKey="month" stroke="#1A1A1A" fontSize={12} />
                <YAxis stroke="#1A1A1A" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E2DB',
                    borderRadius: '8px',
                    color: '#1A1A1A',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                />
                <Area type="monotone" dataKey="inquiries" stroke="#C75B2B" fillOpacity={1} fill="url(#inquiryGradient)" strokeWidth={2} name="Inquiries" />
                <Area type="monotone" dataKey="contacts" stroke="#22c55e" fillOpacity={1} fill="url(#contactGradient)" strokeWidth={2} name="Contacts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-chart-card">
          <div className="dashboard-chart-card__header">
            <Users size={18} />
            <h3>New Users Per Month</h3>
          </div>
          <div className="dashboard-chart-card__body">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DB" />
                <XAxis dataKey="month" stroke="#1A1A1A" fontSize={12} />
                <YAxis stroke="#1A1A1A" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E2DB',
                    borderRadius: '8px',
                    color: '#1A1A1A',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                />
                <Bar dataKey="users" fill="#C75B2B" radius={[4, 4, 0, 0]} name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity — Real Data Only */}
      <div className="dashboard-charts">
        <div className="dashboard-activity-card">
          <div className="dashboard-activity-card__header">
            <ClipboardList size={18} />
            <h3>Recent Service Inquiries</h3>
          </div>
          <div className="dashboard-activity-card__body">
            {recentInquiries.length > 0 ? (
              <ul className="dashboard-activity-list">
                {recentInquiries.map((item) => (
                  <li key={item.id} className="dashboard-activity-item">
                    <div className="dashboard-activity__icon dashboard-activity__icon--inquiry">
                      <ClipboardList size={16} />
                    </div>
                    <div className="dashboard-activity__content">
                      <p className="dashboard-activity__message">
                        <strong>{item.name}</strong> — {item.service_type}
                      </p>
                      <span className="dashboard-activity__time">
                        <span className={`analytics-status-badge analytics-status-badge--${item.status}`} style={{ fontSize: '0.7rem', padding: '1px 6px', marginRight: 6 }}>
                          {item.status.replace('_', ' ')}
                        </span>
                        {timeAgo(item.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashboard-activity__empty">No inquiries yet</p>
            )}
          </div>
        </div>

        <div className="dashboard-activity-card">
          <div className="dashboard-activity-card__header">
            <Mail size={18} />
            <h3>Recent Contact Messages</h3>
          </div>
          <div className="dashboard-activity-card__body">
            {recentContacts.length > 0 ? (
              <ul className="dashboard-activity-list">
                {recentContacts.map((item) => (
                  <li key={item.id} className="dashboard-activity-item">
                    <div className="dashboard-activity__icon dashboard-activity__icon--comment">
                      <Mail size={16} />
                    </div>
                    <div className="dashboard-activity__content">
                      <p className="dashboard-activity__message">
                        <strong>{item.name}</strong> ({item.email}) — {item.service_type || 'General'}
                      </p>
                      <span className="dashboard-activity__time">{timeAgo(item.created_at)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashboard-activity__empty">No contact messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
