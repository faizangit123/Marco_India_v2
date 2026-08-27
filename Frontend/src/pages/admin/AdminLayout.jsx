import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, ClipboardList, Image, Star, Users, MessageSquare, 
  BarChart3, Settings, Bell, Mail, ExternalLink, ShieldCheck, 
  ChevronRight, LogOut, Activity, Radio
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './AdminLayout.css';

const NAV_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
      { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Operations',
    items: [
      { label: 'Service Requests', path: '/admin/requests', icon: ClipboardList },
      { label: 'Contact Messages', path: '/admin/contacts', icon: Mail },
      { label: 'User Directory', path: '/admin/users', icon: Users },
    ]
  },
  {
    title: 'Content & Media',
    items: [
      { label: 'Project Gallery', path: '/admin/gallery', icon: Image },
      { label: 'Testimonials', path: '/admin/testimonials', icon: Star },
      { label: 'Comments', path: '/admin/comments', icon: MessageSquare },
    ]
  },
  {
    title: 'System',
    items: [
      { label: 'Notifications', path: '/admin/notifications', icon: Bell },
      { label: 'Portal Settings', path: '/admin/settings', icon: Settings },
    ]
  }
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const d = new Date();
    setCurrentDate(d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  // Determine active page label for topbar breadcrumb
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path === '/admin/analytics') return 'Analytics';
    if (path === '/admin/requests') return 'Service Requests';
    if (path === '/admin/contacts') return 'Contact Messages';
    if (path === '/admin/gallery') return 'Project Gallery';
    if (path === '/admin/testimonials') return 'Testimonials';
    if (path === '/admin/users') return 'User Directory';
    if (path === '/admin/comments') return 'Comments Moderation';
    if (path === '/admin/notifications') return 'Notifications';
    if (path === '/admin/settings') return 'Portal Settings';
    return 'Admin Panel';
  };

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className="admin__sidebar">
        {/* Sidebar Header */}
        <div className="admin__sidebar-header">
          <div className="admin__brand">
            <span className="admin__brand-logo">MARCO</span>
            <span className="admin__brand-sub">INDIA</span>
          </div>
          <div className="admin__portal-badge">
            <ShieldCheck size={13} />
            <span>CONTROL CENTER</span>
          </div>
        </div>

        {/* Live System Indicator */}
        <div className="admin__status-pill">
          <span className="admin__status-dot"></span>
          <span className="admin__status-text">Production Engine Online</span>
        </div>

        {/* Categorized Navigation */}
        <nav className="admin__nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="admin__nav-group">
              <span className="admin__nav-heading">{section.title}</span>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}
                >
                  <item.icon size={18} className="admin__nav-icon" />
                  <span className="admin__nav-text">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Sidebar User Card */}
        <div className="admin__sidebar-footer">
          <div className="admin__user-card">
            <div className="admin__user-avatar">
              {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="admin__user-info">
              <span className="admin__user-name">{user?.name || 'Administrator'}</span>
              <span className="admin__user-email">{user?.email || 'admin@marcoindia.in'}</span>
            </div>
          </div>
          <div className="admin__footer-actions">
            <Link to="/" className="admin__footer-btn" title="View Public Website">
              <ExternalLink size={14} />
              <span>Live Site</span>
            </Link>
            <button onClick={logout} className="admin__footer-btn admin__footer-btn--logout" title="Sign Out">
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Top Header */}
      <div className="admin__main-wrapper">
        {/* Admin Top Header Bar */}
        <header className="admin__topbar">
          <div className="admin__topbar-left">
            <div className="admin__breadcrumbs">
              <Link to="/admin">Portal</Link>
              <ChevronRight size={14} />
              <span>{getCurrentPageTitle()}</span>
            </div>
          </div>
          <div className="admin__topbar-right">
            <span className="admin__topbar-date">{currentDate}</span>
            <Link to="/" className="admin__topbar-link" title="Open Website in Live Mode">
              <ExternalLink size={15} />
              <span>Visit Website</span>
            </Link>
            <Link to="/admin/notifications" className="admin__topbar-icon-btn" title="Notifications">
              <Bell size={17} />
              <span className="admin__topbar-dot"></span>
            </Link>
          </div>
        </header>

        {/* Routed Page Content */}
        <main className="admin__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
