import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock,
  Facebook, Instagram, Linkedin, Twitter, Youtube,
  ChevronRight, ArrowUp } from
'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <motion.div 
        className="footer__top container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Company Info */}
        <motion.div 
          className="footer__col footer__col--brand"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <Link to="/" className="footer__logo my-[10px]">
            <span className="footer__logo-mark">M</span>
            <span className="footer__logo-text">Marco India</span>
          </Link>
          <p className="footer__about">
            India's trusted partner for professional CCTV surveillance, signal boosting, 
            and telecom infrastructure solutions. Delivering security and connectivity 
            with excellence since 2015.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer__social-link">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social-link">
              <Youtube size={18} />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="footer__col"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <h3 className="footer__heading my-[20px]">Quick Links</h3>
          <ul className="footer__list">
            <li><Link to="/" className="footer__link"><ChevronRight size={14} /> Home</Link></li>
            <li><Link to="/about" className="footer__link"><ChevronRight size={14} /> About Us</Link></li>
            <li><Link to="/services" className="footer__link"><ChevronRight size={14} /> Our Services</Link></li>
            <li><Link to="/gallery" className="footer__link"><ChevronRight size={14} /> Project Gallery</Link></li>
            <li><Link to="/careers" className="footer__link"><ChevronRight size={14} /> Careers</Link></li>
            <li><Link to="/contact" className="footer__link"><ChevronRight size={14} /> Contact Us</Link></li>
          </ul>
        </motion.div>

        {/* Our Services */}
        <motion.div 
          className="footer__col"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <h3 className="footer__heading my-[20px]">Our Services</h3>
          <ul className="footer__list">
            <li><Link to="/services/cctv-installation" className="footer__link"><ChevronRight size={14} /> CCTV Installation</Link></li>
            <li><Link to="/services/signal-boosting" className="footer__link"><ChevronRight size={14} /> Signal Boosting</Link></li>
            <li><Link to="/services/telecom-infrastructure" className="footer__link"><ChevronRight size={14} /> Telecom Infrastructure</Link></li>
            <li><Link to="/services/fiber-optic-cabling" className="footer__link"><ChevronRight size={14} /> Fiber Optic Cabling</Link></li>
            <li><Link to="/services/network-setup" className="footer__link"><ChevronRight size={14} /> Network Setup</Link></li>
            <li><Link to="/services/amc-maintenance" className="footer__link"><ChevronRight size={14} /> AMC & Maintenance</Link></li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="footer__col"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <h3 className="footer__heading my-[20px]">Contact Us</h3>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <MapPin size={18} className="footer__contact-icon" />
              <span>
                ROAD no-8 Jawahar Nagar Mango<br />
                Jamshedpur, Jharkhand-831012, India
              </span>
            </li>
            <li className="footer__contact-item">
              <Phone size={18} className="footer__contact-icon" />
              <div>
                <a href="tel:+918092099110" className="footer__contact-link">+91 8092099110</a> (Main)<br />
                <a href="tel:+919315501070" className="footer__contact-link">+91 9315501070</a>
              </div>
            </li>
            <li className="footer__contact-item">
              <Mail size={18} className="footer__contact-icon" />
              <div>
                <a href="mailto:marcoindia890@gmail.com" className="footer__contact-link">marcoindia890@gmail.com</a><br />
                <a href="mailto:support@marcoindia.in" className="footer__contact-link">support@marcoindia.in</a>
              </div>
            </li>
            <li className="footer__contact-item">
              <Clock size={18} className="footer__contact-icon" />
              <span>
                Mon – Sat: 9:00 AM – 7:00 PM<br />
                Sunday: Closed
              </span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Marco India. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy-policy" className="footer__bottom-link">Privacy Policy</Link>
            <span className="footer__bottom-sep">|</span>
            <Link to="/terms" className="footer__bottom-link">Terms of Service</Link>
            <span className="footer__bottom-sep">|</span>
            <Link to="/sitemap" className="footer__bottom-link">Sitemap</Link>
          </div>
          <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>);

};

export default Footer;