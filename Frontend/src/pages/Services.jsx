import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Camera, Signal, Radio, Server,
  Wifi, Wrench, CheckCircle, ArrowRight,
  Shield, Zap, Settings, Monitor,
} from 'lucide-react';
import './InnerPage.css';
import './Services.css';

const SERVICES = [
  {
    icon: Camera,
    title: 'CCTV installation Systems',
    slug: 'cctv-installation',
    desc: 'Comprehensive CCTV installation for commercial, industrial, and residential properties. We design, install, and maintain high-definition surveillance systems using IP cameras, DVR/NVR systems, PTZ cameras, and cloud-enabled remote monitoring solutions.',
    features: [
      'HD and 4K IP camera installations',
      'DVR/NVR setup with storage planning',
      'PTZ and dome cameras for large areas',
      'Night vision and infrared systems',
      'Mobile app-based remote monitoring',
      'Integration with access control systems',
      'Video analytics and motion detection',
      'Maintenance and AMC support',
    ],
    applications: ['Corporate Offices', 'Warehouses', 'Retail Stores', 'Residential Societies', 'Hospitals', 'Educational Institutions'],
  },
  {
    icon: Signal,
    title: 'Mobile Signal Boosting',
    slug: 'signal-boosting',
    desc: 'Enterprise-grade mobile signal boosting solutions for areas with poor cellular coverage. We install OFCOM/WPC-compliant signal repeaters and DAS (Distributed Antenna Systems) to ensure seamless 4G/5G connectivity in dead zones.',
    features: [
      '4G LTE and 5G signal amplification',
      'Multi-operator and multi-band support',
      'Distributed Antenna Systems (DAS)',
      'In-building coverage solutions',
      'Basement and underground coverage',
      'WPC/regulatory compliant equipment',
      'Site survey and RF planning',
      'Post-installation signal testing',
    ],
    applications: ['Commercial Buildings', 'Hospitals', 'Hotels', 'Underground Parking', 'Metro Stations', 'Large Campuses'],
  },
  {
    icon: Radio,
    title: 'Telecom Infrastructure',
    slug: 'telecom-infrastructure',
    desc: 'End-to-end telecom infrastructure services including tower installations, fiber optic cabling, and network rollouts for telecom operators and enterprise clients. We handle civil works, equipment mounting, and commissioning.',
    features: [
      'Telecom tower installation and upgrades',
      'Fiber optic cable laying and splicing',
      'FTTH (Fiber to the Home) rollouts',
      'Small cell and DAS deployment',
      'Site acquisition and civil works',
      'Equipment mounting and commissioning',
      'Passive infrastructure maintenance',
      'Project management and documentation',
    ],
    applications: ['Telecom Operators', 'ISPs', 'Smart City Projects', 'Industrial Parks', 'IT SEZs', 'Government Networks'],
  },
  {
    icon: Server,
    title: 'Enterprise Networking',
    slug: 'network-setup',
    desc: 'Structured cabling, server room design, enterprise Wi-Fi, and LAN/WAN networking solutions for businesses of all sizes. We build scalable, high-performance networks that support your growing infrastructure needs.',
    features: [
      'Cat6/Cat6A structured cabling',
      'Server room and data center setup',
      'Enterprise-grade Wi-Fi deployment',
      'LAN/WAN network design',
      'Network switch and router configuration',
      'VPN and firewall setup',
      'Network monitoring and management',
      'Cable testing and certification',
    ],
    applications: ['Corporate Offices', 'Data Centers', 'Co-working Spaces', 'Hospitals', 'Educational Institutions', 'Hotels'],
  },
  {
    icon: Monitor,
    title: 'Access Control & Automation',
    slug: 'amc-maintenance',
    desc: 'Secure your premises with biometric access control, boom barriers, turnstiles, and automated gate systems. We integrate these with your existing CCTV and security infrastructure for a unified solution.',
    features: [
      'Biometric fingerprint and face recognition',
      'RFID card-based access control',
      'Boom barriers and bollards',
      'Turnstile and flap barrier systems',
      'Automatic gate operators',
      'Visitor management systems',
      'Integration with CCTV systems',
      'Cloud-based access logs',
    ],
    applications: ['Corporate Campuses', 'Industrial Sites', 'Residential Gated Communities', 'Government Buildings', 'Hospitals', 'Malls'],
  },
  {
    icon: Wrench,
    title: 'AMC & Maintenance Services',
    slug: 'amc-maintenance',
    desc: 'Annual Maintenance Contracts (AMC) for all installed systems including CCTV, networking, access control, and telecom equipment. We provide preventive maintenance, emergency repairs, and system health monitoring.',
    features: [
      'Scheduled preventive maintenance visits',
      'Emergency breakdown support',
      'Firmware and software updates',
      'Equipment health monitoring',
      'Spare parts management',
      'System performance reporting',
      '24/7 helpdesk support',
      'SLA-backed response times',
    ],
    applications: ['All Industries', 'Existing Marco India Clients', 'Third-party System Maintenance', 'Multi-site Organizations'],
  },
];

const PROCESS = [
  { icon: Shield, title: 'Site Survey', desc: 'Our engineering team visits your site to assess requirements, coverage areas, and infrastructure readiness.' },
  { icon: Settings, title: 'Solution Design', desc: 'We prepare a detailed technical proposal with equipment specifications, layout plans, and pricing.' },
  { icon: Zap, title: 'Installation', desc: 'Our trained technicians execute the installation following industry best practices and safety standards.' },
  { icon: CheckCircle, title: 'Testing & Handover', desc: 'Every installation undergoes thorough testing before handover with complete documentation and training.' },
];

const Services = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Our <span>Services</span></h1>
          <nav className="page-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Services</span>
          </nav>
        </div>
      </section>

      {/* Services List */}
      <section className="inner-section">
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">What We Offer</span>
            <h2 className="inner-section__title">End-to-End <span>Infrastructure Solutions</span></h2>
            <p className="inner-section__subtitle">
              From initial consultation to post-installation support, we provide comprehensive services tailored to your specific requirements.
            </p>
          </div>

          <div className="services-page__list">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isReversed = i % 2 !== 0;
              return (
                <div key={service.slug} className={`services-page__item ${isReversed ? 'services-page__item--reversed' : ''}`} id={service.slug}>
                  <div className="services-page__item-info">
                    <div className="services-page__item-icon"><Icon size={28} /></div>
                    <h3 className="services-page__item-title">{service.title}</h3>
                    <p className="services-page__item-desc">{service.desc}</p>
                    <div className="services-page__item-apps">
                      <strong>Applications:</strong>
                      <div className="services-page__item-tags">
                        {service.applications.map((app) => (
                          <span key={app} className="services-page__tag">{app}</span>
                        ))}
                      </div>
                    </div>
                    <Link to={`/services/${service.slug}`} className="services-page__item-cta">
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="services-page__item-features">
                    <h4>Key Capabilities</h4>
                    <ul>
                      {service.features.map((f) => (
                        <li key={f}><CheckCircle size={14} /> {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="inner-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">How We Work</span>
            <h2 className="inner-section__title">Our <span>Process</span></h2>
            <p className="inner-section__subtitle">A structured, transparent approach from initial consultation to project handover.</p>
          </div>
          <div className="services-page__process">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="services-page__step">
                  <div className="services-page__step-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="services-page__step-icon"><Icon size={24} /></div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
