import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ChevronDown, Loader, Clock, CheckCircle,
  Camera, Signal, Radio, Cable, Network, Wrench, ArrowRight, Phone,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/client';
import ServiceRequestForm from '../../components/ServiceRequestForm/ServiceRequestForm';
import CommentSection from '../../components/CommentSection/CommentSection';
import ReviewSection from '../../components/ReviewSection/ReviewSection';
import '../InnerPage.css';
import './ServicePage.css';

const STATUS_LABELS = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  in_progress: 'In Progress',
  completed: 'Completed',
};

const STATUS_CLASSES = {
  submitted: 'status--submitted',
  under_review: 'status--review',
  in_progress: 'status--progress',
  completed: 'status--completed',
};

const ALL_SERVICES = [
  { slug: 'cctv-installation', title: 'CCTV Installation', icon: Camera },
  { slug: 'signal-boosting', title: 'Signal Boosting', icon: Signal },
  { slug: 'telecom-infrastructure', title: 'Telecom Infrastructure', icon: Radio },
  { slug: 'fiber-optic-cabling', title: 'Fiber Optic Cabling', icon: Cable },
  { slug: 'network-setup', title: 'Network Setup', icon: Network },
  { slug: 'amc-maintenance', title: 'AMC & Maintenance', icon: Wrench },
];

/* ── Animated Counter ── */
const AnimatedCounter = ({ end, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div className="sp-stat" ref={ref}>
      <span className="sp-stat__number">{count}{suffix}</span>
      <span className="sp-stat__label">{label}</span>
    </div>
  );
};

/* ── FAQ Item ── */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`sp-faq__item ${open ? 'sp-faq__item--open' : ''}`}>
      <button className="sp-faq__trigger" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <ChevronDown size={18} className="sp-faq__chevron" />
      </button>
      <div className="sp-faq__content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const ServicePageLayout = ({
  slug, title, subtitle, description, features, applications, icon: Icon,
  stats = [], process = [], faqs = [],
}) => {
  const { isAuthenticated } = useAuth();
  const [requests, setRequests] = useState([]);
  const [reqLoading, setReqLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchRequests = async () => {
      setReqLoading(true);
      try {
        const { data } = await apiClient.get(`/api/inquiries/?service_type=${encodeURIComponent(title)}`);
        setRequests(Array.isArray(data) ? data : data.results || []);
      } catch { /* silent */ } finally { setReqLoading(false); }
    };
    fetchRequests();
  }, [isAuthenticated, title]);

  const relatedServices = ALL_SERVICES.filter(s => s.slug !== slug);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="sp-hero">
        <div className="sp-hero__bg" />
        <div className="container sp-hero__inner">
          {Icon && <div className="sp-hero__icon"><Icon size={36} /></div>}
          <h1 className="sp-hero__title">{title}</h1>
          <p className="sp-hero__subtitle">{subtitle}</p>
          <div className="sp-hero__actions">
            <button className="sp-hero__cta" onClick={scrollToForm}>Get a Free Quote</button>
            <Link to="/contact" className="sp-hero__cta sp-hero__cta--outline">
              <Phone size={16} /> Contact Us
            </Link>
          </div>
          <nav className="sp-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/services">Services</Link>
            <ChevronRight size={14} />
            <span>{title}</span>
          </nav>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      {stats.length > 0 && (
        <section className="sp-stats">
          <div className="container sp-stats__grid">
            {stats.map((s, i) => (
              <AnimatedCounter key={i} end={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>
      )}

      {/* ── Main Content ── */}
      <section className="inner-section">
        <div className="container">
          <div className="sp__grid">
            <div className="sp__main">
              {/* Description */}
              <div className="sp__intro">
                <div className="sp__description">{description}</div>
              </div>

              {/* Features as expandable cards */}
              {features && features.length > 0 && (
                <div className="sp__block">
                  <h2 className="sp__block-title">Key Capabilities</h2>
                  <ul className="sp__features">
                    {features.map((f, i) => (
                      <li key={i} className="sp__feature">
                        <CheckCircle size={16} className="sp__feature-icon" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {applications && applications.length > 0 && (
                <div className="sp__block">
                  <h2 className="sp__block-title">Applications</h2>
                  <div className="sp__applications">
                    {applications.map((a, i) => (
                      <span key={i} className="sp__app-tag">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Process Timeline ── */}
              {process.length > 0 && (
                <div className="sp__block">
                  <h2 className="sp__block-title">How It Works</h2>
                  <div className="sp-process">
                    {process.map((step, i) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={i} className="sp-process__step">
                          <div className="sp-process__marker">
                            <span className="sp-process__num">{String(i + 1).padStart(2, '0')}</span>
                            {i < process.length - 1 && <div className="sp-process__line" />}
                          </div>
                          <div className="sp-process__content">
                            <div className="sp-process__icon">{StepIcon && <StepIcon size={20} />}</div>
                            <h3 className="sp-process__title">{step.title}</h3>
                            <p className="sp-process__desc">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── FAQ Accordion ── */}
              {faqs.length > 0 && (
                <div className="sp__block">
                  <h2 className="sp__block-title">Frequently Asked Questions</h2>
                  <div className="sp-faq">
                    {faqs.map((faq, i) => (
                      <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── User Requests ── */}
              {isAuthenticated && (
                <div className="sp__block">
                  <h2 className="sp__block-title">Your Requests</h2>
                  {reqLoading ? (
                    <div className="sp__loading"><Loader size={16} className="auth-form__spinner" /> Loading...</div>
                  ) : requests.length === 0 ? (
                    <div className="sp__empty"><Clock size={20} /><p>No requests for this service yet.</p></div>
                  ) : (
                    <div className="sp__requests">
                      {requests.map((r) => (
                        <div key={r.id} className="sp__request-card">
                          <strong>{r.service_type}</strong>
                          <span className={`profile__status ${STATUS_CLASSES[r.status] || ''}`}>
                            {STATUS_LABELS[r.status] || r.status}
                          </span>
                          <span className="sp__request-date">
                            {r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Reviews ── */}
              <ReviewSection serviceSlug={slug} serviceTitle={title} />

              {/* ── CTA Banner ── */}
              <div className="sp-cta-banner">
                <div className="sp-cta-banner__content">
                  <h3>Ready to Get Started?</h3>
                  <p>Get a free site survey and customized quotation for your project.</p>
                </div>
                <div className="sp-cta-banner__actions">
                  <button className="sp-hero__cta" onClick={scrollToForm}>Request a Quote</button>
                  <a href="tel:+919876543210" className="sp-cta-banner__phone">
                    <Phone size={16} /> +91 98765 43210
                  </a>
                </div>
              </div>

              <CommentSection pageSlug={slug} />
            </div>

            {/* ── Sidebar ── */}
            <aside className="sp__sidebar" ref={formRef}>
              <ServiceRequestForm preselectedService={title} />

              {/* Related Services */}
              <div className="sp-related">
                <h3 className="sp-related__title">Other Services</h3>
                <div className="sp-related__list">
                  {relatedServices.map((s) => {
                    const SIcon = s.icon;
                    return (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="sp-related__card">
                        <SIcon size={18} />
                        <span>{s.title}</span>
                        <ArrowRight size={14} className="sp-related__arrow" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicePageLayout;
