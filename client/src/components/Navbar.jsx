import React, { useState, useEffect } from 'react';
import { Snowflake, Phone, Menu, X, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenQuote, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if open in Colombo (UTC+5:30)
    const checkOpenStatus = () => {
      const now = new Date();
      // UTC time + 5.5 hours for Sri Lanka Time
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const slDate = new Date(utc + (3600000 * 5.5));
      const day = slDate.getDay(); // 0 is Sunday
      const hour = slDate.getHours();

      if (day >= 1 && day <= 5) {
        // Mon-Fri: 9am - 6pm (18:00)
        setIsOpenNow(hour >= 9 && hour < 18);
      } else if (day === 6) {
        // Sat: 9am - 3pm (15:00)
        setIsOpenNow(hour >= 9 && hour < 15);
      } else {
        // Sun closed
        setIsOpenNow(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Products & Spares', id: 'products' },
    { label: 'Services & Support', id: 'services' },
    { label: 'Why Choose Us', id: 'about' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Working Hours', id: 'hours' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div style={{
        background: 'linear-gradient(90deg, #070d19, #0f223d, #070d19)',
        borderBottom: '1px solid var(--border-light)',
        padding: '0.45rem 1rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#fff' }}>
              <ShieldCheck size={14} color="#00d2ff" />
              Sri Lanka's Pioneer Cooling Partner Since 1998
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} color={isOpenNow ? '#10b981' : '#f59e0b'} />
              <span>Colombo Office: </span>
              <strong style={{ color: isOpenNow ? '#34d399' : '#f59e0b' }}>
                {isOpenNow ? 'Open Now (09:00 - 18:00)' : 'Closed Now (Opens 09:00 AM)'}
              </strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a href="tel:+94112314355" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#00d2ff', fontWeight: 600 }}>
              <Phone size={13} />
              +94 11 2314355
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="navbar-header" style={{
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
      }}>
        <div className="container navbar-container">
          {/* Logo */}
          <a href="#home" onClick={() => scrollTo('home')} className="brand-logo">
            <div className="brand-logo-icon">
              <Snowflake size={24} color="#ffffff" />
            </div>
            <div>
              <div className="brand-title">THILHARA</div>
              <div className="brand-subtitle">Cooling Solutions & Spares</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onOpenQuote}
              className="btn-primary btn-sm"
              style={{ padding: '0.65rem 1.25rem' }}
            >
              <span>Get a Quote</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                color: '#fff',
                border: '1px solid var(--border-light)',
                borderRadius: '8px'
              }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: '#0d172a',
            borderBottom: '1px solid var(--border-active)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  textAlign: 'left',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: activeSection === item.id ? 'var(--accent-cyan)' : '#cbd5e1',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="btn-primary"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              Request Engineering Quote
            </button>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .mobile-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
