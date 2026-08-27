import { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Mail, Loader, CheckCircle } from 'lucide-react';
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

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchRealNotifications = async () => {
      try {
        const { data } = await apiClient.get('/api/admin/stats/');
        const realItems = [];
        
        if (data.recent_inquiries) {
          data.recent_inquiries.forEach((inq) => {
            realItems.push({
              id: `inq-${inq.id}`,
              type: 'inquiry',
              title: 'New Service Request',
              message: `${inq.name} submitted a ${inq.service_type} inquiry.`,
              time: timeAgo(inq.created_at),
              timestamp: new Date(inq.created_at || Date.now()).getTime(),
              read: inq.status !== 'submitted',
              icon: Mail,
            });
          });
        }

        if (data.recent_contacts) {
          data.recent_contacts.forEach((contact) => {
            realItems.push({
              id: `contact-${contact.id}`,
              type: 'contact',
              title: 'New Contact Message',
              message: `${contact.name} (${contact.email}) sent a message regarding ${contact.service_type || 'General Inquiry'}.`,
              time: timeAgo(contact.created_at),
              timestamp: new Date(contact.created_at || Date.now()).getTime(),
              read: false,
              icon: CheckCircle,
            });
          });
        }

        realItems.sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(realItems);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRealNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  if (loading) {
    return (
      <div className="admin-loading">
        <Loader size={24} className="auth-form__spinner" /> Loading real notifications...
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="admin-header">
        <h1 className="admin-header__title">Notifications</h1>
        <p className="admin-header__subtitle">
          Real-time customer inquiries and contact updates from your database
          {unreadCount > 0 && <span className="notifications-badge">{unreadCount} unread</span>}
        </p>
      </div>

      {/* Actions Bar */}
      <div className="notifications-actions">
        <div className="notifications-filters">
          <button
            className={`admin-filter ${filter === 'all' ? 'admin-filter--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`admin-filter ${filter === 'unread' ? 'admin-filter--active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
          <button
            className={`admin-filter ${filter === 'read' ? 'admin-filter--active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read
          </button>
        </div>
        <div className="notifications-bulk-actions">
          <button className="admin-btn" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check size={14} /> Mark all read
          </button>
          <button className="admin-btn admin-btn--danger" onClick={clearAll} disabled={notifications.length === 0}>
            <Trash2 size={14} /> Clear all
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="admin-empty">
            <Bell size={40} />
            <p>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map(notification => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'notification-item--unread' : ''}`}
              >
                <div className={`notification-item__icon notification-item__icon--inquiry`}>
                  <IconComponent size={18} />
                </div>
                <div className="notification-item__content">
                  <h4 className="notification-item__title">{notification.title}</h4>
                  <p className="notification-item__message">{notification.message}</p>
                  <span className="notification-item__time">{notification.time}</span>
                </div>
                <div className="notification-item__actions">
                  {!notification.read && (
                    <button
                      className="notification-action-btn"
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    className="notification-action-btn notification-action-btn--delete"
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;