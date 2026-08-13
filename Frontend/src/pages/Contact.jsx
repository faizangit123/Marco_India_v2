import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send, CheckCircle, AlertCircle, Loader,
  MapPin, Phone, Mail, Clock, ChevronRight,
  Facebook, Instagram, Linkedin, Twitter, Youtube,
} from 'lucide-react';
import apiClient from '../api/client';
import './Contact.css';

const SERVICE_TYPES = [
  'CCTV Installation',
  'Signal Boosting',
  'Telecom Infrastructure',
  'Fiber Optic Cabling',
  'Network Setup',
  'AMC & Maintenance',
  'Other',
];

const Contact = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const e = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name) e.name = 'Name is required';
    else if (name.length > 100) e.name = 'Max 100 characters';

    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';

    if (phone && !/^[+]?[\d\s\-()]{7,15}$/.test(phone)) e.phone = 'Enter a valid phone number';

    if (!form.service) e.service = 'Please select a service';

    if (!message) e.message = 'Message is required';
    else if (message.length > 1000) e.message = 'Max 1000 characters';

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
    setServerMsg('');
    try {
      await apiClient.post('/api/contact/', {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service_type: form.service,
        message: form.message.trim(),
      });
      setStatus('success');
      setServerMsg('Thank you! We will get back to you shortly.');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus('error');
      setServerMsg(err.response?.data?.detail || 'Something went wrong. Please try again.');
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero__title">Get In <span>Touch</span></h1>
          <nav className="contact-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Contact</span>
          </nav>
        </div>
      </section>

      {/* Main */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main__grid">
            {/* Form */}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h2 className="contact-form__title">Send Us a Message</h2>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label className="contact-form__label">Full Name *</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Enter your name" maxLength={100} autoComplete="name"
                    className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                  />
                  {errors.name && <span className="contact-form__error">{errors.name}</span>}
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">Email Address *</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com" maxLength={255} autoComplete="email"
                    className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
                  />
                  {errors.email && <span className="contact-form__error">{errors.email}</span>}
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label className="contact-form__label">Phone Number</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+91 98765 43210" maxLength={15} autoComplete="tel"
                    className={`contact-form__input ${errors.phone ? 'contact-form__input--error' : ''}`}
                  />
                  {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">Service Required *</label>
                  <select
                    name="service" value={form.service} onChange={handleChange}
                    className={`contact-form__input contact-form__select ${errors.service ? 'contact-form__input--error' : ''} ${!form.service ? 'contact-form__select--placeholder' : ''}`}
                  >
                    <option value="" disabled>Select Service</option>
                    {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span className="contact-form__error">{errors.service}</span>}
                </div>
              </div>

              <div className="contact-form__field">
                <label className="contact-form__label">Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell us about your requirements…" maxLength={1000}
                  className={`contact-form__input contact-form__textarea ${errors.message ? 'contact-form__input--error' : ''}`}
                />
                {errors.message && <span className="contact-form__error">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-form__submit" disabled={status === 'loading'}>
                {status === 'loading'
                  ? <Loader size={18} className="contact-form__spinner" />
                  : <><Send size={16} /> Send Message</>}
              </button>

              {status === 'error' && (
                <div className="contact-form__server-msg contact-form__server-msg--error">
                  <AlertCircle size={16} /> <span>{serverMsg}</span>
                </div>
              )}
              {status === 'success' && (
                <div className="contact-form__server-msg contact-form__server-msg--success">
                  <CheckCircle size={16} /> <span>{serverMsg}</span>
                </div>
              )}
            </form>

            {/* Info */}
            <div className="contact-info">
              <div className="contact-info__card">
                <div className="contact-info__icon"><MapPin size={20} /></div>
                <div>
                  <p className="contact-info__label">Our Office</p>
                  <p className="contact-info__value">ROAD no-8, Jawahar Nagar Mango,<br />Jamshedpur, Jharkhand-831012, India</p>
                </div>
              </div>

              <div className="contact-info__card">
                <div className="contact-info__icon"><Phone size={20} /></div>
                <div>
                  <p className="contact-info__label">Call Us</p>
                  <p className="contact-info__value">
                    <a href="tel:+911234567890">+91 8092099110</a><br />
                    <a href="tel:+911234567891">+91 123 456 7891</a>
                  </p>
                </div>
              </div>

              <div className="contact-info__card">
                <div className="contact-info__icon"><Mail size={20} /></div>
                <div>
                  <p className="contact-info__label">Email Us</p>
                  <p className="contact-info__value">
                    <a href="mailto:info@marcoindia.in">marcoindia@gmail.com</a><br />
                    <a href="mailto:support@marcoindia.in">support@marcoindia.in</a>
                  </p>
                </div>
              </div>

              <div className="contact-info__card">
                <div className="contact-info__icon"><Clock size={20} /></div>
                <div>
                  <p className="contact-info__label">Working Hours</p>
                  <p className="contact-info__value">Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: Closed</p>
                </div>
              </div>

              <div className="contact-map">
                <iframe
                  title="Marco India Office Location"
                  src="https://maps.google.com/maps?q=22.8328611,86.2135278&z=17&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Strip */}
      <section className="contact-socials">
        <div className="container">
          <p className="contact-socials__title">Follow Us on Social Media</p>
          <div className="contact-socials__links">
            {[
              { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
              { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              { icon: Linkedin, href: 'https://linkedin.com/company', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="contact-socials__link">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
