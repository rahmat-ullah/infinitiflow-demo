import React, { useState, useEffect } from 'react';
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
import LoginPage from './components/auth/LoginPage'; // Added import
import FeaturesPage from './components/FeaturesPage';
import TestimonialsPage from './components/TestimonialsPage';
import ROICalculatorPage from './components/ROICalculatorPage';
import UseCasesPage from './components/UseCasesPage';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import { useAdminStore } from './store/adminStore';
import { useThemeStore } from './store/themeStore';

function App() {
  useEffect(() => {
    useThemeStore.getState().initTheme();
  }, []);

  const { isAdminMode } = useAdminStore();
  const [showLoginPage, setShowLoginPage] = useState(false); // Added state
  const [showFeaturesPage, setShowFeaturesPage] = useState(false);
  const [showTestimonialsPage, setShowTestimonialsPage] = useState(false);
  const [showROICalculatorPage, setShowROICalculatorPage] = useState(false);
  const [showUseCasesPage, setShowUseCasesPage] = useState(false);
  const [showBlogPage, setShowBlogPage] = useState(false);
  const [blogSlug, setBlogSlug] = useState<string | null>(null);

  // Handle login success
  const handleLoginSuccess = () => {
    useAdminStore.getState().setAdminMode(true);
    setShowLoginPage(false);
  };

  const handleBlogNavigation = (slug?: string) => {
    setBlogSlug(slug || null);
    setShowBlogPage(true);
  };

  const handleBackToBlogList = () => {
    setBlogSlug(null);
    // Stay on blog page but show list
  };

  if (isAdminMode) {
    return <AdminPanel />;
  }

  if (showLoginPage) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
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

  if (showUseCasesPage) {
    return (
      <UseCasesPage 
        onBackToHome={() => setShowUseCasesPage(false)} 
      />
    );
  }

  if (showBlogPage) {
    if (blogSlug) {
      return (
        <BlogDetail 
          slug={blogSlug}
          onBackToBlogList={handleBackToBlogList}
          onBackToHome={() => setShowBlogPage(false)}
        />
      );
    }
    return (
      <BlogList 
        onBlogClick={handleBlogNavigation}
        onBackToHome={() => setShowBlogPage(false)}
      />
    );
  }

  return (
    <div className="font-sans antialiased">
      <Header 
        onROICalculatorClick={() => setShowROICalculatorPage(true)}
        onUseCasesClick={() => setShowUseCasesPage(true)}
        onBlogClick={() => setShowBlogPage(true)}
        // This is a way to trigger the login page.
        // The Header component would need to be modified to actually use this prop.
        // For now, we are just passing it as per the conceptual snippet.
        onLoginClick={() => setShowLoginPage(true)} 
      />
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