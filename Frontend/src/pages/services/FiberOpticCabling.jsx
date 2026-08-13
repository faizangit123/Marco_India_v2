import { Cable, Search, PenTool, Wrench, TestTube, ShieldCheck } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

const FiberOpticCabling = () => (
  <ServicePageLayout
    slug="fiber-optic-cabling"
    title="Fiber Optic Cabling"
    icon={Cable}
    subtitle="High-speed fiber optic network deployment for enterprises, ISPs, and telecom operators. We handle everything from route planning and trenching to splicing, testing, and commissioning."
    description={
      <>
        <p>Fiber optic networks are the backbone of modern digital infrastructure. Marco India provides comprehensive fiber optic cabling services including FTTH (Fiber to the Home), FTTB (Fiber to the Building), and long-haul backbone network deployment.</p>
        <p>Our certified technicians use precision fusion splicing equipment and OTDR testing to ensure every fiber link meets international performance standards. We work with single-mode and multi-mode fibers across aerial, underground, and indoor installations.</p>
      </>
    }
    features={[
      'FTTH, FTTB, and FTTN network rollout',
      'Fusion splicing with OTDR testing and certification',
      'OLT, ONU/ONT configuration and commissioning',
      'Underground and aerial fiber cable installation',
      'Fiber patch panel and ODF rack setup',
      'Route survey and duct network planning',
      'Fiber fault detection and emergency repair',
    ]}
    applications={[
      'Internet Service Providers', 'Telecom Operators', 'Enterprise Campuses', 'Data Centers',
      'Smart City Projects', 'Residential Townships', 'Industrial Parks',
    ]}
    stats={[
      { value: 5000, suffix: '+ km', label: 'Fiber Laid' },
      { value: 100, suffix: '+', label: 'FTTH Projects' },
      { value: 100, suffix: '%', label: 'OTDR Certified' },
      { value: 10, suffix: ' Gbps', label: 'Max Bandwidth' },
    ]}
    process={[
      { icon: Search, title: 'Route Survey', description: 'Detailed route survey including duct availability, aerial pole mapping, road crossing points, and right-of-way assessments.' },
      { icon: PenTool, title: 'Network Design', description: 'Fiber network architecture design — PON/Active Ethernet topology, splitter placement, OLT/ONU sizing, and bill of materials.' },
      { icon: Wrench, title: 'Cable Installation', description: 'Underground trenching/HDD boring or aerial cable stringing. Duct laying, manholes, and fiber cable pulling with proper bend radius management.' },
      { icon: TestTube, title: 'Splicing & Testing', description: 'Precision fusion splicing with <0.02dB loss per splice. OTDR testing and certification for every fiber strand with detailed test reports.' },
      { icon: ShieldCheck, title: 'Commissioning', description: 'OLT/ONU configuration, VLAN setup, bandwidth provisioning, end-to-end connectivity testing, and customer activation.' },
    ]}
    faqs={[
      { question: 'What is the difference between single-mode and multi-mode fiber?', answer: 'Single-mode fiber (SMF) has a smaller core and supports longer distances (up to 80+ km) — ideal for telecom and ISP backbones. Multi-mode fiber (MMF) has a larger core, supports shorter distances (up to 500m), and is commonly used in data centers and campus LANs.' },
      { question: 'What speeds can fiber optic networks achieve?', answer: 'Our fiber installations support speeds from 100 Mbps to 10 Gbps per user, with backbone links capable of 100 Gbps using DWDM technology. GPON networks typically deliver 2.5 Gbps downstream shared across 64-128 users.' },
      { question: 'How do you ensure quality in fiber splicing?', answer: 'We use Fujikura and INNO fusion splicers achieving <0.02dB average splice loss. Every splice is verified with an OTDR trace and documented. We maintain splice loss records for the entire network.' },
      { question: 'Can you install fiber in existing buildings?', answer: 'Yes. We specialize in retrofitting fiber into existing buildings using micro-ducts, surface-mounted raceways, and existing cable trays. Our team minimizes disruption to building occupants during installation.' },
      { question: 'Do you handle FTTH for residential townships?', answer: 'Absolutely. We have deployed FTTH networks in multiple residential townships with 500-5000+ homes. We handle everything from trunk fiber to last-mile drop cables and ONT installation at each home.' },
      { question: 'What happens if a fiber cable is damaged?', answer: 'We provide emergency fiber repair services with 2-4 hour response times. Our technicians carry portable OTDR equipment and splicing machines to locate and repair fiber faults on-site.' },
    ]}
  />
);

export default FiberOpticCabling;
