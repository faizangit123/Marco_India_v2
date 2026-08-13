import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import apiClient from '../../api/client';
import './ServiceRequestForm.css';

const SERVICE_TYPES = [
  'CCTV Installation',
  'Signal Boosting',
  'Telecom Infrastructure',
  'Fiber Optic Cabling',
  'Network Setup',
  'AMC & Maintenance',
  'Other',
];

const ServiceRequestForm = ({ preselectedService = '' }) => {
  const [form, setForm] = useState({ name: '', phone: '', service: preselectedService });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const newErrors = {};
    const name = form.name.trim();
    const phone = form.phone.trim();

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length > 100) {
      newErrors.name = 'Name must be under 100 characters';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-()]{7,15}$/.test(phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!form.service) {
      newErrors.service = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerMsg('');

    try {
      await apiClient.post('/api/inquiries/', {
        name: form.name.trim(),
        phone: form.phone.trim(),
        service_type: form.service,
      });
      setStatus('success');
      setServerMsg('Thank you! We will contact you shortly.');
      setForm({ name: '', phone: '', service: '' });
    } catch (err) {
      setStatus('error');
      const msg = err.response?.data?.detail || 'Something went wrong. Please try again.';
      setServerMsg(msg);
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setServerMsg('');
    setErrors({});
  };

  if (status === 'success') {
    return (
      <div className="srf srf--success">
        <CheckCircle size={40} className="srf__success-icon" />
        <p className="srf__success-text">{serverMsg}</p>
        <button className="srf__reset-btn" onClick={resetForm}>Submit Another Request</button>
      </div>
    );
  }

  return (
    <form className="srf" onSubmit={handleSubmit} noValidate>
      <h3 className="srf__heading">Request a Callback</h3>

      <div className="srf__fields">
        <div className="srf__field">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`srf__input ${errors.name ? 'srf__input--error' : ''}`}
            maxLength={100}
            autoComplete="name"
          />
          {errors.name && <span className="srf__error">{errors.name}</span>}
        </div>

        <div className="srf__field">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`srf__input ${errors.phone ? 'srf__input--error' : ''}`}
            maxLength={15}
            autoComplete="tel"
          />
          {errors.phone && <span className="srf__error">{errors.phone}</span>}
        </div>

        <div className="srf__field">
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`srf__input srf__select ${errors.service ? 'srf__input--error' : ''} ${!form.service ? 'srf__select--placeholder' : ''}`}
          >
            <option value="" disabled>Select Service</option>
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && <span className="srf__error">{errors.service}</span>}
        </div>

        <button
          type="submit"
          className="srf__submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <Loader size={18} className="srf__spinner" />
          ) : (
            <>
              <Send size={16} />
              <span>Get Quote</span>
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <div className="srf__server-error">
          <AlertCircle size={16} />
          <span>{serverMsg}</span>
        </div>
      )}
    </form>
  );
};

export default ServiceRequestForm;
