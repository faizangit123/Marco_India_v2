import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Image, Star, Users, MessageSquare, BarChart3, Settings, Bell, Mail } from 'lucide-react';
import './AdminLayout.css';

const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Service Requests', path: '/admin/requests', icon: ClipboardList },
  { label: 'Contact Messages', path: '/admin/contacts', icon: Mail },
  { label: 'Gallery', path: '/admin/gallery', icon: Image },
  { label: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Comments', path: '/admin/comments', icon: MessageSquare },
  { label: 'Notifications', path: '/admin/notifications', icon: Bell },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminLayout = () => (
  <div className="admin">
    <aside className="admin__sidebar">
      <div className="admin__sidebar-header">
        <h2 className="admin__sidebar-title">Admin Panel</h2>
      </div>
      <nav className="admin__nav">
        {ADMIN_NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
    <main className="admin__content">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
