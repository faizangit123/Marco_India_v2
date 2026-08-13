import { Radio, Search, PenTool, Wrench, TestTube, ShieldCheck } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

const TelecomInfrastructure = () => (
  <ServicePageLayout
    slug="telecom-infrastructure"
    title="Telecom Infrastructure"
    icon={Radio}
    subtitle="End-to-end telecom infrastructure solutions — from tower installation and equipment mounting to commissioning and maintenance. We partner with leading telecom operators across India."
    description={
      <>
        <p>Marco India has extensive experience in building and maintaining telecom infrastructure for India's largest operators. Our services cover the full project lifecycle — site acquisition support, foundation work, tower erection, equipment installation, power systems, and commissioning.</p>
        <p>We specialize in ground-based towers (GBT), roof-top towers (RTT), monopoles, and small cell deployments. Our teams operate across multiple states with a strong track record of on-time project delivery.</p>
      </>
    }
    features={[
      'Ground-based tower (GBT) and roof-top tower (RTT) installation',
      'Monopole and small cell deployment',
      'BTS/NodeB/eNodeB equipment mounting and commissioning',
      'Power system installation — DG sets, battery banks, rectifiers',
      'Shelter and cabinet installation',
      'Site acquisition and regulatory compliance support',
      'Preventive and corrective maintenance',
    ]}
    applications={[
      'Telecom Operators', 'Tower Companies', 'Internet Service Providers',
      'Government Projects', 'Smart City Infrastructure', 'Rural Connectivity Programs',
    ]}
    stats={[
      { value: 1000, suffix: '+', label: 'Towers Installed' },
      { value: 15, suffix: '+', label: 'States Covered' },
      { value: 50, suffix: '+', label: 'Operator Partnerships' },
      { value: 99, suffix: '%', label: 'On-time Delivery' },
    ]}
    process={[
      { icon: Search, title: 'Site Acquisition', description: 'We handle site identification, landlord negotiation, and regulatory clearances including municipal and aviation approvals.' },
      { icon: PenTool, title: 'Foundation & Civil Works', description: 'Soil testing, foundation design, and civil construction following telecom industry standards and structural safety norms.' },
      { icon: Wrench, title: 'Tower Erection', description: 'Professional erection of GBT, RTT, monopole, or small cell structures with crane operations and safety rigging.' },
      { icon: TestTube, title: 'Equipment & Commissioning', description: 'BTS/eNodeB mounting, antenna installation, feeder cable routing, power system setup, and RF commissioning.' },
      { icon: ShieldCheck, title: 'Integration & Handover', description: 'Network integration testing, KPI verification, complete project documentation, and handover to the operator.' },
    ]}
    faqs={[
      { question: 'What types of telecom towers do you install?', answer: 'We install Ground-Based Towers (GBT) up to 80m, Roof-Top Towers (RTT), self-supporting and guyed mast towers, monopoles, and small cell poles. The type depends on site conditions, coverage requirements, and structural feasibility.' },
      { question: 'How long does a tower installation project take?', answer: 'A typical tower installation takes 30-45 days from civil work to commissioning. This includes foundation (7-10 days), tower erection (3-5 days), equipment installation (5-7 days), and commissioning (3-5 days). Timelines vary based on site complexity.' },
      { question: 'Do you handle regulatory approvals?', answer: 'Yes. We assist with all regulatory clearances including municipal corporation approvals, aviation height clearance (where applicable), structural stability certificates, and electrical safety compliance.' },
      { question: 'Which operators do you work with?', answer: 'We work with all major Indian operators and tower companies including Jio, Airtel, Vi, BSNL, American Tower Corporation (ATC), Indus Towers, and several regional ISPs.' },
      { question: 'Do you provide maintenance for existing tower sites?', answer: 'Yes. We offer comprehensive O&M services including preventive maintenance, diesel generator servicing, battery management, equipment health checks, and emergency breakdown support under SLA-backed contracts.' },
    ]}
  />
);

export default TelecomInfrastructure;
