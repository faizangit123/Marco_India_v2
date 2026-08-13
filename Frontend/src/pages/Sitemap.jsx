import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Info, Briefcase, Image, Users, Mail, LogIn, UserPlus,
  Camera, Signal, Radio, Cable, Network, Wrench, Shield, FileText, Map } from
'lucide-react';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './InnerPage.css';

const Sitemap = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const sitemapSections = [
  {
    title: 'Main Pages',
    links: [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About Us', icon: Info },
    { to: '/services', label: 'Our Services', icon: Briefcase },
    { to: '/gallery', label: 'Project Gallery', icon: Image },
    { to: '/careers', label: 'Careers', icon: Users },
    { to: '/contact', label: 'Contact Us', icon: Mail }]

  },
  {
    title: 'Our Services',
    links: [
    { to: '/services/cctv-installation', label: 'CCTV Installation', icon: Camera },
    { to: '/services/signal-boosting', label: 'Signal Boosting', icon: Signal },
    { to: '/services/telecom-infrastructure', label: 'Telecom Infrastructure', icon: Radio },
    { to: '/services/fiber-optic-cabling', label: 'Fiber Optic Cabling', icon: Cable },
    { to: '/services/network-setup', label: 'Network Setup', icon: Network },
    { to: '/services/amc-maintenance', label: 'AMC & Maintenance', icon: Wrench }]

  },
  {
    title: 'Account',
    links: [
    { to: '/login', label: 'Login', icon: LogIn },
    { to: '/signup', label: 'Sign Up', icon: UserPlus },
    { to: '/profile', label: 'My Profile', icon: Users }]

  },
  {
    title: 'Legal',
    links: [
    { to: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
    { to: '/terms', label: 'Terms of Service', icon: FileText },
    { to: '/sitemap', label: 'Sitemap', icon: Map }]

  }];


  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Site<span>map</span></h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / <span>Sitemap</span>
          </p>
        </div>
      </section>

      <section className="inner-page__content container">
        <p className="inner-page__intro my-[20px] py-[10px]">
          Explore all pages and sections of the Marco India website. Find quick links to our services, 
          company information, and support resources.
        </p>

        <div className="sitemap-grid my-[20px]">
          {sitemapSections.map((section, index) =>
          <div key={index} className="sitemap-section mx-0 my-0 px-[10px]">
              <h2 className="sitemap-section__title">{section.title}</h2>
              <ul className="sitemap-section__list">
                {section.links.map((link, linkIndex) =>
              <li key={linkIndex}>
                    <Link to={link.to} className="sitemap-link my-px px-[10px]">
                      <link.icon size={18} className="sitemap-link__icon" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </section>
      <ScrollToTop />
    </main>);

};

export default Sitemap;