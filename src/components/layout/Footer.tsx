
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col space-y-4">
    <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
    {children}
  </div>
);

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (sectionId: string) => {
    const isHomePage = location.pathname === '/';
    
    if (isHomePage) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + sectionId);
    }
  };

  return (
    <footer className="bg-brand-50 border-t border-brand-100">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col space-y-4">
            <a 
              href="#" 
              className="inline-block" 
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/');
                }
              }}
            >
              <span className="font-bold text-xl text-brand-900">ROSS<span className="text-brand-500">.</span></span>
            </a>
            <p className="text-brand-700 max-w-xs">
              Delivering innovative business solutions with cutting-edge technology, empowering global enterprises to thrive in the digital era.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-brand-600 hover:text-brand-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-brand-600 hover:text-brand-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-brand-600 hover:text-brand-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-brand-600 hover:text-brand-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <FooterSection title="Services">
            <ul className="space-y-3">
              {[
                'Digital Transformation', 
                'Artificial Intelligence', 
                'Cloud Services', 
                'Cybersecurity', 
                'Data Analytics',
                'Application Development',
                'Business Intelligence',
                'CRM Services',
                'Web Services',
                'Software Solutions'
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="text-brand-700 hover:text-brand-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('#services');
                    }}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Company">
            <ul className="space-y-3">
              {[
                { name: 'About Us', section: '#about' },
                { name: 'Leadership', section: '#about' },
                { name: 'Careers', section: '#services' },
                { name: 'News & Events', section: '#services' },
                { name: 'Investors', section: '#about' },
                { name: 'Sustainability', section: '#about' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.section} 
                    className="text-brand-700 hover:text-brand-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.section);
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Subscribe">
            <p className="text-brand-700">
              Stay updated with our latest news and announcements.
            </p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
              <button className="bg-brand-500 text-white p-2 rounded-r-md hover:bg-brand-600 transition-colors">
                <Send size={20} />
              </button>
            </div>
          </FooterSection>
        </div>

        <div className="border-t border-brand-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-brand-700 text-sm">
            © {new Date().getFullYear()} ROSS. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-brand-700 hover:text-brand-500 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-brand-700 hover:text-brand-500 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-brand-700 hover:text-brand-500 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
