import { useState, useEffect } from 'react';
import { 
  ClipboardList, Users, Image, MessageSquare, Mail, Loader, 
  TrendingUp, Clock, Star, ArrowUpRight, CheckCircle2, 
  Sparkles, RefreshCw, Layers
} from 'lucide-react';
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
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const { data } = await apiClient.get('/api/admin/stats/');
      setStats(data);
      setChartData(data.chart_data || []);
      setRecentInquiries(data.recent_inquiries || []);
      setRecentContacts(data.recent_contacts || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load live dashboard statistics.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <Loader size={28} className="auth-form__spinner" />
        <p>Loading enterprise analytics dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Welcome Hero Banner */}
      <div className="admin-hero-banner">
        <div className="admin-hero-banner__content">
          <div className="admin-hero-banner__badge">
            <Sparkles size={14} />
            <span>Marco India Enterprise Operations</span>
          </div>
          <h1 className="admin-hero-banner__title">
            Welcome back, <span>Administrator</span>
          </h1>
          <p className="admin-hero-banner__subtitle">
            Here is your live operational overview across CCTV installations, telecom infrastructure, client inquiries, and platform users.
          </p>
        </div>
        <div className="admin-hero-banner__actions">
          <button 
            onClick={fetchData} 
            className="admin-hero-btn admin-hero-btn--refresh" 
            disabled={refreshing}
            title="Refresh live data"
          >
            <RefreshCw size={15} className={refreshing ? 'auth-form__spinner' : ''} />
            <span>{refreshing ? 'Syncing...' : 'Sync Data'}</span>
          </button>
          <Link to="/admin/requests" className="admin-hero-btn admin-hero-btn--primary">
            <span>View Inquiries</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {error && <div className="dashboard-preview-badge" style={{ marginBottom: 'var(--spacing-xl)' }}>{error}</div>}

      {/* KPI Stat Cards Grid */}
      <div className="admin-stats">
        <Link to="/admin/requests" className="admin-stat admin-stat--clickable">
          <div className="admin-stat__top">
            <div className="admin-stat__icon"><ClipboardList size={22} /></div>
            <span className="admin-stat__trend">Live DB</span>
          </div>
          <div className="admin-stat__value">{stats?.total_inquiries ?? 0}</div>
          <div className="admin-stat__label">Total Service Inquiries</div>
          <div className="admin-stat__footer">
            <span>View detailed inquiries</span>
            <ArrowUpRight size={14} />
          </div>
        </Link>

        <Link to="/admin/requests" className="admin-stat admin-stat--clickable admin-stat--accent-warning">
          <div className="admin-stat__top">
            <div className="admin-stat__icon admin-stat__icon--warning"><Clock size={22} /></div>
            <span className="admin-stat__trend admin-stat__trend--warning">Action Needed</span>
          </div>
          <div className="admin-stat__value">{stats?.pending_requests ?? 0}</div>
          <div className="admin-stat__label">Pending Inquiries</div>
          <div className="admin-stat__footer">
            <span>Review pending requests</span>
            <ArrowUpRight size={14} />
          </div>
        </Link>

        <Link to="/admin/contacts" className="admin-stat admin-stat--clickable admin-stat--accent-contact">
          <div className="admin-stat__top">
            <div className="admin-stat__icon admin-stat__icon--contact"><Mail size={22} /></div>
            <span className="admin-stat__trend">Messages</span>
          </div>
          <div className="admin-stat__value">{stats?.total_contacts ?? 0}</div>
          <div className="admin-stat__label">Contact Submissions</div>
          <div className="admin-stat__footer">
            <span>Read contact messages</span>
            <ArrowUpRight size={14} />
          </div>
        </Link>

        <Link to="/admin/users" className="admin-stat admin-stat--clickable admin-stat--accent-success">
          <div className="admin-stat__top">
            <div className="admin-stat__icon admin-stat__icon--success"><Users size={22} /></div>
            <span className="admin-stat__trend admin-stat__trend--success">Registered</span>
          </div>
          <div className="admin-stat__value">{stats?.total_users ?? 0}</div>
          <div className="admin-stat__label">Registered Users</div>
          <div className="admin-stat__footer">
            <span>Manage user directory</span>
            <ArrowUpRight size={14} />
          </div>
        </Link>

        <Link to="/admin/gallery" className="admin-stat admin-stat--clickable admin-stat--accent-purple">
          <div className="admin-stat__top">
            <div className="admin-stat__icon admin-stat__icon--purple"><Image size={22} /></div>
            <span className="admin-stat__trend">Showcase</span>
          </div>
          <div className="admin-stat__value">{stats?.gallery_items ?? 0}</div>
          <div className="admin-stat__label">Project Gallery Items</div>
          <div className="admin-stat__footer">
            <span>Upload or manage photos</span>
            <ArrowUpRight size={14} />
          </div>
        </Link>

        <Link to="/admin/testimonials" className="admin-stat admin-stat--clickable admin-stat--accent-warning">
          <div className="admin-stat__top">
            <div className="admin-stat__icon admin-stat__icon--warning"><Star size={22} /></div>
            <span className="admin-stat__trend">Reviews</span>
          </div>
          <div className="admin-stat__value">{stats?.total_testimonials ?? 0}</div>
          <div className="admin-stat__label">Client Testimonials</div>
          <div className="admin-stat__footer">
            <span>Moderate client reviews</span>
            <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>

      {/* Analytics Charts Grid */}
      <div className="dashboard-charts">
        {/* Activity Area Chart */}
        <div className="dashboard-chart-card">
          <div className="dashboard-chart-card__header">
            <div className="dashboard-chart-card__header-left">
              <TrendingUp size={18} />
              <h3>Inquiries & Contacts Trend</h3>
            </div>
            <span className="dashboard-chart-card__badge">Last 6 Months</span>
          </div>
          <div className="dashboard-chart-card__body">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="inquiryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C75B2B" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#C75B2B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="contactGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DB" />
                <XAxis dataKey="month" stroke="#1A1A1A" fontSize={12} tickLine={false} />
                <YAxis stroke="#1A1A1A" fontSize={12} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E2DB',
                    borderRadius: '10px',
                    color: '#1A1A1A',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                />
                <Area type="monotone" dataKey="inquiries" stroke="#C75B2B" fillOpacity={1} fill="url(#inquiryGradient)" strokeWidth={2.5} name="Service Inquiries" />
                <Area type="monotone" dataKey="contacts" stroke="#22c55e" fillOpacity={1} fill="url(#contactGradient)" strokeWidth={2.5} name="Contact Messages" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Bar Chart */}
        <div className="dashboard-chart-card">
          <div className="dashboard-chart-card__header">
            <div className="dashboard-chart-card__header-left">
              <Users size={18} />
              <h3>User Registration Growth</h3>
            </div>
            <span className="dashboard-chart-card__badge">Monthly Aggregate</span>
          </div>
          <div className="dashboard-chart-card__body">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DB" />
                <XAxis dataKey="month" stroke="#1A1A1A" fontSize={12} tickLine={false} />
                <YAxis stroke="#1A1A1A" fontSize={12} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E2DB',
                    borderRadius: '10px',
                    color: '#1A1A1A',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="users" fill="#C75B2B" radius={[6, 6, 0, 0]} name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Real Live Activity Feed Section */}
      <div className="dashboard-charts">
        {/* Recent Service Inquiries */}
        <div className="dashboard-activity-card">
          <div className="dashboard-activity-card__header">
            <div className="dashboard-activity-card__header-left">
              <ClipboardList size={18} />
              <h3>Recent Service Inquiries</h3>
            </div>
            <Link to="/admin/requests" className="dashboard-activity-card__view-all">View All →</Link>
          </div>
          <div className="dashboard-activity-card__body">
            {recentInquiries.length > 0 ? (
              <ul className="dashboard-activity-list">
                {recentInquiries.map((item) => (
                  <li key={item.id} className="dashboard-activity-item">
                    <div className="dashboard-activity__icon dashboard-activity__icon--inquiry">
                      <ClipboardList size={17} />
                    </div>
                    <div className="dashboard-activity__content">
                      <div className="dashboard-activity__top-row">
                        <span className="dashboard-activity__author">{item.name}</span>
                        <span className={`analytics-status-badge analytics-status-badge--${item.status}`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="dashboard-activity__message">
                        {item.service_type}
                      </p>
                      <span className="dashboard-activity__time">
                        <Clock size={12} style={{ marginRight: 4 }} />
                        {timeAgo(item.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dashboard-activity__empty">
                <ClipboardList size={32} style={{ color: 'var(--color-text-muted)', marginBottom: 8 }} />
                <p>No service inquiries received yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="dashboard-activity-card">
          <div className="dashboard-activity-card__header">
            <div className="dashboard-activity-card__header-left">
              <Mail size={18} />
              <h3>Recent Contact Submissions</h3>
            </div>
            <Link to="/admin/contacts" className="dashboard-activity-card__view-all">View All →</Link>
          </div>
          <div className="dashboard-activity-card__body">
            {recentContacts.length > 0 ? (
              <ul className="dashboard-activity-list">
                {recentContacts.map((item) => (
                  <li key={item.id} className="dashboard-activity-item">
                    <div className="dashboard-activity__icon dashboard-activity__icon--contact">
                      <Mail size={17} />
                    </div>
                    <div className="dashboard-activity__content">
                      <div className="dashboard-activity__top-row">
                        <span className="dashboard-activity__author">{item.name}</span>
                        <span className="dashboard-activity__service-tag">{item.service_type || 'General'}</span>
                      </div>
                      <p className="dashboard-activity__message" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.email}
                      </p>
                      <span className="dashboard-activity__time">
                        <Clock size={12} style={{ marginRight: 4 }} />
                        {timeAgo(item.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dashboard-activity__empty">
                <Mail size={32} style={{ color: 'var(--color-text-muted)', marginBottom: 8 }} />
                <p>No contact messages submitted yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
