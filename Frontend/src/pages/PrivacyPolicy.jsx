import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, Lock, Eye, Users, Mail, FileText } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './InnerPage.css';

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Privacy <span>Policy</span></h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / <span>Privacy Policy</span>
          </p>
        </div>
      </section>

      <section className="inner-page__content container px-[110px]">
        <p className="inner-page__updated px-0 my-[20px] py-[10px]">Last updated: March 2026</p>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Shield size={24} />
          </div>
          <h2 className="policy-section__title">Introduction</h2>
          <p className="px-[20px]">
            Marco India ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or use our services, including CCTV installation, signal boosting, and telecom infrastructure solutions.
          </p>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Database size={24} />
          </div>
          <h2 className="policy-section__title">Information We Collect</h2>
          <h3>Personal Information</h3>
          <ul>
            <li>Name and contact details (email, phone number, address)</li>
            <li>Company/organization name</li>
            <li>Service requirements and project specifications</li>
            <li>Payment and billing information</li>
            <li>Communication history with our team</li>
          </ul>
          <h3>Technical Information</h3>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referral sources</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Eye size={24} />
          </div>
          <h2 className="policy-section__title">How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To process service requests and quotations</li>
            <li>To communicate about projects, updates, and support</li>
            <li>To improve our website and services</li>
            <li>To send promotional materials (with your consent)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Users size={24} />
          </div>
          <h2 className="policy-section__title">Information Sharing</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li><strong>Service Partners:</strong> Trusted vendors who assist in service delivery</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Lock size={24} />
          </div>
          <h2 className="policy-section__title">Data Security</h2>
          <p className="px-[20px]">
            We implement industry-standard security measures to protect your information, including encryption, 
            secure servers, and access controls. However, no method of transmission over the Internet is 100% secure, 
            and we cannot guarantee absolute security.
          </p>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <FileText size={24} />
          </div>
          <h2 className="policy-section__title">Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and receive a copy of your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Lodge a complaint with regulatory authorities</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Mail size={24} />
          </div>
          <h2 className="policy-section__title">Contact Us</h2>
          <p className="px-[10px]">For privacy-related inquiries, please contact:</p>
          <div className="policy-contact">
            <p><strong>NASIM FAROOQUI</strong><br />Owner, Marco India</p>
            <p>
              ROAD no-8 Jawahar Nagar Mango<br />
              Jamshedpur, Jharkhand-831012, India
            </p>
            <p>
              Email: <a href="mailto:marcoindia@gmail.com">marcoindia@gmail.com</a><br />
              Phone: <a href="tel:+918092099110">+91 8092099110</a>
            </p>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </main>);

};

export default PrivacyPolicy;