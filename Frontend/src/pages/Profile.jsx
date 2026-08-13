import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Camera, Lock, Save, Loader, CheckCircle, AlertCircle, ChevronRight, Clock, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../api/client';
import './Profile.css';
import './InnerPage.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const STATUS_LABELS = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STATUS_CLASSES = {
  submitted: 'status--submitted',
  under_review: 'status--review',
  in_progress: 'status--progress',
  completed: 'status--completed',
  cancelled: 'status--cancelled',
};

/* ── Crop Modal ───────────────────────────────────────────── */
const CropModal = ({ imageSrc, onCancel, onCrop }) => {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const imgRef = useRef(new Image());
  const SIZE = 300; // canvas size

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;
    ctx.clearRect(0, 0, SIZE, SIZE);

    const scale = zoom;
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = SIZE / 2 - w / 2 + offset.x;
    const y = SIZE / 2 - h / 2 + offset.y;

    // Clip circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();

    // Overlay outside circle
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();

    // Circle border
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 1, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,212,255,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [zoom, offset]);

  useEffect(() => {
    const img = imgRef.current;
    img.src = imageSrc;
    img.onload = draw;
  }, [imageSrc]);

  useEffect(() => { draw(); }, [draw]);

  const onPointerDown = (e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const onPointerUp = () => setDragging(false);

  const handleCrop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;
    const scale = zoom;
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const sx = SIZE / 2 - w / 2 + offset.x;
    const sy = SIZE / 2 - h / 2 + offset.y;
    const ratio = 256 / SIZE;
    ctx.beginPath();
    ctx.arc(128, 128, 128, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, sx * ratio, sy * ratio, w * ratio, h * ratio);
    canvas.toBlob((blob) => onCrop(blob), 'image/jpeg', 0.92);
  };

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal">
        <div className="crop-modal__header">
          <h3>Crop Profile Photo</h3>
          <button className="crop-modal__close" onClick={onCancel}><X size={18} /></button>
        </div>
        <p className="crop-modal__hint">Drag to reposition · Scroll or use slider to zoom</p>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="crop-modal__canvas"
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onWheel={(e) => setZoom(z => Math.min(4, Math.max(0.2, z - e.deltaY * 0.001)))}
        />
        <div className="crop-modal__zoom">
          <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}><ZoomOut size={16} /></button>
          <input type="range" min="20" max="400" value={Math.round(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) / 100)} />
          <button onClick={() => setZoom(z => Math.min(4, z + 0.1))}><ZoomIn size={16} /></button>
          <button className="crop-modal__reset" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
        <div className="crop-modal__actions">
          <button className="crop-modal__cancel" onClick={onCancel}>Cancel</button>
          <button className="crop-modal__save" onClick={handleCrop}>Apply & Save</button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Profile Component ───────────────────────────────── */
const Profile = () => {
  const { user, updateProfile, updateAvatar, changePassword, logout } = useAuth();

  const [tab, setTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '' });
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });
  const [profileStatus, setProfileStatus] = useState('idle');
  const [passwordStatus, setPasswordStatus] = useState('idle');
  const [profileMsg, setProfileMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requestsError, setRequestsError] = useState('');
  const [cropSrc, setCropSrc] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || user.first_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchRequests = async () => {
      setRequestsLoading(true);
      try {
        const { data } = await apiClient.get('/api/inquiries/');
        setRequests(Array.isArray(data) ? data : data.results || []);
      } catch {
        setRequestsError('Unable to load your service requests.');
      } finally {
        setRequestsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Fix avatar URL — prepend API base if it's a relative path
  const avatarUrl = user?.avatar
    ? (user.avatar.startsWith('http') ? user.avatar : `${API_BASE}${user.avatar}`)
    : null;

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCropSrc(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = ''; // reset so same file can be re-selected
  };

  const handleCropDone = async (blob) => {
    setCropSrc(null);
    const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
    try {
      await updateAvatar(file);
    } catch {
      // silent
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileStatus('loading');
    setProfileMsg('');
    try {
      await updateProfile({ name: profileForm.name.trim(), phone: profileForm.phone.trim() });
      setProfileStatus('success');
      setProfileMsg('Profile updated successfully.');
    } catch (err) {
      setProfileStatus('error');
      setProfileMsg(err.response?.data?.detail || 'Failed to update profile.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.new.length < 8) {
      setPasswordStatus('error');
      setPasswordMsg('New password must be at least 8 characters.');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordStatus('error');
      setPasswordMsg('Passwords do not match.');
      return;
    }
    setPasswordStatus('loading');
    setPasswordMsg('');
    try {
      await changePassword(passwordForm.old, passwordForm.new);
      setPasswordStatus('success');
      setPasswordMsg('Password changed successfully.');
      setPasswordForm({ old: '', new: '', confirm: '' });
    } catch (err) {
      setPasswordStatus('error');
      setPasswordMsg(err.response?.data?.detail || 'Failed to change password.');
    }
  };

  return (
    <main>
      {cropSrc && (
        <CropModal
          imageSrc={cropSrc}
          onCancel={() => setCropSrc(null)}
          onCrop={handleCropDone}
        />
      )}

      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">My <span>Profile</span></h1>
          <nav className="page-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Profile</span>
          </nav>
        </div>
      </section>

      <section className="inner-section">
        <div className="container">
          <div className="profile">
            <div className="profile__tabs">
              {['profile', 'requests', 'password'].map((t) => (
                <button key={t}
                  className={`profile__tab ${tab === t ? 'profile__tab--active' : ''}`}
                  onClick={() => setTab(t)}>
                  {t === 'profile' ? 'Profile' : t === 'requests' ? 'My Requests' : 'Change Password'}
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {tab === 'profile' && (
              <div className="profile__section">
                <div className="profile__avatar-section">
                  <div className="profile__avatar">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <span>{(user?.name || user?.email || 'U').charAt(0).toUpperCase()}</span>
                    )}
                    <label className="profile__avatar-edit" htmlFor="avatar-upload" title="Change photo">
                      <Camera size={14} />
                      <input type="file" id="avatar-upload" accept="image/*" onChange={handleAvatarChange} hidden />
                    </label>
                  </div>
                  <div>
                    <h3 className="profile__name">{user?.name || user?.first_name || 'User'}</h3>
                    <p className="profile__email">{user?.email}</p>
                  </div>
                </div>

                <form className="profile__form" onSubmit={handleProfileSave}>
                  <div className="auth-form__field">
                    <label className="auth-form__label"><User size={14} /> Full Name</label>
                    <input type="text" className="auth-form__input" value={profileForm.name}
                      onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} maxLength={100} />
                  </div>
                  <div className="auth-form__field">
                    <label className="auth-form__label"><Mail size={14} /> Email</label>
                    <input type="email" className="auth-form__input" value={profileForm.email} disabled
                      style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                  </div>
                  <div className="auth-form__field">
                    <label className="auth-form__label"><Phone size={14} /> Phone</label>
                    <input type="tel" className="auth-form__input" value={profileForm.phone}
                      onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))} maxLength={15} />
                  </div>
                  {profileMsg && (
                    <div className={`auth-form__server-error ${profileStatus === 'success' ? 'auth-form__server-error--success' : ''}`}>
                      {profileStatus === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      <span>{profileMsg}</span>
                    </div>
                  )}
                  <button type="submit" className="auth-form__submit" disabled={profileStatus === 'loading'}>
                    {profileStatus === 'loading' ? <Loader size={18} className="auth-form__spinner" /> : <><Save size={16} /> Save Changes</>}
                  </button>
                </form>
                <button className="profile__logout" onClick={logout}>Sign Out</button>
              </div>
            )}

            {/* Requests Tab */}
            {tab === 'requests' && (
              <div className="profile__section">
                <h3 className="profile__section-title">My Service Requests</h3>
                {requestsLoading ? (
                  <div className="profile__loading"><Loader size={20} className="auth-form__spinner" /> Loading...</div>
                ) : requestsError ? (
                  <div className="profile__empty">{requestsError}</div>
                ) : requests.length === 0 ? (
                  <div className="profile__empty">
                    <Clock size={32} />
                    <p>No service requests yet.</p>
                    <Link to="/services" className="auth-card__link">Browse our services</Link>
                  </div>
                ) : (
                  <div className="profile__requests">
                    {requests.map((req) => (
                      <div key={req.id} className="profile__request-card">
                        <div className="profile__request-header">
                          <strong>{req.service_type}</strong>
                          <span className={`profile__status ${STATUS_CLASSES[req.status] || ''}`}>
                            {STATUS_LABELS[req.status] || req.status}
                          </span>
                        </div>
                        <p className="profile__request-date">
                          {req.created_at ? new Date(req.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Password Tab */}
            {tab === 'password' && (
              <div className="profile__section">
                <h3 className="profile__section-title"><Lock size={18} /> Change Password</h3>
                <form className="profile__form" onSubmit={handlePasswordChange}>
                  <div className="auth-form__field">
                    <label className="auth-form__label">Current Password</label>
                    <input type="password" className="auth-form__input" value={passwordForm.old}
                      onChange={(e) => setPasswordForm(p => ({ ...p, old: e.target.value }))} maxLength={128} />
                  </div>
                  <div className="auth-form__field">
                    <label className="auth-form__label">New Password</label>
                    <input type="password" className="auth-form__input" value={passwordForm.new}
                      onChange={(e) => setPasswordForm(p => ({ ...p, new: e.target.value }))} maxLength={128} placeholder="Min. 8 characters" />
                  </div>
                  <div className="auth-form__field">
                    <label className="auth-form__label">Confirm New Password</label>
                    <input type="password" className="auth-form__input" value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm(p => ({ ...p, confirm: e.target.value }))} maxLength={128} />
                  </div>
                  {passwordMsg && (
                    <div className={`auth-form__server-error ${passwordStatus === 'success' ? 'auth-form__server-error--success' : ''}`}>
                      {passwordStatus === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      <span>{passwordMsg}</span>
                    </div>
                  )}
                  <button type="submit" className="auth-form__submit" disabled={passwordStatus === 'loading'}>
                    {passwordStatus === 'loading' ? <Loader size={18} className="auth-form__spinner" /> : 'Update Password'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;