import { useState, useEffect, useRef } from 'react';
import { Shield, Target, Eye, Users, MapPin, Headphones, Award } from 'lucide-react';
import './AboutSection.css';

const STATS = [
  { icon: Users, value: 500, suffix: '+', label: 'Projects Delivered' },
  { icon: MapPin, value: 50, suffix: '+', label: 'Cities Covered' },
  { icon: Headphones, value: 24, suffix: '/7', label: 'Support Available' },
  { icon: Award, value: 8, suffix: '+', label: 'Years Experience' },
];

const PILLARS = [
  {
    icon: Shield,
    title: 'Our Mission',
    text: 'To provide world-class CCTV surveillance, signal boosting, and telecom infrastructure solutions that empower businesses and communities across India.',
  },
  {
    icon: Target,
    title: 'Our Approach',
    text: 'We combine cutting-edge technology with hands-on expertise — delivering tailor-made installations that are engineered for reliability and built for scale.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To become India\'s most trusted name in security and connectivity infrastructure, setting new benchmarks for quality and service excellence.',
  },
];

/* ---- Animated Counter Hook ---- */
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let raf;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
};

const StatCard = ({ stat, isVisible, index }) => {
  const Icon = stat.icon;
  const count = useCounter(stat.value, 2200, isVisible);

  return (
    <div
      className={`about-stat ${isVisible ? 'about-stat--visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="about-stat__icon">
        <Icon size={24} />
      </div>
      <span className="about-stat__value">
        {count}
        {stat.suffix}
      </span>
      <span className="about-stat__label">{stat.label}</span>
    </div>
  );
};

const AboutSection = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about section" ref={sectionRef} id="about">
      <div className="container">
        {/* Header */}
        <div className={`about__header ${isVisible ? 'about__header--visible' : ''}`}>
          <span className="about__badge">Who We Are</span>
          <h2 className="about__title">
            Building Trust Through <span className="about__title-accent">Excellence</span>
          </h2>
          <p className="about__subtitle">
            Since 2015, Marco India has been at the forefront of security and connectivity
            infrastructure — delivering end-to-end solutions that businesses rely on every day.
          </p>
        </div>

        {/* Pillars */}
        <div className="about__pillars">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`about__pillar ${isVisible ? 'about__pillar--visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="about__pillar-icon">
                  <Icon size={24} />
                </div>
                <h3 className="about__pillar-title">{pillar.title}</h3>
                <p className="about__pillar-text">{pillar.text}</p>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className={`about__stats ${isVisible ? 'about__stats--visible' : ''}`}>
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
