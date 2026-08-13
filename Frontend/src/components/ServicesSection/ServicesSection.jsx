import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Signal, Radio, Server, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';
import './ServicesSection.css';

const SERVICES = [
  {
    icon: Camera,
    title: 'CCTV Surveillance',
    slug: 'cctv-installation',
    description: 'End-to-end CCTV installation for homes, offices, warehouses, and industrial sites. IP cameras, DVR/NVR setup, and remote monitoring.',
    num: '01'
  },
  {
    icon: Signal,
    title: 'Signal Boosting',
    slug: 'signal-boosting',
    description: 'Amplify mobile network coverage in dead zones. Enterprise-grade signal boosters for 4G/5G across commercial and residential properties.',
    num: '02'
  },
  {
    icon: Radio,
    title: 'Telecom Infrastructure',
    slug: 'telecom-infrastructure',
    description: 'Tower installation, fiber optic cabling, and telecom network rollouts for operators and enterprises across India.',
    num: '03'
  },
  {
    icon: Server,
    title: 'IT & Networking',
    slug: 'network-setup',
    description: 'Structured cabling, server room setup, and enterprise networking solutions engineered for performance and scalability.',
    num: '04'
  },
  {
    icon: ShieldCheck,
    title: 'Access Control',
    slug: 'access-control',
    description: 'Biometric, RFID, and smart access control systems for enhanced security and automated personnel tracking.',
    num: '05'
  },
  {
    icon: Wrench,
    title: 'AMC & Maintenance',
    slug: 'amc-maintenance',
    description: 'Comprehensive annual maintenance contracts ensuring 99.9% uptime for all your security and network infrastructure.',
    num: '06'
  }
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <motion.div
      className="service-card"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      <div className="service-card__top">
        <span className="service-card__num">{service.num}</span>
        <div className="service-card__icon-wrap">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <a href={`/services/${service.slug}`} className="service-card__link">
        <ArrowRight size={20} strokeWidth={1.5} />
      </a>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className="services section" id="services">
      <div className="container">
        <motion.div 
          className="services__header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="services__badge">— WHAT WE DO</span>
          <h2 className="services__title">Our Services</h2>
        </motion.div>

        <motion.div 
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
