import { Network, Search, PenTool, Wrench, TestTube, ShieldCheck } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

const NetworkSetup = () => (
  <ServicePageLayout
    slug="network-setup"
    title="Network Setup"
    icon={Network}
    subtitle="Enterprise-grade structured cabling, LAN/WAN design, and network infrastructure setup. We build reliable, scalable networks that power your business operations."
    description={
      <>
        <p>A well-designed network is essential for business productivity. Marco India delivers end-to-end network infrastructure solutions — from structured cabling (Cat5e, Cat6, Cat6A) and rack installations to switch configuration, Wi-Fi deployment, and network security setup.</p>
        <p>We follow TIA/EIA standards for all structured cabling installations and provide comprehensive testing and certification for every cable run.</p>
      </>
    }
    features={[
      'Structured cabling — Cat5e, Cat6, Cat6A installation',
      'Server room and data center rack setup',
      'LAN/WAN design and implementation',
      'Enterprise Wi-Fi access point deployment',
      'Network switch and router configuration',
      'Cable testing and TIA/EIA certification',
      'Network security — firewall and VLAN setup',
    ]}
    applications={[
      'Corporate Offices', 'Data Centers', 'Call Centers', 'Educational Institutions',
      'Hospitals', 'Hotels & Hospitality', 'Government Offices', 'Co-working Spaces',
    ]}
    stats={[
      { value: 300, suffix: '+', label: 'Offices Networked' },
      { value: 100, suffix: '%', label: 'TIA/EIA Certified' },
      { value: 10, suffix: ' Gbps', label: 'Max Throughput' },
      { value: 50, suffix: '+', label: 'Enterprise Wi-Fi Sites' },
    ]}
    process={[
      { icon: Search, title: 'Network Assessment', description: 'We audit your current infrastructure, assess bandwidth needs, user density, and plan for future scalability.' },
      { icon: PenTool, title: 'Architecture Design', description: 'Detailed network topology design including cable routes, rack layouts, VLAN segmentation, and equipment selection.' },
      { icon: Wrench, title: 'Cabling & Setup', description: 'Structured cabling installation, rack mounting, patch panel termination, switch/router configuration, and Wi-Fi AP deployment.' },
      { icon: TestTube, title: 'Testing & Certification', description: 'Every cable run is tested with Fluke testers for continuity, length, crosstalk, and performance. Full TIA/EIA certification provided.' },
      { icon: ShieldCheck, title: 'Documentation & Handover', description: 'Complete as-built documentation with cable schedules, port maps, network diagrams, and admin credentials.' },
    ]}
    faqs={[
      { question: 'What cabling standard do you recommend — Cat6 or Cat6A?', answer: 'For most offices, Cat6 supports up to 10 Gbps over 55m and is cost-effective. For data centers, hospitals, and future-proofing, we recommend Cat6A which supports 10 Gbps over full 100m runs with better shielding against interference.' },
      { question: 'Can you set up a server room from scratch?', answer: 'Yes. We design and build complete server rooms including rack installation, structured cabling, power distribution (PDU), UPS integration, precision cooling assessment, cable management, and access control.' },
      { question: 'Do you configure network security?', answer: 'Absolutely. We set up firewalls, VLANs, access control lists (ACLs), VPN connections, and port security. We can also deploy network monitoring tools for ongoing visibility into your network performance and threats.' },
      { question: 'How many Wi-Fi access points do I need?', answer: 'It depends on coverage area, user density, and building construction. A typical corporate office needs 1 AP per 1,500-2,500 sq ft. We conduct a wireless site survey to determine optimal AP placement for seamless roaming coverage.' },
      { question: 'Do you support multi-site WAN connectivity?', answer: 'Yes. We design and implement WAN solutions including MPLS, SD-WAN, and site-to-site VPN configurations to connect your branch offices with secure, high-performance links.' },
    ]}
  />
);

export default NetworkSetup;
