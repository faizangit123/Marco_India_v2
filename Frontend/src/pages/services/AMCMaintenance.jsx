import { Wrench, ClipboardList, Search, Settings, ShieldCheck, HeartPulse } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

const AMCMaintenance = () => (
  <ServicePageLayout
    slug="amc-maintenance"
    title="AMC & Maintenance"
    icon={Wrench}
    subtitle="Comprehensive Annual Maintenance Contracts and on-demand maintenance services for all your telecom, CCTV, and networking infrastructure. Keep your systems running at peak performance."
    description={
      <>
        <p>Technology infrastructure requires regular upkeep to ensure reliability, security, and optimal performance. Marco India offers flexible AMC plans covering preventive maintenance, emergency repairs, equipment replacement, and system upgrades for CCTV, networking, telecom, and fiber optic installations.</p>
        <p>Our dedicated support team provides fast response times with SLA-backed service level agreements. We offer quarterly, half-yearly, and annual maintenance schedules customized to your operational requirements.</p>
      </>
    }
    features={[
      'Scheduled preventive maintenance visits',
      'Emergency breakdown support with guaranteed SLA',
      'Equipment health monitoring and reporting',
      'Firmware and software updates',
      'Spare parts management and replacement',
      'System performance optimization',
      'Detailed maintenance reports and documentation',
    ]}
    applications={[
      'CCTV Surveillance Systems', 'Telecom Tower Sites', 'Fiber Optic Networks',
      'Enterprise LAN/WAN', 'Signal Booster Installations', 'Data Center Infrastructure',
    ]}
    stats={[
      { value: 200, suffix: '+', label: 'Active AMC Contracts' },
      { value: 4, suffix: ' hr', label: 'SLA Response Time' },
      { value: 99, suffix: '%', label: 'Issue Resolution Rate' },
      { value: 12, suffix: 'x', label: 'Annual PM Visits' },
    ]}
    process={[
      { icon: ClipboardList, title: 'Assessment & Plan', description: 'We audit your installed systems, document equipment details, and create a customized maintenance schedule based on your operational needs.' },
      { icon: Search, title: 'Preventive Maintenance', description: 'Scheduled visits for cleaning, inspection, firmware updates, cable checks, and performance testing to prevent failures before they happen.' },
      { icon: Settings, title: 'Corrective Maintenance', description: 'When issues arise, our technicians respond within SLA timelines to diagnose, repair, or replace faulty equipment with minimal downtime.' },
      { icon: HeartPulse, title: 'Health Monitoring', description: 'Remote monitoring of critical systems with automated alerts for equipment health, storage capacity, and performance anomalies.' },
      { icon: ShieldCheck, title: 'Reporting & Review', description: 'Monthly/quarterly maintenance reports with system health scores, incident logs, recommendations, and AMC renewal planning.' },
    ]}
    faqs={[
      { question: 'What does an AMC typically cover?', answer: 'Our standard AMC covers scheduled preventive maintenance visits, emergency breakdown support, labor charges, firmware/software updates, and basic consumables. Comprehensive AMCs also include equipment replacement and spare parts at no additional cost.' },
      { question: 'How quickly do you respond to emergencies?', answer: 'Our standard SLA guarantees a 4-hour response time for critical issues in metro cities and 8 hours for tier-2/3 cities. Premium SLA plans offer 2-hour response with dedicated on-call technicians.' },
      { question: 'Can I get an AMC for equipment installed by another vendor?', answer: 'Yes. We take over maintenance of third-party installations after a thorough system audit. We assess the equipment condition and may recommend upgrades if certain components are beyond serviceable life.' },
      { question: 'What are the different AMC plan options?', answer: 'We offer three tiers: Basic (preventive maintenance only), Standard (preventive + emergency repairs with labor), and Comprehensive (all-inclusive with parts replacement). Plans can be quarterly, half-yearly, or annual.' },
      { question: 'Do you provide maintenance reports?', answer: 'Yes. Every maintenance visit is documented with findings, actions taken, and recommendations. Monthly summary reports are provided with system health metrics, incident history, and upcoming maintenance schedules.' },
      { question: 'Is there a minimum contract period?', answer: 'Our standard AMC contracts are for 12 months with the option to renew. For new installations by Marco India, we offer a complimentary 3-month warranty period before the AMC begins.' },
    ]}
  />
);

export default AMCMaintenance;
