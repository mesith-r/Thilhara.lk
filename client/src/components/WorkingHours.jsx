import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const schedule = [
  { day: "Monday", hours: "09:00 AM - 06:00 PM", dayIndex: 1 },
  { day: "Tuesday", hours: "09:00 AM - 06:00 PM", dayIndex: 2 },
  { day: "Wednesday", hours: "09:00 AM - 06:00 PM", dayIndex: 3 },
  { day: "Thursday", hours: "09:00 AM - 06:00 PM", dayIndex: 4 },
  { day: "Friday", hours: "09:00 AM - 06:00 PM", dayIndex: 5 },
  { day: "Saturday", hours: "09:00 AM - 03:00 PM", dayIndex: 6 },
  { day: "Sunday", hours: "Emergency Callout Only", dayIndex: 0 }
];

export default function WorkingHours() {
  const [currentDay, setCurrentDay] = useState(1);
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const slDate = new Date(utc + (3600000 * 5.5)); // Sri Lanka Time
    const day = slDate.getDay();
    const hour = slDate.getHours();

    setCurrentDay(day);

    if (day >= 1 && day <= 5) {
      setIsCurrentlyOpen(hour >= 9 && hour < 18);
    } else if (day === 6) {
      setIsCurrentlyOpen(hour >= 9 && hour < 15);
    } else {
      setIsCurrentlyOpen(false);
    }
  }, []);

  return (
    <section id="hours" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '4rem',
          alignItems: 'center'
        }} className="hours-grid">

          {/* Left Column: Context & Address */}
          <div>
            <span className="badge" style={{ marginBottom: '1rem' }}>
              <Clock size={14} />
              Flexible Support Hours
            </span>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Always Ready To Support Your <br />
              <span className="gradient-text">Cold Chain Operations</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              We understand that cooling reliability is paramount for hospitals, supermarkets, cold stores, and food factories. That’s why Thilhara provides extended warehouse access, prompt Saturday dispatches, and emergency assistance.
            </p>

            {/* Location & Hotlines Card */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(0, 210, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  flexShrink: 0
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <strong style={{ color: '#fff', fontSize: '1rem' }}>Colombo Central Headquarters</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    84, Union Place, Colombo 02, Sri Lanka
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(0, 245, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-teal)',
                  flexShrink: 0
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <strong style={{ color: '#fff', fontSize: '1rem' }}>Direct Dispatch Lines</strong>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                    <a href="tel:+94112314355" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem' }}>
                      +94 11 2314355
                    </a>
                    <span style={{ color: 'var(--text-subtle)' }}>|</span>
                    <a href="tel:+94112304419" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem' }}>
                      +94 11 2304419
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Schedule Table */}
          <div>
            <div className="glass-card" style={{
              border: isCurrentlyOpen ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-light)',
              boxShadow: isCurrentlyOpen ? '0 0 30px rgba(16, 185, 129, 0.15)' : 'var(--shadow-md)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} color="var(--accent-cyan)" />
                  <h3 style={{ fontSize: '1.25rem' }}>Operating Hours</h3>
                </div>

                <span className={`badge ${isCurrentlyOpen ? 'badge-live' : ''}`} style={{
                  background: isCurrentlyOpen ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  borderColor: isCurrentlyOpen ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)',
                  color: isCurrentlyOpen ? '#34d399' : '#fbbf24'
                }}>
                  <span className="pulse-dot"></span>
                  {isCurrentlyOpen ? 'Currently Open' : 'Closed for the Day'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {schedule.map((item) => {
                  const isToday = item.dayIndex === currentDay;
                  return (
                    <div
                      key={item.day}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isToday ? 'rgba(0, 210, 255, 0.12)' : 'transparent',
                        border: isToday ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid transparent'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isToday && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />}
                        <span style={{
                          fontWeight: isToday ? 700 : 500,
                          color: isToday ? '#ffffff' : 'var(--text-muted)'
                        }}>
                          {item.day} {isToday && '(Today)'}
                        </span>
                      </div>

                      <span style={{
                        fontWeight: 600,
                        color: item.day === 'Sunday' ? 'var(--text-subtle)' : isToday ? 'var(--accent-cyan)' : '#ffffff'
                      }}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-light)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textAlign: 'center'
              }}>
                Sri Lanka Standard Time (UTC +05:30) • 24/7 Breakdown Hotline for AMC Contract Clients
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hours-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
