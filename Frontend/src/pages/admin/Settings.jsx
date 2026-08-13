import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, Mail, Save, Loader } from 'lucide-react';
import './AdminLayout.css';

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Marco India',
    contactEmail: 'marcoindia@gmail.com',
    contactPhone: '+91 8092099110',
    address: 'ROAD no-8 Jawahar Nagar Mango, Jamshedpur, Jharkhand-831012',
    enableNotifications: true,
    emailNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: false,
    primaryColor: '#00d4ff',
    accentColor: '#6366f1',
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <div className="admin-header">
        <h1 className="admin-header__title">Settings</h1>
        <p className="admin-header__subtitle">Configure your website and application settings</p>
      </div>

      <div className="settings-grid">
        {/* General Settings */}
        <div className="settings-card">
          <div className="settings-card__header">
            <Globe size={20} />
            <h3>General Settings</h3>
          </div>
          <div className="settings-card__body">
            <div className="settings-field">
              <label className="settings-label">Site Name</label>
              <input
                type="text"
                className="settings-input"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
              />
            </div>
            <div className="settings-field">
              <label className="settings-label">Contact Email</label>
              <input
                type="email"
                className="settings-input"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
              />
            </div>
            <div className="settings-field">
              <label className="settings-label">Contact Phone</label>
              <input
                type="tel"
                className="settings-input"
                value={settings.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
              />
            </div>
            <div className="settings-field">
              <label className="settings-label">Business Address</label>
              <textarea
                className="settings-textarea"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <div className="settings-card__header">
            <Bell size={20} />
            <h3>Notifications</h3>
          </div>
          <div className="settings-card__body">
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-label">Push Notifications</span>
                <span className="settings-toggle-desc">Receive browser push notifications</span>
              </div>
              <button
                className={`settings-toggle ${settings.enableNotifications ? 'settings-toggle--active' : ''}`}
                onClick={() => handleChange('enableNotifications', !settings.enableNotifications)}
              >
                <span className="settings-toggle__knob"></span>
              </button>
            </div>
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-label">Email Notifications</span>
                <span className="settings-toggle-desc">Receive updates via email</span>
              </div>
              <button
                className={`settings-toggle ${settings.emailNotifications ? 'settings-toggle--active' : ''}`}
                onClick={() => handleChange('emailNotifications', !settings.emailNotifications)}
              >
                <span className="settings-toggle__knob"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-card">
          <div className="settings-card__header">
            <Shield size={20} />
            <h3>Security</h3>
          </div>
          <div className="settings-card__body">
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-label">Allow User Registration</span>
                <span className="settings-toggle-desc">Enable new user sign-ups</span>
              </div>
              <button
                className={`settings-toggle ${settings.allowRegistration ? 'settings-toggle--active' : ''}`}
                onClick={() => handleChange('allowRegistration', !settings.allowRegistration)}
              >
                <span className="settings-toggle__knob"></span>
              </button>
            </div>
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-label">Require Email Verification</span>
                <span className="settings-toggle-desc">Users must verify email to login</span>
              </div>
              <button
                className={`settings-toggle ${settings.requireEmailVerification ? 'settings-toggle--active' : ''}`}
                onClick={() => handleChange('requireEmailVerification', !settings.requireEmailVerification)}
              >
                <span className="settings-toggle__knob"></span>
              </button>
            </div>
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-label">Maintenance Mode</span>
                <span className="settings-toggle-desc">Show maintenance page to visitors</span>
              </div>
              <button
                className={`settings-toggle ${settings.maintenanceMode ? 'settings-toggle--active' : ''}`}
                onClick={() => handleChange('maintenanceMode', !settings.maintenanceMode)}
              >
                <span className="settings-toggle__knob"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="settings-card">
          <div className="settings-card__header">
            <Palette size={20} />
            <h3>Appearance</h3>
          </div>
          <div className="settings-card__body">
            <div className="settings-field">
              <label className="settings-label">Primary Color</label>
              <div className="settings-color-row">
                <input
                  type="color"
                  className="settings-color-picker"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
                <input
                  type="text"
                  className="settings-input settings-input--small"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
              </div>
            </div>
            <div className="settings-field">
              <label className="settings-label">Accent Color</label>
              <div className="settings-color-row">
                <input
                  type="color"
                  className="settings-color-picker"
                  value={settings.accentColor}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                />
                <input
                  type="text"
                  className="settings-input settings-input--small"
                  value={settings.accentColor}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="settings-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? <Loader size={18} className="auth-form__spinner" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Settings;