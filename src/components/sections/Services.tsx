
import React from 'react';
import { Globe, Cloud, Shield, Database, Code, BarChart, Monitor, Server, Smartphone, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  onLearnMore: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay = 0, onLearnMore }) => (
  <div 
    className="staggered-item glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-100 text-brand-500 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-brand-900 mb-2">{title}</h3>
    <p className="text-brand-700 mb-4">{description}</p>
    <Button 
      variant="link" 
      className="p-0 h-auto text-brand-500 hover:text-brand-600 group"
      onClick={onLearnMore}
    >
      Learn More
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-1 transition-transform group-hover:translate-x-1"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Button>
  </div>
);

export const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Digital Transformation',
      description: 'Reimagine your business models and processes for the digital age.',
      icon: <Globe size={24} />,
      id: 'digital-transformation'
    },
    {
      title: 'Artificial Intelligence',
      description: 'Implement AI solutions to automate processes and gain competitive advantages.',
      icon: <Brain size={24} />,
      id: 'artificial-intelligence'
    },
    {
      title: 'Cloud Services',
      description: 'Accelerate innovation with secure, scalable cloud solutions.',
      icon: <Cloud size={24} />,
      id: 'cloud-services'
    },
    {
      title: 'Cybersecurity',
      description: 'Protect your assets with our advanced security framework.',
      icon: <Shield size={24} />,
      id: 'cybersecurity'
    },
    {
      title: 'Data Analytics',
      description: 'Transform data into actionable insights for your business.',
      icon: <Database size={24} />,
      id: 'data-analytics'
    },
    {
      title: 'Application Development',
      description: 'Custom solutions built for your unique business needs.',
      icon: <Code size={24} />,
      id: 'application-development'
    },
    {
      title: 'Business Intelligence',
      description: 'Make data-driven decisions with our BI solutions.',
      icon: <BarChart size={24} />,
      id: 'business-intelligence'
    },
    {
      title: 'CRM Services',
      description: 'Streamline customer relationships and improve sales processes.',
      icon: <Monitor size={24} />,
      id: 'crm-services'
    },
    {
      title: 'Web Services',
      description: 'Dynamic, responsive web solutions for your online presence.',
      icon: <Server size={24} />,
      id: 'web-services'
    },
    {
      title: 'Software Solutions',
      description: 'Tailored software solutions that drive business efficiency.',
      icon: <Smartphone size={24} />,
      id: 'software-solutions'
    },
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-brand-700">
            We provide end-to-end services to transform your business with cutting-edge technology and industry expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 100}
              onLearnMore={() => navigate(`/services/${service.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
