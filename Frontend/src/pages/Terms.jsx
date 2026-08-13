import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CreditCard, Wrench, AlertTriangle, Scale, Clock, Phone } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './InnerPage.css';

const Terms = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Terms of <span>Service</span></h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / <span>Terms of Service</span>
          </p>
        </div>
      </section>

      <section className="inner-page__content container mx-0 my-0 px-[60px]">
        <p className="inner-page__updated my-[20px]">Last updated: March 2026</p>

        <div className="policy-section mx-0 my-0 py-0">
          <div className="policy-section__icon">
            <FileText size={24} />
          </div>
          <h2 className="policy-section__title">Acceptance of Terms</h2>
          <p className="px-[20px]">
            By engaging Marco India's services, you agree to these Terms of Service. These terms govern 
            all services including CCTV installation, signal boosting, telecom infrastructure, fiber optic 
            cabling, network setup, and AMC maintenance contracts.
          </p>
        </div>

        <div className="policy-section px-0">
          <div className="policy-section__icon">
            <Wrench size={24} />
          </div>
          <h2 className="policy-section__title">Services</h2>
          <h3>Scope of Work</h3>
          <ul>
            <li>All services are provided as per the agreed quotation and work order</li>
            <li>Site survey and assessment may be required before final quotation</li>
            <li>Installation timelines depend on site conditions and material availability</li>
            <li>Customer must provide necessary access and electrical points</li>
          </ul>
          <h3>Service Standards</h3>
          <ul>
            <li>All installations follow industry best practices and safety standards</li>
            <li>We use quality equipment from reputed manufacturers</li>
            <li>Trained technicians perform all installations and maintenance</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <CreditCard size={24} />
          </div>
          <h2 className="policy-section__title">Payment Terms</h2>
          <ul>
            <li><strong>Advance:</strong> 50% advance payment required before work commencement</li>
            <li><strong>Balance:</strong> Remaining 50% upon completion and handover</li>
            <li><strong>AMC Contracts:</strong> Quarterly or annual payment as per agreement</li>
            <li><strong>Late Payment:</strong> Interest of 2% per month on overdue amounts</li>
          </ul>
          <p>Accepted payment methods: Bank Transfer, UPI, Cheque, Cash</p>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Clock size={24} />
          </div>
          <h2 className="policy-section__title">Warranty & Support</h2>
          <h3>Installation Warranty</h3>
          <ul>
            <li>1-year warranty on installation workmanship</li>
            <li>Equipment warranty as per manufacturer terms</li>
            <li>Free support during warranty period for installation-related issues</li>
          </ul>
          <h3>AMC Coverage</h3>
          <ul>
            <li>Regular preventive maintenance visits as per contract</li>
            <li>Priority response for service calls</li>
            <li>Spare parts charged separately unless included in AMC</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <AlertTriangle size={24} />
          </div>
          <h2 className="policy-section__title">Limitations</h2>
          <ul>
            <li>We are not liable for damage due to power surges, lightning, or natural disasters</li>
            <li>Customer is responsible for maintaining proper electrical supply</li>
            <li>Third-party equipment modifications void our warranty</li>
            <li>Signal boosting effectiveness depends on external network conditions</li>
            <li>CCTV footage storage depends on customer-provided storage devices</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Scale size={24} />
          </div>
          <h2 className="policy-section__title">Dispute Resolution</h2>
          <p className="px-[20px]">
            Any disputes arising from these terms shall be resolved through mutual discussion first. 
            If unresolved, disputes shall be subject to arbitration in Jamshedpur, Jharkhand, India, 
            under the Arbitration and Conciliation Act, 1996.
          </p>
        </div>

        <div className="policy-section">
          <div className="policy-section__icon">
            <Phone size={24} />
          </div>
          <h2 className="policy-section__title">Contact Information</h2>
          <p>For questions about these terms, contact us:</p>
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

export default Terms;