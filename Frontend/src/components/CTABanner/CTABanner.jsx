import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CTABanner.css';

const CTABanner = () => (
  <section className="cta-banner">
    <div className="container">
      <div className="cta-banner__inner">
        <div className="cta-banner__orb" />

        <div className="cta-banner__content">
          <span className="cta-banner__tag">
            <Shield size={13} />
            Limited Time Offer
          </span>
          <h2 className="cta-banner__title">
            Ready to <span>Secure Your Space</span>?
          </h2>
          <p className="cta-banner__desc">
            Get a free site survey and customized quote for CCTV, signal boosting, or telecom 
            infrastructure — no obligations, just expert advice.
          </p>
        </div>

        <div className="cta-banner__actions">
          <Link to="/contact" className="cta-banner__btn">
            Get a Free Quote
            <ArrowRight size={18} className="cta-banner__btn-icon" />
          </Link>
          <span className="cta-banner__note">
            <CheckCircle size={14} />
            Free consultation · No hidden charges
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default CTABanner;
