import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import apiClient from '../api/client';
import './Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const validate = () => {
    const e = {};
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Must be at least 8 characters';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!token) e.token = 'Invalid or missing reset token. Please request a new link.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setServerError('');
    try {
      await apiClient.post('/api/auth/password-reset/confirm/', {
        token,
        new_password: form.password,
      });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setServerError(
        err.response?.data?.detail || err.response?.data?.message || 'Reset link is invalid or expired. Please request a new one.'
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__icon">
            <ShieldCheck size={24} />
          </div>
          <h1 className="auth-card__title">Reset Password</h1>
          <p className="auth-card__subtitle">Enter your new password below.</p>
        </div>

        {status === 'success' ? (
          <div className="auth-success">
            <CheckCircle size={40} className="auth-success__icon" />
            <h2 className="auth-success__title">Password Reset!</h2>
            <p className="auth-success__text">
              Your password has been updated successfully. You can now sign in with your new password.
            </p>
            <Link to="/login" className="auth-form__submit" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Sign In
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {errors.token && (
              <div className="auth-form__server-error">
                <AlertCircle size={16} />
                <span>{errors.token}</span>
              </div>
            )}

            <div className="auth-form__field">
              <label className="auth-form__label">New Password</label>
              <div className="auth-form__password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`auth-form__input ${errors.password ? 'auth-form__input--error' : ''}`}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  maxLength={128}
                />
                <button
                  type="button"
                  className="auth-form__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="auth-form__error">{errors.password}</span>}
            </div>

            <div className="auth-form__field">
              <label className="auth-form__label">Confirm Password</label>
              <div className="auth-form__password-wrap">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`auth-form__input ${errors.confirmPassword ? 'auth-form__input--error' : ''}`}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  maxLength={128}
                />
                <button
                  type="button"
                  className="auth-form__password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="auth-form__error">{errors.confirmPassword}</span>}
            </div>

            {serverError && (
              <div className="auth-form__server-error">
                <AlertCircle size={16} />
                <span>{serverError}</span>
              </div>
            )}

            <button type="submit" className="auth-form__submit" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader size={18} className="auth-form__spinner" /> : 'Reset Password'}
            </button>
          </form>
        )}

        <p className="auth-card__footer">
          <Link to="/login" className="auth-card__link">Back to Login</Link>
        </p>
      </div>
    </main>
  );
};

export default ResetPassword;
