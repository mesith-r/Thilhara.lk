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
    <section id="services" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge">Engineering Services</span>
          <h2 className="section-title">
            Comprehensive Support & <br />
            <span className="gradient-text">Turnkey Cooling Engineering</span>
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
              <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(0, 210, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(0, 210, 255, 0.25)'
                  }}>
                    <Icon size={26} />
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.85rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {s.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {s.capabilities.map((c, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                        <CheckSquare2 size={15} color="#00f5d4" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <button
                    onClick={onOpenQuote}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--accent-cyan)'
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
