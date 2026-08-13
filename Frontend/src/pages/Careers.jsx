import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, MapPin, Briefcase, Clock,
  CheckCircle, ArrowRight, Users, Heart,
  TrendingUp, Zap, Send,
} from 'lucide-react';
import './InnerPage.css';
import './Careers.css';

const OPEN_POSITIONS = [
  {
    title: 'CCTV Installation Technician',
    department: 'Field Operations',
    location: 'Delhi NCR',
    type: 'Full-time',
    experience: '2-4 years',
    responsibilities: [
      'Install and configure IP/analog CCTV systems at client sites',
      'Perform cable routing, camera mounting, and DVR/NVR setup',
      'Conduct system testing and client handover',
      'Provide on-site troubleshooting and maintenance support',
    ],
    requirements: [
      'ITI/Diploma in Electronics or related field',
      'Hands-on experience with IP cameras, DVR/NVR systems',
      'Knowledge of networking basics (IP addressing, PoE)',
      'Valid driving license and willingness to travel',
    ],
  },
  {
    title: 'Telecom RF Engineer',
    department: 'Telecom Division',
    location: 'Mumbai / Bangalore',
    type: 'Full-time',
    experience: '3-5 years',
    responsibilities: [
      'Conduct RF site surveys and coverage planning',
      'Design and optimize in-building DAS solutions',
      'Install and commission signal boosters and repeaters',
      'Prepare technical documentation and reports',
    ],
    requirements: [
      'B.Tech/B.E. in Electronics & Communications or equivalent',
      'Experience with RF planning tools and signal analyzers',
      'Knowledge of 4G LTE/5G NR technologies',
      'Strong analytical and problem-solving skills',
    ],
  },
  {
    title: 'Project Manager - Infrastructure',
    department: 'Project Management',
    location: 'Noida (HQ)',
    type: 'Full-time',
    experience: '5-8 years',
    responsibilities: [
      'Manage end-to-end project delivery for telecom and security projects',
      'Coordinate with clients, vendors, and field teams',
      'Track project milestones, budgets, and timelines',
      'Ensure quality standards and safety compliance on all projects',
    ],
    requirements: [
      'B.Tech/MBA with project management experience',
      'PMP certification preferred',
      'Experience managing infrastructure or telecom projects',
      'Strong leadership and client communication skills',
    ],
  },
  {
    title: 'Network Engineer',
    department: 'IT & Networking',
    location: 'Delhi NCR',
    type: 'Full-time',
    experience: '2-4 years',
    responsibilities: [
      'Design and deploy enterprise LAN/WAN networks',
      'Install structured cabling and network equipment',
      'Configure switches, routers, firewalls, and access points',
      'Provide ongoing network monitoring and troubleshooting',
    ],
    requirements: [
      'B.Tech in Computer Science, IT, or related field',
      'CCNA or equivalent certification',
      'Hands-on experience with Cisco, HP, or Juniper equipment',
      'Knowledge of VLANs, VPN, DHCP, DNS, and firewall configuration',
    ],
  },
];

const BENEFITS = [
  { icon: TrendingUp, title: 'Career Growth', desc: 'Clear promotion pathways and skill development opportunities for every team member.' },
  { icon: Heart, title: 'Health Benefits', desc: 'Comprehensive health insurance coverage for employees and their families.' },
  { icon: Users, title: 'Team Culture', desc: 'A collaborative, respectful work environment where every contribution is valued.' },
  { icon: Zap, title: 'Hands-on Learning', desc: 'Work with the latest technology across real-world projects from day one.' },
];

const Careers = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Join <span>Our Team</span></h1>
          <nav className="page-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Careers</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="inner-section">
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Careers at Marco India</span>
            <h2 className="inner-section__title">Build Your Career in <span>Infrastructure & Technology</span></h2>
            <p className="inner-section__subtitle">
              We are always looking for skilled, driven professionals to join our growing team. If you are passionate about security, telecom, and networking technology, we want to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="inner-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Why Marco India</span>
            <h2 className="inner-section__title">What We <span>Offer</span></h2>
          </div>
          <div className="careers-page__benefits">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="info-card">
                  <div className="info-card__icon"><Icon size={24} /></div>
                  <h3 className="info-card__title">{b.title}</h3>
                  <p className="info-card__text">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="inner-section">
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Open Positions</span>
            <h2 className="inner-section__title">Current <span>Openings</span></h2>
            <p className="inner-section__subtitle">
              Explore our open roles below. If you find a position that matches your skills, reach out to us with your resume.
            </p>
          </div>

          <div className="careers-page__positions">
            {OPEN_POSITIONS.map((pos) => (
              <details key={pos.title} className="careers-page__position">
                <summary className="careers-page__position-header">
                  <div className="careers-page__position-info">
                    <h3 className="careers-page__position-title">{pos.title}</h3>
                    <div className="careers-page__position-meta">
                      <span><Briefcase size={14} /> {pos.department}</span>
                      <span><MapPin size={14} /> {pos.location}</span>
                      <span><Clock size={14} /> {pos.type}</span>
                      <span><TrendingUp size={14} /> {pos.experience}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="careers-page__position-arrow" />
                </summary>
                <div className="careers-page__position-body">
                  <div className="careers-page__position-col">
                    <h4>Responsibilities</h4>
                    <ul>
                      {pos.responsibilities.map((r) => (
                        <li key={r}><CheckCircle size={14} /> {r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="careers-page__position-col">
                    <h4>Requirements</h4>
                    <ul>
                      {pos.requirements.map((r) => (
                        <li key={r}><CheckCircle size={14} /> {r}</li>
                      ))}
                    </ul>
                  </div>
                  <a href="mailto:marcoindia@gmail.com" className="careers-page__apply">
                    <Send size={16} /> Apply for this Position
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="inner-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="careers-page__general">
            <h2>Don't see a role that fits?</h2>
            <p>
              We are always open to hearing from talented professionals. Send your resume to{' '}
              <a href="mailto:marcoindia@gmail.com">marcoindia@gmail.com</a>{' '}
              and our HR team will reach out if there is a match.
            </p>
            <a href="mailto:marcoindia@gmail.com" className="careers-page__general-cta">
              Send Your Resume <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
