import React from 'react';
import { Award, Globe } from 'lucide-react';

const partners = [
  { name: "LG Electronics", country: "South Korea", desc: "Inverter Multi-V & Packaged Chillers" },
  { name: "Copeland", country: "USA", desc: "Scroll & Hermetic Compressors" },
  { name: "Honeywell", country: "USA", desc: "Refrigerant Valves & Climate Automations" },
  { name: "Refco Swiss", country: "Switzerland", desc: "Precision HVAC Vacuum & Diagnostics" },
  { name: "Embraco", country: "Brazil / Global", desc: "Hermetic Commercial Refrigeration Units" },
  { name: "Eliwell", country: "Italy", desc: "Cold Room Microprocessor Controllers" },
  { name: "Royal Cool", country: "Global", desc: "Commercial Hardware & Insulated Doors" },
  { name: "Ashida", country: "Japan", desc: "Heavy Duty Industrial Components" }
];

export default function PartnersMarquee() {
  return (
    <section className="section" style={{
      padding: '4rem 0',
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge" style={{ marginBottom: '0.75rem' }}>
            <Globe size={14} />
            Strategic Alliances
          </span>
          <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>
            Authorized Direct Distribution For World Leaders
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            We bring genuine international cooling technology directly to the Sri Lankan industry.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.25rem 1rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(19, 34, 56, 0.5)'
              }}
            >
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                marginBottom: '0.25rem',
                letterSpacing: '-0.02em'
              }}>
                {p.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                {p.country}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
