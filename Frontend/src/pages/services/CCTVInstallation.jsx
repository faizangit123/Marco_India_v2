import { Camera, Search, PenTool, Wrench, TestTube, ShieldCheck } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

const CCTVInstallation = () => (
  <ServicePageLayout
    slug="cctv-installation"
    title="CCTV Installation"
    icon={Camera}
    subtitle="Professional CCTV surveillance solutions for residential, commercial, and industrial properties across India. We design, install, and maintain end-to-end security camera systems tailored to your needs."
    description={
      <>
        <p>Marco India provides comprehensive CCTV installation services using the latest IP camera technology, high-definition recording systems, and remote monitoring capabilities. Our team of certified technicians ensures optimal camera placement, proper cabling, and seamless integration with your existing security infrastructure.</p>
        <p>From single-site installations to multi-location surveillance networks, we deliver reliable security systems that operate 24/7 with minimal maintenance requirements.</p>
      </>
    }
    features={[
      'HD & 4K IP camera installation with night vision',
      'NVR/DVR setup with cloud and local storage',
      'Remote monitoring via mobile app and web portal',
      'Perimeter security with motion detection alerts',
      'Access control system integration',
      'Annual maintenance contracts (AMC) for ongoing support',
      'Video analytics and AI-powered intrusion detection',
    ]}
    applications={[
      'Corporate Offices', 'Warehouses', 'Retail Stores', 'Hospitals',
      'Educational Institutions', 'Residential Societies', 'Manufacturing Plants', 'Government Buildings',
    ]}
    stats={[
      { value: 500, suffix: '+', label: 'Cameras Installed' },
      { value: 100, suffix: '+', label: 'Sites Secured' },
      { value: 24, suffix: '/7', label: 'Monitoring' },
      { value: 98, suffix: '%', label: 'System Uptime' },
    ]}
    process={[
      { icon: Search, title: 'Site Survey', description: 'Our engineers assess your property to identify critical areas, entry/exit points, and optimal camera positions.' },
      { icon: PenTool, title: 'System Design', description: 'We create a detailed layout with camera types, cable routing, storage calculations, and a transparent quotation.' },
      { icon: Wrench, title: 'Installation', description: 'Professional mounting, cabling (Cat6/coaxial), NVR/DVR setup, and network configuration by certified technicians.' },
      { icon: TestTube, title: 'Testing & Calibration', description: 'Every camera is tested for image quality, night vision, motion detection, and remote access before sign-off.' },
      { icon: ShieldCheck, title: 'Handover & Training', description: 'Complete documentation, mobile app setup, staff training, and optional AMC for ongoing maintenance.' },
    ]}
    faqs={[
      { question: 'What type of cameras do you install — IP or analog?', answer: 'We primarily install IP cameras for superior image quality and remote access. However, we also support analog/HD-TVI systems for budget-conscious projects and legacy system upgrades.' },
      { question: 'How much storage do I need for my CCTV system?', answer: 'Storage depends on the number of cameras, resolution, and retention period. For example, 16 cameras at 2MP recording 24/7 typically need 4-8 TB for 30 days. We calculate this precisely during the design phase.' },
      { question: 'Can I view my cameras remotely on my phone?', answer: 'Yes. All our installations include mobile app configuration for iOS and Android. You can view live feeds, playback recordings, and receive motion alerts from anywhere with an internet connection.' },
      { question: 'Do you provide maintenance after installation?', answer: 'Absolutely. We offer flexible AMC plans covering preventive maintenance, emergency repairs, firmware updates, and equipment replacement. Our standard SLA guarantees a 4-hour response time.' },
      { question: 'How long does a typical installation take?', answer: 'A standard 8-16 camera installation is typically completed in 1-2 days. Larger projects with 50+ cameras may take 5-7 working days depending on site complexity and cabling requirements.' },
      { question: 'Is the system expandable if I need more cameras later?', answer: 'Yes. We design systems with future expansion in mind, using scalable NVRs and network switches that support additional cameras without replacing core equipment.' },
    ]}
  />
);

export default CCTVInstallation;
