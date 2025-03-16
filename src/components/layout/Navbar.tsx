
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
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
    
    if (href === '#') {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
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
