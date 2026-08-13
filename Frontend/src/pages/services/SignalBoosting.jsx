import { Signal, Search, PenTool, Wrench, TestTube, ShieldCheck } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

const SignalBoosting = () => (
  <ServicePageLayout
    slug="signal-boosting"
    title="Signal Boosting"
    icon={Signal}
    subtitle="Eliminate dead zones and ensure strong cellular connectivity throughout your building. Our in-building signal boosting solutions cover all major Indian telecom operators and frequency bands."
    description={
      <>
        <p>Poor indoor cellular coverage is a common challenge in modern buildings with reinforced concrete, metal structures, and energy-efficient glass. Marco India deploys professional-grade signal boosting systems — including Distributed Antenna Systems (DAS) and multi-band repeaters — that amplify signals from all major carriers including Jio, Airtel, Vi, and BSNL.</p>
        <p>Our solutions are DOT-approved and comply with all TRAI regulations for signal amplification equipment in India.</p>
      </>
    }
    features={[
      'Multi-band signal boosters (2G, 3G, 4G LTE, 5G-ready)',
      'Distributed Antenna System (DAS) design and installation',
      'Coverage for all major Indian operators — Jio, Airtel, Vi, BSNL',
      'DOT-approved and TRAI-compliant equipment',
      'RF survey and coverage mapping before installation',
      'Seamless integration with building infrastructure',
      'Post-installation signal strength verification',
    ]}
    applications={[
      'Hospitals & Healthcare', 'Corporate Offices', 'Shopping Malls', 'Hotels & Resorts',
      'Underground Parking', 'Basements & Sub-levels', 'High-rise Buildings', 'Industrial Facilities',
    ]}
    stats={[
      { value: 200, suffix: '+', label: 'Buildings Covered' },
      { value: 5, suffix: '', label: 'Major Operators' },
      { value: 100, suffix: '%', label: 'DOT Compliant' },
      { value: 99, suffix: '%', label: 'Coverage Achieved' },
    ]}
    process={[
      { icon: Search, title: 'RF Site Survey', description: 'We measure existing signal levels across your building using professional RF equipment to map dead zones and weak areas.' },
      { icon: PenTool, title: 'Solution Design', description: 'Our engineers design a multi-band repeater or DAS solution with antenna placement plans and equipment specifications.' },
      { icon: Wrench, title: 'Installation', description: 'Donor antennas, amplifiers, indoor antennas, and cabling are installed with minimal disruption to your operations.' },
      { icon: TestTube, title: 'Signal Testing', description: 'Post-installation testing verifies signal strength, data speeds, and call quality across all floors and operators.' },
      { icon: ShieldCheck, title: 'Certification & Handover', description: 'Complete documentation with before/after signal maps, DOT compliance certificates, and maintenance guidelines.' },
    ]}
    faqs={[
      { question: 'Is signal boosting legal in India?', answer: 'Yes, when using DOT-approved equipment installed by authorized vendors. Marco India uses only WPC-licensed and TRAI-compliant signal boosters. Unauthorized boosters are illegal and can cause interference.' },
      { question: 'Will the booster work for all telecom operators?', answer: 'Yes. Our multi-band boosters support all major Indian carriers — Jio (Band 40/3/1), Airtel (Band 1/3/40), Vi (Band 1/3/5), and BSNL. We ensure coverage across 2G, 3G, 4G, and 5G bands.' },
      { question: 'How much area can one booster cover?', answer: 'A single commercial-grade booster can cover 2,000–10,000 sq ft depending on the model, building construction, and desired signal strength. For larger buildings, we deploy DAS with multiple antennas.' },
      { question: 'Will it improve internet speed or just call quality?', answer: 'Both. Signal boosters amplify the entire cellular signal, improving voice calls, SMS, and mobile data speeds (4G/5G). Users typically see 3-5x improvement in data speeds in previously weak areas.' },
      { question: 'Does it require an internet connection to work?', answer: 'No. Signal boosters amplify the existing outdoor cellular signal and redistribute it indoors. They work independently of Wi-Fi or broadband connections.' },
    ]}
  />
);

export default SignalBoosting;
