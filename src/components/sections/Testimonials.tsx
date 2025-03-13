
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  quote: string;
  image: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'Global Retail Inc.',
      quote: 'Working with Wipro has transformed our digital infrastructure. Their team delivered exceptional results that exceeded our expectations. The cloud migration was seamless, and we\'ve seen a 40% improvement in system performance.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'David Chen',
      position: 'CIO',
      company: 'FinTech Solutions',
      quote: 'Wipro\'s cybersecurity solutions have strengthened our defenses against evolving threats. Their proactive approach to security has given us confidence in our digital operations and protected our sensitive data.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'VP of Digital',
      company: 'Healthcare Innovations',
      quote: 'The AI and analytics solutions provided by Wipro have revolutionized how we use data. We can now make informed decisions quickly, improving patient outcomes and operational efficiency across our entire organization.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-white to-brand-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-brand-700">
            Discover how our technology solutions have helped organizations overcome challenges and achieve their goals.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-8 md:p-12 animate-on-scroll">
            <div className="text-brand-400 mb-6">
              <Quote size={48} />
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <p className="text-lg text-brand-700 italic mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div>
                  <h4 className="text-xl font-semibold text-brand-900">{testimonials[activeIndex].name}</h4>
                  <p className="text-brand-600">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white border border-brand-200 flex items-center justify-center text-brand-700 hover:bg-brand-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-brand-500 w-6' 
                      : 'bg-brand-200 hover:bg-brand-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white border border-brand-200 flex items-center justify-center text-brand-700 hover:bg-brand-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
