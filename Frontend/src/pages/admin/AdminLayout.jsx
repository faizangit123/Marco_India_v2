import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ClipboardList, Image, Star, Users, MessageSquare, 
  BarChart3, Settings, Bell, Mail, Shield, LogOut, Menu, X
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
    title: 'Content',
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
      { label: 'Settings', path: '/admin/settings', icon: Settings },
    ]
  }
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="admin">
      {/* Mobile Top Bar (Only visible on mobile/tablets) */}
      <div className="admin__mobile-bar">
        <button 
          className="admin__mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Admin Menu" : "Open Admin Menu"}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="admin__mobile-brand">
          <div className="admin__sidebar-badge">
            <Shield size={14} />
            <span>ADMIN</span>
          </div>
          <span className="admin__live-dot" title="System Online"></span>
        </div>

        <div className="admin__mobile-actions">
          <div className="admin__user-avatar admin__user-avatar--sm">
            {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
          </div>
          <button onClick={logout} className="admin__logout-icon-btn admin__logout-icon-btn--sm" title="Sign Out">
            <LogOut size={15} />
          </button>
        </div>
      </div>

      {/* Backdrop for Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div 
          className="admin__backdrop" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop sticky sidebar & Mobile off-canvas drawer) */}
      <aside className={`admin__sidebar ${mobileMenuOpen ? 'admin__sidebar--mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="admin__sidebar-header">
          <div className="admin__sidebar-title-row">
            <div className="admin__sidebar-badge">
              <Shield size={14} />
              <span>ADMIN PORTAL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="admin__live-dot" title="System Online"></span>
              {mobileMenuOpen && (
                <button 
                  className="admin__mobile-close-btn" 
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Drawer"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          <p className="admin__sidebar-subtitle">Operations & Management</p>
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
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}
                >
                  <item.icon size={17} className="admin__nav-icon" />
                  <span className="admin__nav-text">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User Card in Footer */}
        <div className="admin__sidebar-footer">
          <div className="admin__user-card">
            <div className="admin__user-avatar">
              {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="admin__user-info">
              <span className="admin__user-name">{user?.name || 'Admin'}</span>
              <span className="admin__user-email">{user?.email || 'admin@marcoindia.in'}</span>
            </div>
            <button onClick={logout} className="admin__logout-icon-btn" title="Sign Out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin__content">
        {/* Quick Horizontal Nav Bar on Mobile for Rapid Switching */}
        <div className="admin__quick-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin__quick-tab ${isActive ? 'admin__quick-tab--active' : ''}`}>
            <LayoutDashboard size={14} /> Dashboard
          </NavLink>
          <NavLink to="/admin/requests" className={({ isActive }) => `admin__quick-tab ${isActive ? 'admin__quick-tab--active' : ''}`}>
            <ClipboardList size={14} /> Requests
          </NavLink>
          <NavLink to="/admin/contacts" className={({ isActive }) => `admin__quick-tab ${isActive ? 'admin__quick-tab--active' : ''}`}>
            <Mail size={14} /> Messages
          </NavLink>
          <NavLink to="/admin/analytics" className={({ isActive }) => `admin__quick-tab ${isActive ? 'admin__quick-tab--active' : ''}`}>
            <BarChart3 size={14} /> Analytics
          </NavLink>
          <NavLink to="/admin/gallery" className={({ isActive }) => `admin__quick-tab ${isActive ? 'admin__quick-tab--active' : ''}`}>
            <Image size={14} /> Gallery
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `admin__quick-tab ${isActive ? 'admin__quick-tab--active' : ''}`}>
            <Users size={14} /> Users
          </NavLink>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
