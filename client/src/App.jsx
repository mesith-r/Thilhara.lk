import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturePillars from './components/FeaturePillars';
import ProductsCatalog from './components/ProductsCatalog';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import WorkingHours from './components/WorkingHours';
import Testimonials from './components/Testimonials';
import PartnersMarquee from './components/PartnersMarquee';
import ContactSection from './components/ContactSection';
import QuoteModal from './components/QuoteModal';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);

  const handleOpenQuote = (product = null) => {
    setSelectedProductForQuote(product);
    setIsQuoteModalOpen(true);
  };

  const handleScrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Dynamic Ambient Background Lights */}
      <div className="bg-ambient-layer">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>

      {/* Navigation Bar */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Section */}
      <Hero
        onOpenQuote={() => handleOpenQuote()}
        onExploreProducts={() => handleScrollToSection('products')}
      />

      {/* Core Engineering Value Pillars */}
      <FeaturePillars />

      {/* Live Products & Accessories Catalog */}
      <ProductsCatalog
        onSelectProductForQuote={(product) => handleOpenQuote(product)}
      />

      {/* Engineering Services & Turnkey Solutions */}
      <ServicesSection
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Why Choose Us (25+ Years Story) */}
      <WhyChooseUs
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Working Hours & Live Colombo Status */}
      <WorkingHours />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Strategic Global Partners */}
      <PartnersMarquee />

      {/* Contact & Inquiries */}
      <ContactSection />

      {/* Engineering Project Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setSelectedProductForQuote(null);
        }}
        preselectedProduct={selectedProductForQuote}
      />

      {/* Footer */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
