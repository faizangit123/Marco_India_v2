import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, ClipboardList, Image, Star, Users, MessageSquare, 
  BarChart3, Settings, Bell, Mail, Shield, LogOut
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

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className="admin__sidebar">
        {/* Sidebar Header */}
        <div className="admin__sidebar-header">
          <div className="admin__sidebar-title-row">
            <div className="admin__sidebar-badge">
              <Shield size={14} />
              <span>ADMIN PORTAL</span>
            </div>
            <span className="admin__live-dot" title="System Online"></span>
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
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
