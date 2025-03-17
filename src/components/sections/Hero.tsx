
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for hero section
    const element = elementRef.current;
    if (element) {
      setTimeout(() => {
        element.classList.add('opacity-100', 'translate-y-0');
      }, 100);
    }

    // Cleanup function
    return () => {
      if (element) {
        element.classList.remove('opacity-100', 'translate-y-0');
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-50 to-blue-50 z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      {/* Floating Elements in Background */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-200/20 blur-3xl animate-float z-0"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl animate-float z-0" style={{ animationDelay: '2s' }}></div>
      
      <div 
        ref={elementRef} 
        className="container mx-auto px-4 md:px-6 relative z-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800 mb-4">
                Innovative Technology Solutions
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-900 leading-tight">
              Transform Your <span className="text-gradient">Business</span> With Technology
            </h1>
            <p className="text-xl text-brand-700 max-w-xl">
              Partner with us to unlock digital potential and drive innovation across your enterprise with our comprehensive suite of IT solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => scrollToSection('#contact')}
              >
                Get Started 
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('#about')}
              >
                Learn More
              </Button>
            </div>
            <div className="pt-8 flex flex-wrap gap-8">
              <div className="animate-on-scroll">
                <p className="text-3xl font-bold text-brand-900">1000+</p>
                <p className="text-brand-700">Global Clients</p>
              </div>
              <div className="animate-on-scroll" style={{ animationDelay: '200ms' }}>
                <p className="text-3xl font-bold text-brand-900">50+</p>
                <p className="text-brand-700">Countries</p>
              </div>
              <div className="animate-on-scroll" style={{ animationDelay: '400ms' }}>
                <p className="text-3xl font-bold text-brand-900">25+</p>
                <p className="text-brand-700">Years Experience</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-200/30 blur-xl rounded-full transform -translate-x-4 translate-y-4"></div>
              <div className="glass-card relative overflow-hidden rounded-2xl w-full max-w-md aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                  alt="Digital Transformation" 
                  className="w-full h-full object-cover image-fade-in"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
