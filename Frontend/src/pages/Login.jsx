import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Eye, EyeOff, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
    }
}, [isAuthenticated, navigate, location]);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
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
      await login(form.email.trim(), form.password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setStatus('error');
      setServerError(err.response?.data?.detail || err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setServerError('');
    setStatus('loading');
    try {
      await loginWithGoogle();
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'Google login failed. Please try again.');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <button className="auth-card__back" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="auth-card__header">
          <div className="auth-card__icon">
            <LogIn size={24} />
          </div>
          <h1 className="auth-card__title">Welcome Back</h1>
          <p className="auth-card__subtitle">Sign in to your Marco India account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__field">
            <label className="auth-form__label">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`auth-form__input ${errors.email ? 'auth-form__input--error' : ''}`}
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={255}
            />
            {errors.email && <span className="auth-form__error">{errors.email}</span>}
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Password</label>
            <div className="auth-form__password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`auth-form__input ${errors.password ? 'auth-form__input--error' : ''}`}
                placeholder="Enter your password"
                autoComplete="current-password"
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
            <Link to="/forgot-password" className="auth-form__forgot-link">Forgot password?</Link>
          </div>

          {serverError && (
            <div className="auth-form__server-error">
              <AlertCircle size={16} />
              <span>{serverError}</span>
            </div>
          )}

          <button type="submit" className="auth-form__submit" disabled={status === 'loading'}>
            {status === 'loading' ? <Loader size={18} className="auth-form__spinner" /> : 'Sign In'}
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
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="auth-card__link">Create one</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
