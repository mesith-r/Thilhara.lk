import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
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

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#ffffff' }}>
        {/* Subtle Ambient Background Orbs */}
        <div className="bg-ambient-layer">
          <div className="ambient-orb orb-1" />
          <div className="ambient-orb orb-2" />
          <div className="ambient-orb orb-3" />
        </div>

        {/* Global Navigation Bar */}
        <Navbar
          onOpenQuote={() => handleOpenQuote()}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Routes */}
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenQuote={handleOpenQuote} />}
            />
            <Route
              path="/products"
              element={<ProductsPage onOpenQuote={handleOpenQuote} />}
            />
          </Routes>
        </main>

        {/* Global Engineering Quote Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => {
            setIsQuoteModalOpen(false);
            setSelectedProductForQuote(null);
          }}
          preselectedProduct={selectedProductForQuote}
        />

        {/* Global Footer */}
        <Footer
          onOpenQuote={() => handleOpenQuote()}
          setActiveSection={setActiveSection}
        />
      </div>
    </Router>
  );
}
