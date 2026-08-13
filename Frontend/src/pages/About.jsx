import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Shield, Target, Eye, Users, MapPin,
  Headphones, Award, CheckCircle, Building2, Wrench,
  Clock, TrendingUp, Heart,
} from 'lucide-react';
import './InnerPage.css';
import './About.css';

const TIMELINE = [
  { year: '2015', title: 'Company Founded', desc: 'Marco India was established in Noida with a vision to deliver reliable security and telecom infrastructure across India.' },
  { year: '2017', title: 'Expanded to 10 Cities', desc: 'Scaled operations to serve clients in Delhi NCR, Mumbai, Bangalore, Hyderabad, and other key metros.' },
  { year: '2019', title: '200+ Projects Milestone', desc: 'Crossed 200 successful project completions including major enterprise and government contracts.' },
  { year: '2021', title: 'Telecom Division Launch', desc: 'Launched dedicated telecom infrastructure division for tower installations and fiber optic cabling.' },
  { year: '2023', title: '500+ Projects & Growing', desc: 'Surpassed 500 completed projects with a growing team of 80+ trained professionals across India.' },
];

const VALUES = [
  { icon: CheckCircle, title: 'Quality First', desc: 'Every installation uses certified equipment from trusted brands. We never compromise on component quality or workmanship standards.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We commit to project timelines and deliver on schedule. Our structured project management ensures zero delays.' },
  { icon: Heart, title: 'Customer Commitment', desc: 'Post-installation support is not an afterthought. We provide dedicated AMC plans and 24/7 emergency assistance.' },
  { icon: TrendingUp, title: 'Continuous Innovation', desc: 'We stay current with the latest surveillance, networking, and telecom technologies to offer future-ready solutions.' },
];

const LEADERSHIP = [
  { name: 'Managing Director', role: 'Founder & MD', desc: 'Over 15 years of experience in telecom and security infrastructure. Leads company strategy and business development.' },
  { name: 'Technical Director', role: 'CTO', desc: 'Heads the engineering team with deep expertise in IP surveillance, fiber optics, and enterprise networking.' },
  { name: 'Operations Head', role: 'COO', desc: 'Manages nationwide project delivery, vendor relationships, and quality assurance across all divisions.' },
];

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">About <span>Marco India</span></h1>
          <nav className="page-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>About Us</span>
          </nav>
        </div>
      </section>

      {/* Company Overview */}
      <section className="inner-section">
        <div className="container">
          <div className="about-page__overview">
            <div className="about-page__overview-content">
              <span className="inner-section__badge">Who We Are</span>
              <h2 className="inner-section__title">Building India's Security & <span>Connectivity Infrastructure</span></h2>
              <p className="about-page__overview-text">
                Marco India is a professionally managed infrastructure services company headquartered in Noida, Uttar Pradesh. Since 2015, we have been delivering end-to-end solutions in CCTV surveillance, mobile signal boosting, telecom tower installations, fiber optic cabling, and enterprise networking.
              </p>
              <p className="about-page__overview-text">
                We work with residential societies, commercial complexes, industrial facilities, government bodies, and telecom operators — providing reliable, scalable infrastructure that our clients depend on every day.
              </p>
              <p className="about-page__overview-text">
                With a team of 80+ trained professionals, operations spanning 50+ cities, and 500+ successfully completed projects, Marco India has earned its reputation as a trusted partner for security and connectivity infrastructure across the country.
              </p>
            </div>
            <div className="about-page__overview-stats">
              <div className="about-page__stat">
                <div className="about-page__stat-icon"><Building2 size={24} /></div>
                <strong>500+</strong>
                <span>Projects Completed</span>
              </div>
              <div className="about-page__stat">
                <div className="about-page__stat-icon"><MapPin size={24} /></div>
                <strong>50+</strong>
                <span>Cities Served</span>
              </div>
              <div className="about-page__stat">
                <div className="about-page__stat-icon"><Users size={24} /></div>
                <strong>80+</strong>
                <span>Team Members</span>
              </div>
              <div className="about-page__stat">
                <div className="about-page__stat-icon"><Award size={24} /></div>
                <strong>8+</strong>
                <span>Years in Business</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Approach, Vision */}
      <section className="inner-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Our Foundation</span>
            <h2 className="inner-section__title">What <span>Drives Us</span></h2>
          </div>
          <div className="about-page__pillars">
            <div className="info-card">
              <div className="info-card__icon"><Shield size={24} /></div>
              <h3 className="info-card__title">Our Mission</h3>
              <p className="info-card__text">To provide world-class CCTV surveillance, signal boosting, and telecom infrastructure solutions that empower businesses and communities across India with reliable security and connectivity.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon"><Target size={24} /></div>
              <h3 className="info-card__title">Our Approach</h3>
              <p className="info-card__text">We combine cutting-edge technology with hands-on field expertise. Every project begins with a thorough site survey, followed by a customized design, professional installation, and comprehensive post-deployment support.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon"><Eye size={24} /></div>
              <h3 className="info-card__title">Our Vision</h3>
              <p className="info-card__text">To become India's most trusted name in security and connectivity infrastructure — setting new benchmarks for quality, reliability, and customer service excellence in every project we undertake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="inner-section">
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Our Journey</span>
            <h2 className="inner-section__title">Key <span>Milestones</span></h2>
          </div>
          <div className="about-page__timeline">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="about-page__timeline-item">
                <div className="about-page__timeline-marker">
                  <span className="about-page__timeline-year">{item.year}</span>
                  <span className="about-page__timeline-dot" />
                </div>
                <div className="about-page__timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="inner-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Our Values</span>
            <h2 className="inner-section__title">What We <span>Stand For</span></h2>
          </div>
          <div className="about-page__values">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="info-card">
                  <div className="info-card__icon"><Icon size={24} /></div>
                  <h3 className="info-card__title">{v.title}</h3>
                  <p className="info-card__text">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="inner-section">
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Leadership</span>
            <h2 className="inner-section__title">Our <span>Team</span></h2>
            <p className="inner-section__subtitle">
              Led by experienced professionals with deep domain expertise in telecom, security infrastructure, and enterprise solutions.
            </p>
          </div>
          <div className="about-page__leaders">
            {LEADERSHIP.map((l) => (
              <div key={l.role} className="about-page__leader">
                <div className="about-page__leader-avatar">
                  <Wrench size={28} />
                </div>
                <h3 className="about-page__leader-name">{l.name}</h3>
                <span className="about-page__leader-role">{l.role}</span>
                <p className="about-page__leader-desc">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="inner-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Why Marco India</span>
            <h2 className="inner-section__title">Why Clients <span>Trust Us</span></h2>
          </div>
          <div className="about-page__why">
            {[
              'Certified and trained installation teams with field experience',
              'Use of only OEM-certified equipment from leading brands',
              'End-to-end project management from survey to handover',
              'Transparent pricing with no hidden costs',
              'Dedicated post-installation support and AMC contracts',
              'Pan-India operations with local execution teams',
              'Customized solutions based on site survey and client requirements',
              'Track record of on-time project delivery',
            ].map((item) => (
              <div key={item} className="about-page__why-item">
                <CheckCircle size={18} className="about-page__why-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
