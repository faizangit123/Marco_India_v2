import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import apiClient from '../api/client';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const validate = () => {
    if (!email.trim()) { setError('Email is required'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Enter a valid email'); return false; }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setServerError('');
    try {
      await apiClient.post('/api/auth/password-reset/', { email: email.trim() });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setServerError(
        err.response?.data?.detail || err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__icon">
            <KeyRound size={24} />
          </div>
          <h1 className="auth-card__title">Forgot Password</h1>
          <p className="auth-card__subtitle">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {status === 'success' ? (
          <div className="auth-success">
            <CheckCircle size={40} className="auth-success__icon" />
            <h2 className="auth-success__title">Check Your Email</h2>
            <p className="auth-success__text">
              If an account exists for <strong>{email}</strong>, you&apos;ll receive a password reset link shortly.
            </p>
            <Link to="/login" className="auth-form__submit" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-form__field">
              <label className="auth-form__label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                className={`auth-form__input ${error ? 'auth-form__input--error' : ''}`}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={255}
              />
              {error && <span className="auth-form__error">{error}</span>}
            </div>

            {serverError && (
              <div className="auth-form__server-error">
                <AlertCircle size={16} />
                <span>{serverError}</span>
              </div>
            )}

            <button type="submit" className="auth-form__submit" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader size={18} className="auth-form__spinner" /> : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p className="auth-card__footer">
          <Link to="/login" className="auth-card__link">
            <ArrowLeft size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;
