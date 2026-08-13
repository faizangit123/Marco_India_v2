import { useState, useEffect, useRef } from 'react';
import { Camera, Signal, Radio, Server, ArrowRight } from 'lucide-react';
import './ServicesSection.css';

const SERVICES = [
  {
    icon: Camera,
    title: 'CCTV Surveillance',
    slug: 'cctv-installation',
    description:
      'End-to-end CCTV installation for homes, offices, warehouses, and industrial sites. IP cameras, DVR/NVR setup, and remote monitoring.',
    features: ['IP & Analog Cameras', 'Remote Monitoring', 'Night Vision Systems'],
  },
  {
    icon: Signal,
    title: 'Signal Boosting',
    slug: 'signal-boosting',
    description:
      'Amplify mobile network coverage in dead zones. Enterprise-grade signal boosters for 4G/5G across commercial and residential properties.',
    features: ['4G / 5G Boosters', 'Dead Zone Elimination', 'Multi-Carrier Support'],
  },
  {
    icon: Radio,
    title: 'Telecom Infrastructure',
    slug: 'telecom-infrastructure',
    description:
      'Tower installation, fiber optic cabling, and telecom network rollouts for operators and enterprises across India.',
    features: ['Tower Installation', 'Fiber Optic Cabling', 'Network Rollouts'],
  },
  {
    icon: Server,
    title: 'IT & Networking',
    slug: 'network-setup',
    description:
      'Structured cabling, server room setup, and enterprise networking solutions engineered for performance and scalability.',
    features: ['Structured Cabling', 'Server Room Setup', 'Enterprise Wi-Fi'],
  },
];

const ServiceCard = ({ service, index, isVisible }) => {
  const Icon = service.icon;

  return (
    <div
      className={`service-card ${isVisible ? 'service-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="service-card__icon-wrap">
        <Icon size={28} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <ul className="service-card__features">
        {service.features.map((f) => (
          <li key={f} className="service-card__feature">
            <span className="service-card__feature-dot" />
            {f}
          </li>
        ))}
      </ul>
      <a href={`/services/${service.slug}`} className="service-card__link">
        Learn More <ArrowRight size={16} />
      </a>
    </div>
  );
};

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services section" ref={sectionRef} id="services">
      <div className="container">
        <div className={`services__header ${isVisible ? 'services__header--visible' : ''}`}>
          <span className="services__badge">What We Do</span>
          <h2 className="services__title">
            Comprehensive <span className="services__title-accent">Solutions</span>
          </h2>
          <p className="services__subtitle">
            From surveillance systems to telecom networks — we deliver reliable infrastructure
            tailored to your needs.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
