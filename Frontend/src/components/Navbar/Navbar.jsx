import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Phone, User, LogOut, Shield, ChevronDown,
  Camera, Signal, Radio, Cable, Network, Wrench,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const SERVICE_ITEMS = [
  { icon: Camera, label: 'CCTV Installation', path: '/services/cctv-installation' },
  { icon: Signal, label: 'Signal Boosting', path: '/services/signal-boosting' },
  { icon: Radio, label: 'Telecom Infrastructure', path: '/services/telecom-infrastructure' },
  { icon: Cable, label: 'Fiber Optic Cabling', path: '/services/fiber-optic-cabling' },
  { icon: Network, label: 'Network Setup', path: '/services/network-setup' },
  { icon: Wrench, label: 'AMC & Maintenance', path: '/services/amc-maintenance' },
];

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">
        <Link to="/" className="navbar__logo">
          {/* <span className="navbar__logo-mark"></span> */}
          <img src="/favicon.png" alt="Marco India" className="navbar__logo-img" />
          <span className="navbar__logo-text">Marco India</span>
        </Link>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <li key={link.path} className="navbar__dropdown-wrap" ref={dropdownRef}>
                <button
                  className={`navbar__link navbar__link--dropdown ${isServicesActive ? 'navbar__link--active' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown size={14} className={`navbar__chevron ${dropdownOpen ? 'navbar__chevron--open' : ''}`} />
                </button>

                <div
                  className={`navbar__dropdown ${dropdownOpen ? 'navbar__dropdown--open' : ''}`}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="navbar__dropdown-header">
                    <Link to="/services" className="navbar__dropdown-view-all">
                      All Services →
                    </Link>
                  </div>
                  <div className="navbar__dropdown-grid">
                    {SERVICE_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`navbar__dropdown-item ${location.pathname === item.path ? 'navbar__dropdown-item--active' : ''}`}
                        >
                          <div className="navbar__dropdown-icon"><Icon size={18} /></div>
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>
            ) : (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="navbar__actions">
          <a href="tel:+918092099110" className="navbar__phone" aria-label="Call us">
            <Phone size={18} />
            <span className="navbar__phone-text">Call Us</span>
          </a>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="navbar__link navbar__link--admin">
                  <Shield size={16} /> Admin
                </Link>
              )}
              <Link to="/profile" className="navbar__user-btn" title={user?.name || 'Profile'}>
                <User size={18} />
              </Link>
              <button className="navbar__logout-btn" onClick={logout} title="Sign out">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link">Login</Link>
              <Link to="/contact" className="navbar__cta">Get a Quote</Link>
            </>
          )}
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`navbar__overlay ${mobileOpen ? 'navbar__overlay--open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <li key={link.path}>
                <button
                  className={`navbar__mobile-link navbar__mobile-link--dropdown ${isServicesActive ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  {link.label}
                  <ChevronDown size={16} className={`navbar__chevron ${mobileServicesOpen ? 'navbar__chevron--open' : ''}`} />
                </button>
                <div className={`navbar__mobile-sub ${mobileServicesOpen ? 'navbar__mobile-sub--open' : ''}`}>
                  <Link to="/services" className="navbar__mobile-sub-link navbar__mobile-sub-link--all">
                    All Services
                  </Link>
                  {SERVICE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} to={item.path} className="navbar__mobile-sub-link">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </li>
            ) : (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
        <div className="navbar__mobile-actions">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="navbar__mobile-link">
                  <Shield size={16} /> Admin Panel
                </Link>
              )}
              <Link to="/profile" className="navbar__mobile-link">
                <User size={16} /> My Profile
              </Link>
              <button className="navbar__mobile-phone" onClick={logout}>
                <LogOut size={18} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__mobile-link">Login</Link>
              <Link to="/signup" className="navbar__mobile-link">Sign Up</Link>
            </>
          )}
          <a href="tel:+918092099110" className="navbar__mobile-phone">
            <Phone size={18} /> Call Us
          </a>
          <Link to="/contact" className="navbar__mobile-cta">Get a Quote</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
