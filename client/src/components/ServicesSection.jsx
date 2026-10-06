import React from 'react';
import { Wrench, ShieldAlert, Cpu, CheckSquare2, LifeBuoy, ArrowRight, Gauge } from 'lucide-react';

const services = [
  {
    icon: SnowflakeIcon,
    title: "Cold Room & Chillers Installation",
    desc: "Complete design, thermodynamic load calculations, insulated polyurethane sandwich panels, air-cooled condensing units, and smart defrost controllers.",
    capabilities: ["Walk-in Chillers & Freezers", "Blast Freezers (-40°C)", "Food Processing Storage Facilities"]
  },
  {
    icon: Gauge,
    title: "Commercial VRF & Inverter HVAC",
    desc: "Energy-efficient multi-split and VRF installations for hotels, corporate towers, and manufacturing campuses with centralized BMS climate automation.",
    capabilities: ["Variable Refrigerant Flow", "Smart BMS Interfacing", "Ductable Packaged Units"]
  },
  {
    icon: Wrench,
    title: "Preventative Maintenance & AMC",
    desc: "Scheduled maintenance programs that maximize thermodynamic heat exchange efficiency, eliminate refrigerant leaks, and lower utility bills.",
    capabilities: ["Scheduled Coil Chemical Cleaning", "Compressor Oil & Acid Testing", "Micro-leak Sniffer Scans"]
  },
  {
    icon: LifeBuoy,
    title: "Rapid Spare Part Replacement",
    desc: "Over 5,000+ SKU inventory stocked in Colombo warehouse with same-day emergency dispatch for mission-critical cold stores and hospitals.",
    capabilities: ["Direct OEM Swap-outs", "Drop-in Eco Refrigerants", "Expansion Valves & Solenoids"]
  }
];

function SnowflakeIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
    </svg>
  );
}

export default function ServicesSection({ onOpenQuote }) {
  return (
    <section id="services" className="section" style={{ background: '#ffffff' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge">Engineering Services</span>
          <h2 className="section-title">
            Comprehensive Support & <br />
            <span style={{ color: 'var(--primary-blue)' }}>Turnkey Cooling Engineering</span>
          </h2>
          <p className="section-subtitle">
            From initial thermal capacity calculation to post-commissioning service contracts,
            our certified technicians keep your cooling systems running seamlessly.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1.5px solid var(--border-light)' }}>
                <div>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: 'var(--primary-blue-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-blue)',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(63, 64, 150, 0.2)'
                  }}>
                    <Icon size={26} />
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.85rem', color: 'var(--text-main)' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {s.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                    {s.capabilities.map((c, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.88rem', color: 'var(--text-body)', fontWeight: 500 }}>
                        <CheckSquare2 size={16} color="var(--primary-red)" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                  <button
                    onClick={onOpenQuote}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--primary-blue)'
                    }}
                  >
                    <span>Request Engineering Scope</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
