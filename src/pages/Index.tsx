
import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import { initializeAnimations } from '@/utils/animations';

const Index = () => {
  useEffect(() => {
    // Initialize animations when the component mounts
    const cleanup = initializeAnimations();
    
    // Clean up animations when the component unmounts
    return cleanup;
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
