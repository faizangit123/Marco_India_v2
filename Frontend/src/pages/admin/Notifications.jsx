import { useState } from 'react';
import { Bell, Check, Trash2, Mail, AlertCircle, CheckCircle, Info, Clock, Filter } from 'lucide-react';
import './AdminLayout.css';

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: 'inquiry',
    title: 'New Service Request',
    message: 'Rahul Sharma submitted a CCTV installation inquiry for residential property.',
    time: '5 minutes ago',
    read: false,
    icon: Mail,
  },
  {
    id: 2,
    type: 'success',
    title: 'Payment Received',
    message: 'Payment of ₹45,000 received for Order #1042 (Telecom Infrastructure).',
    time: '1 hour ago',
    read: false,
    icon: CheckCircle,
  },
  {
    id: 3,
    type: 'alert',
    title: 'Pending Follow-up',
    message: 'Service request #1038 has been pending for 3 days. Customer awaiting response.',
    time: '2 hours ago',
    read: false,
    icon: AlertCircle,
  },
  {
    id: 4,
    type: 'info',
    title: 'New User Registration',
    message: 'New user priya.singh@example.com has registered on the platform.',
    time: '4 hours ago',
    read: true,
    icon: Info,
  },
  {
    id: 5,
    type: 'success',
    title: 'Project Completed',
    message: 'Fiber Optic Cabling project for Tech Solutions Pvt Ltd marked as complete.',
    time: '6 hours ago',
    read: true,
    icon: CheckCircle,
  },
  {
    id: 6,
    type: 'inquiry',
    title: 'Quote Request',
    message: 'ABC Industries requested a quote for Signal Boosting services.',
    time: '1 day ago',
    read: true,
    icon: Mail,
  },
  {
    id: 7,
    type: 'alert',
    title: 'AMC Renewal Due',
    message: 'AMC contract for Client #892 is due for renewal in 7 days.',
    time: '1 day ago',
    read: true,
    icon: Clock,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

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

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'inquiry': return 'notification-item__icon--inquiry';
      case 'success': return 'notification-item__icon--success';
      case 'alert': return 'notification-item__icon--alert';
      case 'info': return 'notification-item__icon--info';
      default: return '';
    }
  };

  return (
    <div className="notifications-page">
      <div className="admin-header">
        <h1 className="admin-header__title">Notifications</h1>
        <p className="admin-header__subtitle">
          Manage your notifications and alerts
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
                <div className={`notification-item__icon ${getNotificationStyle(notification.type)}`}>
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