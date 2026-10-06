import React from 'react';
import { Award, Globe } from 'lucide-react';

const partners = [
  { name: "LG Electronics", country: "South Korea", desc: "Inverter Multi-V & Packaged Chillers" },
  { name: "Copeland", country: "USA", desc: "Scroll & Hermetic Compressors" },
  { name: "Honeywell", country: "USA", desc: "Refrigerant Valves & Climate Controls" },
  { name: "Refco Swiss", country: "Switzerland", desc: "Precision HVAC Vacuum & Diagnostics" },
  { name: "Embraco", country: "Brazil / Global", desc: "Hermetic Commercial Refrigeration Units" },
  { name: "Eliwell", country: "Italy", desc: "Cold Room Microprocessor Controllers" },
  { name: "Royal Cool", country: "Global", desc: "Commercial Hardware & Insulated Doors" },
  { name: "Ashida", country: "Japan", desc: "Heavy Duty Industrial Components" }
];

export default function PartnersMarquee() {
  return (
    <section className="section" style={{
      padding: '4.5rem 0',
      background: '#ffffff',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>
            <Globe size={14} />
            Strategic Alliances
          </span>
          <h3 style={{ fontSize: '1.9rem', color: 'var(--text-main)', fontWeight: 800 }}>
            Authorized Direct Distribution For World Leaders
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Direct partnerships delivering genuine, factory-tested cooling technology to the Sri Lankan market.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="white-card"
              style={{
                padding: '1.5rem 1.25rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ffffff',
                border: '1.5px solid var(--border-light)'
              }}
            >
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--primary-blue)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '0.25rem',
                letterSpacing: '-0.02em'
              }}>
                {p.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-red)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                {p.country}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
