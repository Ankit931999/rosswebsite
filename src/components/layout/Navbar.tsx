import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Globe, Cloud, Shield, Database, Code, BarChart, Monitor, Server, Smartphone, Brain } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const serviceItems = [
  {
    title: 'Digital Transformation',
    description: 'Reimagine your business models and processes for the digital age.',
    icon: <Globe size={18} />,
    id: 'digital-transformation'
  },
  {
    title: 'Artificial Intelligence',
    description: 'Implement AI solutions to automate processes and gain competitive advantages.',
    icon: <Brain size={18} />,
    id: 'artificial-intelligence'
  },
  {
    title: 'Cloud Services',
    description: 'Accelerate innovation with secure, scalable cloud solutions.',
    icon: <Cloud size={18} />,
    id: 'cloud-services'
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your assets with our advanced security framework.',
    icon: <Shield size={18} />,
    id: 'cybersecurity'
  },
  {
    title: 'Data Analytics',
    description: 'Transform data into actionable insights for your business.',
    icon: <Database size={18} />,
    id: 'data-analytics'
  },
  {
    title: 'Application Development',
    description: 'Custom solutions built for your unique business needs.',
    icon: <Code size={18} />,
    id: 'application-development'
  },
  {
    title: 'Business Intelligence',
    description: 'Make data-driven decisions with our BI solutions.',
    icon: <BarChart size={18} />,
    id: 'business-intelligence'
  },
  {
    title: 'CRM Services',
    description: 'Streamline customer relationships and improve sales processes.',
    icon: <Monitor size={18} />,
    id: 'crm-services'
  },
  {
    title: 'Web Services',
    description: 'Dynamic, responsive web solutions for your online presence.',
    icon: <Server size={18} />,
    id: 'web-services'
  },
  {
    title: 'Software Solutions',
    description: 'Tailored software solutions that drive business efficiency.',
    icon: <Smartphone size={18} />,
    id: 'software-solutions'
  },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);
    
    const isHomePage = location.pathname === '/';
    const isServicePage = location.pathname.includes('/services/');
    
    if (href === '#') {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (href === '#contact') {
      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (isServicePage) {
        // If on a service page, scroll to the service consultation form
        const consultationForm = document.querySelector('#service-consultation-form');
        if (consultationForm) {
          consultationForm.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/#contact');
      }
    } else {
      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
      }
    }
  };

  const handleServiceNavigation = (serviceId: string) => {
    if (isOpen) setIsOpen(false);
    navigate(`/services/${serviceId}`);
  };

  const handleServicesSection = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);
    
    if (location.pathname === '/') {
      const element = document.querySelector('#services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#services');
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2" onClick={(e) => handleNavigation(e, '#')}>
              <span className="font-bold text-xl sm:text-2xl text-brand-900">ROSS<span className="text-brand-500">.</span></span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-brand-700 hover:text-brand-500 transition-colors"
                onClick={(e) => handleNavigation(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-brand-700 hover:text-brand-500 transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent p-0">Services</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white/95 backdrop-blur-md">
                    <div className="grid grid-cols-2 gap-3 p-4 w-[500px]">
                      {serviceItems.map((service) => (
                        <NavigationMenuLink 
                          key={service.id}
                          asChild
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-brand-50 transition-colors"
                          onClick={() => handleServiceNavigation(service.id)}
                        >
                          <a href={`/services/${service.id}`}>
                            <div className="flex items-center gap-2">
                              <div className="text-brand-500">
                                {service.icon}
                              </div>
                              <span className="text-sm font-medium text-brand-900">{service.title}</span>
                            </div>
                            <p className="line-clamp-2 text-xs text-brand-700">
                              {service.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="bg-brand-50 p-3">
                      <a
                        href="#services"
                        onClick={handleServicesSection}
                        className="block text-center text-sm font-medium text-brand-700 hover:text-brand-500 transition-colors"
                      >
                        View All Services
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button onClick={() => {
              if (location.pathname === '/') {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('/#contact');
              }
            }}>
              Get Started
            </Button>
          </nav>

          <button
            id="menu-button"
            className="md:hidden text-brand-700 hover:text-brand-500 transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'absolute top-full left-0 w-full bg-white md:hidden overflow-hidden transition-all duration-300 ease-in-out shadow-md',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-brand-700 hover:text-brand-500 transition-colors py-2"
                onClick={(e) => handleNavigation(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="py-2">
              <div 
                className="text-sm font-medium text-brand-700 hover:text-brand-500 transition-colors py-2 cursor-pointer"
                onClick={handleServicesSection}
              >
                Services
              </div>
              <div className="pl-4 mt-2 space-y-2 border-l border-brand-100">
                {serviceItems.map((service) => (
                  <a
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="text-sm text-brand-700 hover:text-brand-500 transition-colors py-1 flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleServiceNavigation(service.id);
                    }}
                  >
                    <span className="text-brand-500">{service.icon}</span>
                    {service.title}
                  </a>
                ))}
              </div>
            </div>
            
            <Button onClick={() => {
              setIsOpen(false);
              if (location.pathname === '/') {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('/#contact');
              }
            }}>
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
