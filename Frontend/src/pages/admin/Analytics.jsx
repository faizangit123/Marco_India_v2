import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, MessageSquare, Image, FileText, Clock, Loader, Download, FileSpreadsheet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import apiClient from '../../api/client';
import './AdminLayout.css';

const SERVICE_COLORS = ['#00d4ff', '#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#ef4444'];

const exportToCSV = (data, filename, headers) => {
  const csvRows = [headers.join(',')];
  data.forEach(row => {
    csvRows.push(headers.map(h => row[h] ?? '').join(','));
  });
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const analyticsRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await apiClient.get('/api/admin/stats/');
        setStats(data);
      } catch (err) {
        console.log(err)
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exportMenuOpen && !e.target.closest('.export-dropdown')) {
        setExportMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [exportMenuOpen]);

  if (loading) {
    return (
      <div className="admin-loading">
        <Loader size={24} className="auth-form__spinner" />
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return <div className="admin-loading">{error}</div>;
  }

  // Build pie data from recent inquiries service types
  const serviceMap = {};
  (stats.recent_inquiries || []).forEach(inq => {
    serviceMap[inq.service_type] = (serviceMap[inq.service_type] || 0) + 1;
  });
  const servicePieData = Object.entries(serviceMap).map(([name, value], i) => ({
    name, value, color: SERVICE_COLORS[i % SERVICE_COLORS.length]
  }));

  return (
    <div className="analytics" ref={analyticsRef}>
      <div className="admin-header analytics-header">
        <div>
          <h1 className="admin-header__title">Analytics</h1>
          <p className="admin-header__subtitle">Real-time data from your backend</p>
        </div>
        <div className="export-dropdown">
          <button className="export-btn" onClick={(e) => { e.stopPropagation(); setExportMenuOpen(!exportMenuOpen); }}>
            <Download size={18} /> Export Report
          </button>
          {exportMenuOpen && (
            <div className="export-menu">
              <div className="export-menu__section">
                <span className="export-menu__label">CSV Data</span>
                <button className="export-menu__item" onClick={() => { setExportMenuOpen(false); exportToCSV(stats.chart_data, 'monthly_stats', ['month', 'inquiries', 'contacts', 'users']); }}>
                  <FileSpreadsheet size={16} /> Monthly Stats
                </button>
                <button className="export-menu__item" onClick={() => { setExportMenuOpen(false); exportToCSV(stats.recent_inquiries, 'recent_inquiries', ['name', 'service_type', 'status', 'created_at']); }}>
                  <FileSpreadsheet size={16} /> Recent Inquiries
                </button>
                <button className="export-menu__item" onClick={() => { setExportMenuOpen(false); exportToCSV(stats.recent_contacts, 'recent_contacts', ['name', 'email', 'service_type', 'created_at']); }}>
                  <FileSpreadsheet size={16} /> Recent Contacts
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__icon"><FileText size={20} /></div>
          <div className="admin-stat__value">{stats.total_inquiries}</div>
          <div className="admin-stat__label">Total Inquiries</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--warning"><Clock size={20} /></div>
          <div className="admin-stat__value">{stats.pending_requests}</div>
          <div className="admin-stat__label">Pending Requests</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--success"><Users size={20} /></div>
          <div className="admin-stat__value">{stats.total_users}</div>
          <div className="admin-stat__label">Total Users</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--purple"><MessageSquare size={20} /></div>
          <div className="admin-stat__value">{stats.total_contacts}</div>
          <div className="admin-stat__label">Contact Messages</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__icon"><Image size={20} /></div>
          <div className="admin-stat__value">{stats.gallery_items}</div>
          <div className="admin-stat__label">Gallery Items</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--success"><TrendingUp size={20} /></div>
          <div className="admin-stat__value">{stats.total_testimonials}</div>
          <div className="admin-stat__label">Testimonials</div>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="dashboard-charts">
        <div className="dashboard-chart-card">
          <div className="dashboard-chart-card__header">
            <TrendingUp size={18} />
            <h3>Monthly Activity (Last 6 Months)</h3>
          </div>
          <div className="dashboard-chart-card__body">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.chart_data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                <Bar dataKey="inquiries" fill="#00d4ff" name="Inquiries" radius={[4,4,0,0]} />
                <Bar dataKey="contacts" fill="#6366f1" name="Contacts" radius={[4,4,0,0]} />
                <Bar dataKey="users" fill="#22c55e" name="New Users" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution */}
        {servicePieData.length > 0 && (
          <div className="dashboard-chart-card">
            <div className="dashboard-chart-card__header">
              <TrendingUp size={18} />
              <h3>Service Distribution</h3>
            </div>
            <div className="dashboard-chart-card__body analytics-pie-container">
              <div className="analytics-pie-chart">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={servicePieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                      {servicePieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="analytics-pie-legend">
                {servicePieData.map((item) => (
                  <div key={item.name} className="analytics-legend-item">
                    <span className="analytics-legend-color" style={{ backgroundColor: item.color }}></span>
                    <span className="analytics-legend-label">{item.name}</span>
                    <span className="analytics-legend-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity Tables */}
      <div className="dashboard-charts">
        <div className="dashboard-chart-card">
          <div className="dashboard-chart-card__header">
            <FileText size={18} />
            <h3>Recent Inquiries</h3>
          </div>
          <div className="dashboard-chart-card__body">
            <table className="analytics-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Service</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {stats.recent_inquiries.length === 0 ? (
      <tr><td colSpan={3} className="analytics-table__empty">No inquiries yet</td></tr>
    ) : (
      stats.recent_inquiries.map((inq) => (
        <tr key={inq.id}>
          <td>{inq.name}</td>
          <td>{inq.service_type}</td>
          <td>
            <span className={`analytics-status-badge analytics-status-badge--${inq.status}`}>
              {inq.status.replace('_', ' ')}
            </span>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
          </div>
        </div>

        <div className="dashboard-chart-card">
          <div className="dashboard-chart-card__header">
            <MessageSquare size={18} />
            <h3>Recent Contacts</h3>
          </div>
          <div className="dashboard-chart-card__body">
            <table className="analytics-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Service</th>
    </tr>
  </thead>
  <tbody>
    {stats.recent_contacts.length === 0 ? (
      <tr><td colSpan={3} className="analytics-table__empty">No contacts yet</td></tr>
    ) : (
      stats.recent_contacts.map((c) => (
        <tr key={c.id}>
          <td>{c.name}</td>
          <td>{c.email}</td>
          <td>{c.service_type}</td>
        </tr>
      ))
    )}
  </tbody>
</table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;