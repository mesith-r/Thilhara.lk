import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const schedule = [
  { day: "Monday", hours: "09:00 AM - 06:00 PM", dayIndex: 1 },
  { day: "Tuesday", hours: "09:00 AM - 06:00 PM", dayIndex: 2 },
  { day: "Wednesday", hours: "09:00 AM - 06:00 PM", dayIndex: 3 },
  { day: "Thursday", hours: "09:00 AM - 06:00 PM", dayIndex: 4 },
  { day: "Friday", hours: "09:00 AM - 06:00 PM", dayIndex: 5 },
  { day: "Saturday", hours: "09:00 AM - 03:00 PM", dayIndex: 6 },
  { day: "Sunday", hours: "Closed (Emergency Callouts)", dayIndex: 0 }
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
    <section id="hours" className="section" style={{ background: '#ffffff' }}>
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
              Flexible Working Hours
            </span>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              THILHARA <br />
              <span style={{ color: 'var(--primary-blue)' }}>FLEXIBLE HOURS</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.75, marginBottom: '2rem' }}>
              As a company, we prioritize customer convenience and satisfaction through flexible hours of operation. We understand that your comfort is paramount, which is why we offer extended service hours, including evenings and weekends. Our commitment to meeting your air conditioning needs sets us apart.
            </p>

            {/* Location & Hotlines Card */}
            <div className="white-card" style={{ padding: '1.75rem', marginBottom: '1.5rem', border: '1.5px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--primary-blue-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-blue)',
                  flexShrink: 0
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>Colombo Central Showroom</strong>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    84, Union Place, Colombo 02, Sri Lanka.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--primary-red-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-red)',
                  flexShrink: 0
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>Direct Dispatch Lines</strong>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                    <a href="tel:+94112314355" style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.95rem' }}>
                      +94 11 2314355
                    </a>
                    <span style={{ color: 'var(--text-subtle)' }}>|</span>
                    <a href="tel:+94112304419" style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.95rem' }}>
                      +94 11 2304419
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Schedule Table */}
          <div>
            <div className="white-card" style={{
              border: isCurrentlyOpen ? '2px solid rgba(5, 150, 105, 0.4)' : '1.5px solid var(--border-light)',
              boxShadow: 'var(--shadow-xl)',
              background: '#ffffff'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1.25rem',
                borderBottom: '1.5px solid var(--border-light)',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={20} color="var(--primary-blue)" />
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>Operating Hours</h3>
                </div>

                <span className={`badge ${isCurrentlyOpen ? 'badge-live' : ''}`} style={{
                  background: isCurrentlyOpen ? '#ecfdf5' : '#fef3c7',
                  borderColor: isCurrentlyOpen ? '#a7f3d0' : '#fde68a',
                  color: isCurrentlyOpen ? '#059669' : '#d97706'
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
                        background: isToday ? 'var(--primary-blue-light)' : '#ffffff',
                        border: isToday ? '1.5px solid rgba(63, 64, 150, 0.3)' : '1px solid transparent'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isToday && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-blue)' }} />}
                        <span style={{
                          fontWeight: isToday ? 800 : 600,
                          color: isToday ? 'var(--primary-blue)' : 'var(--text-body)'
                        }}>
                          {item.day} {isToday && '(Today)'}
                        </span>
                      </div>

                      <span style={{
                        fontWeight: isToday ? 800 : 600,
                        color: item.day === 'Sunday' ? 'var(--text-muted)' : isToday ? 'var(--primary-blue)' : 'var(--text-main)'
                      }}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-light)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                textAlign: 'center'
              }}>
                Sri Lanka Standard Time (UTC +05:30) • 24/7 Hotline for Emergency Technical Repairs
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
