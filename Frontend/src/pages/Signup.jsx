import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, AlertCircle, Loader, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Signup = () => {
  const { signup, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length > 100) e.name = 'Name must be under 100 characters';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[+]?[\d\s\-()]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setServerError('');
    try {
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        password_confirm: form.confirmPassword,
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      const data = err.response?.data;
      if (typeof data === 'object' && !data.detail) {
        const msgs = Object.values(data).flat().join(' ');
        setServerError(msgs || 'Registration failed. Please try again.');
      } else {
        setServerError(data?.detail || data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setServerError('');
    setStatus('loading');
    try {
      await loginWithGoogle();
      navigate('/', { replace: true });
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'Google login failed. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <main className="auth-page">
        <div className="auth-card auth-card--success">
          <CheckCircle size={48} className="auth-card__success-icon" />
          <h2 className="auth-card__title">Account Created!</h2>
          <p className="auth-card__subtitle">Your account has been created successfully.</p>
          <button className="auth-form__submit" onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <button className="auth-card__back" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="auth-card__header">
          <div className="auth-card__icon">
            <UserPlus size={24} />
          </div>
          <h1 className="auth-card__title">Create Account</h1>
          <p className="auth-card__subtitle">Join Marco India to track your service requests</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__field">
            <label className="auth-form__label">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className={`auth-form__input ${errors.name ? 'auth-form__input--error' : ''}`}
              placeholder="Your full name" autoComplete="name" maxLength={100} />
            {errors.name && <span className="auth-form__error">{errors.name}</span>}
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className={`auth-form__input ${errors.email ? 'auth-form__input--error' : ''}`}
              placeholder="you@example.com" autoComplete="email" maxLength={255} />
            {errors.email && <span className="auth-form__error">{errors.email}</span>}
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              className={`auth-form__input ${errors.phone ? 'auth-form__input--error' : ''}`}
              placeholder="+91 XXXXX XXXXX" autoComplete="tel" maxLength={15} />
            {errors.phone && <span className="auth-form__error">{errors.phone}</span>}
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Password</label>
            <div className="auth-form__password-wrap">
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                className={`auth-form__input ${errors.password ? 'auth-form__input--error' : ''}`}
                placeholder="Min. 8 characters" autoComplete="new-password" maxLength={128} />
              <button type="button" className="auth-form__password-toggle" onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="auth-form__error">{errors.password}</span>}
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
              className={`auth-form__input ${errors.confirmPassword ? 'auth-form__input--error' : ''}`}
              placeholder="Re-enter password" autoComplete="new-password" maxLength={128} />
            {errors.confirmPassword && <span className="auth-form__error">{errors.confirmPassword}</span>}
          </div>

          {serverError && (
            <div className="auth-form__server-error">
              <AlertCircle size={16} />
              <span>{serverError}</span>
            </div>
          )}

          <button type="submit" className="auth-form__submit" disabled={status === 'loading'}>
            {status === 'loading' ? <Loader size={18} className="auth-form__spinner" /> : 'Create Account'}
          </button>

          <div className="auth-form__divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="auth-form__google-btn"
            onClick={handleGoogleLogin}
            disabled={status === 'loading'}
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.04 24.04 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>
        </form>

        <p className="auth-card__footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-card__link">Sign in</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
