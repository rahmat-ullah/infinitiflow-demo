import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Integrations from './components/Integrations';
import CTASection from './components/CTASection';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import AdminPanel from './components/admin/AdminPanel';
import FeaturesPage from './components/FeaturesPage';
import TestimonialsPage from './components/TestimonialsPage';
import ROICalculatorPage from './components/ROICalculatorPage';
import { useAdminStore } from './store/adminStore';

function App() {
  const { isAdminMode } = useAdminStore();
  const [showFeaturesPage, setShowFeaturesPage] = useState(false);
  const [showTestimonialsPage, setShowTestimonialsPage] = useState(false);
  const [showROICalculatorPage, setShowROICalculatorPage] = useState(false);

  if (isAdminMode) {
    return <AdminPanel />;
  }

  if (showFeaturesPage) {
    return (
      <FeaturesPage 
        onBackToHome={() => setShowFeaturesPage(false)} 
      />
    );
  }

  if (showTestimonialsPage) {
    return (
      <TestimonialsPage 
        onBackToHome={() => setShowTestimonialsPage(false)} 
      />
    );
  }

  if (showROICalculatorPage) {
    return (
      <ROICalculatorPage 
        onBackToHome={() => setShowROICalculatorPage(false)} 
      />
    );
  }

  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Header onROICalculatorClick={() => setShowROICalculatorPage(true)} />
      <Hero />
      <Features onViewAllFeatures={() => setShowFeaturesPage(true)} />
      <Stats />
      <Testimonials onViewAllTestimonials={() => setShowTestimonialsPage(true)} />
      <Integrations />
      <CTASection />
      <Pricing />
      <FAQ />
      <Newsletter />
      <Footer />
      <FloatingActionButton />
    </div>
  );
}

export default App;