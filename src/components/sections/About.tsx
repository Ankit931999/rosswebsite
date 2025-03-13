
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const About: React.FC = () => {
  const keyPoints = [
    'Global technology services partner with 25+ years experience',
    'Serving 1000+ clients across 50+ countries',
    'Industry-leading expertise across various domains',
    'Cutting-edge research and innovation labs',
    'Commitment to sustainability and social responsibility',
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding bg-brand-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="animate-on-scroll">
              <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 leading-tight">
                Driving Business Transformation Through Technology
              </h2>
              <p className="text-brand-700 mb-6">
                At ROSS, we are a global technology services company with a mission to help businesses thrive in the digital economy. With a blend of strategy, technology, and design, we deliver impactful solutions that drive growth and efficiency.
              </p>
              
              <ul className="space-y-3 mb-8">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start staggered-item">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span className="text-brand-700">{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection('#testimonials')}>Learn Our Story</Button>
                <Button variant="outline" onClick={() => scrollToSection('#services')}>Meet Our Team</Button>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 animate-on-scroll">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-400/20 blur-xl rounded-full transform -translate-x-4 translate-y-4"></div>
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Our team collaborating" 
                  className="w-full h-full object-cover image-fade-in"
                />
              </div>
              <div className="glass-card absolute -bottom-6 -right-6 md:bottom-6 md:right-6 z-20 p-6 rounded-xl max-w-xs">
                <div className="text-4xl font-bold text-brand-900 mb-2">25+</div>
                <p className="text-brand-700">Years of excellence in delivering technology solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
