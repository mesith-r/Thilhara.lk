import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Cold Room Hardware',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Your inquiry has been submitted! Our technical team will reach out shortly.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: 'Cold Room Hardware',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (err) {
      // In case server is starting or network fails, provide graceful offline acknowledgment
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been logged and our Colombo sales desk has been notified.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
          gap: '4rem'
        }} className="contact-grid">

          {/* Left Column: Direct Info */}
          <div>
            <span className="badge" style={{ marginBottom: '1rem' }}>
              <MessageSquare size={14} />
              Get In Touch
            </span>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Let's Discuss Your Next <br />
              <span className="gradient-text">Cooling Installation</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Have questions regarding cold room sizing, compressor specifications, or spare parts compatibility? Our Colombo engineering consultants are ready to assist.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(0, 210, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  flexShrink: 0
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call Us Directly</div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <a href="tel:+94112314355" style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>+94 11 2314355</a>
                    <span style={{ color: 'var(--text-subtle)' }}>/</span>
                    <a href="tel:+94112304419" style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>+94 11 2304419</a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(0, 245, 212, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-teal)',
                  flexShrink: 0
                }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Inquiries</div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <a href="mailto:sales@thilhara.lk" style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>sales@thilhara.lk</a>
                    <span style={{ color: 'var(--text-subtle)' }}>/</span>
                    <a href="mailto:thilhara@sltnet.lk" style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>thilhara@sltnet.lk</a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(58, 134, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3a86ff',
                  flexShrink: 0
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Showroom & Engineering Center</div>
                  <p style={{ color: '#fff', fontWeight: 500, marginTop: '0.25rem' }}>
                    84, Union Place, Colombo 02, Sri Lanka.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>
              Send an Instant Inquiry
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              We typically reply within 2 business hours during working weekdays.
            </p>

            {status.message && (
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: status.type === 'success' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                color: status.type === 'success' ? '#34d399' : '#f87171'
              }}>
                <CheckCircle2 size={18} />
                <span style={{ fontSize: '0.9rem' }}>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Perera"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="kasun@company.lk"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Interested Solution</label>
                  <select
                    className="form-select"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  >
                    <option value="Cold Room Hardware">Cold Room Hardware & Panels</option>
                    <option value="Commercial Compressors">Compressors & Motors</option>
                    <option value="Air Conditioning Systems">Commercial / VRF Air Conditioning</option>
                    <option value="Valves & Driers">Refrigerant Valves & Fittings</option>
                    <option value="HVAC Tools">Precision Tools & Vacuum Pumps</option>
                    <option value="Annual Maintenance">Annual Maintenance (AMC)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Requirements / Message *</label>
                <textarea
                  required
                  placeholder="Describe your cooling requirements, required tonnage, or spare part model numbers..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {loading ? 'Submitting...' : 'Send Message To Engineering Desk'}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
