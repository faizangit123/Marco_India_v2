import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ServiceRequestForm from '../ServiceRequestForm/ServiceRequestForm';
import './HeroSection.css';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToNext = () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const nextSection = hero.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero">
      {/* Video Background */}
      <div className="hero__video-wrap">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="">
          
          {/* Video source will come from Django API / admin upload */}
        </video>
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className={`hero__content container ${loaded ? 'hero__content--visible' : ''}`}>
        <span className="hero__badge my-[20px]">Trusted Across India</span>
        <h1 className="hero__title">
          Securing India,<br />
          <span className="hero__title-accent">One Installation at a Time</span>
        </h1>
        <p className="hero__subtitle">
          Professional CCTV surveillance, signal boosting, and telecom infrastructure
          installation — engineered for reliability, built for scale.
        </p>
        <div className="hero__actions">
          <a href="/contact" className="hero__cta hero__cta--primary">Get a Free Quote</a>
          <a href="/services" className="hero__cta hero__cta--secondary">Our Services</a>
        </div>

        <ServiceRequestForm />

        <div className="hero__trust">
          <div className="hero__trust-item">
            <strong>500+</strong>
            <span>Projects Delivered</span>
          </div>
          <div className="hero__trust-divider" />
          <div className="hero__trust-item">
            <strong>50+</strong>
            <span>Cities Covered</span>
          </div>
          <div className="hero__trust-divider" />
          <div className="hero__trust-item">
            <strong>24/7</strong>
            <span>Support Available</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button className="hero__scroll" onClick={scrollToNext} aria-label="Scroll to next section">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-icon">
          <ChevronDown size={20} />
        </span>
      </button>
    </section>);

};

export default HeroSection;