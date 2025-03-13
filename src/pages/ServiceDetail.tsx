
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Define service data type
interface ServiceData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  videoUrl: string;
  imageUrl: string;
}

// Service data for each service type
const servicesData: Record<string, ServiceData> = {
  'digital-transformation': {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Reimagine your business models and processes for the digital age.',
    longDescription: 'Our digital transformation solutions help businesses reimagine their operations, customer experiences, and business models. We leverage cutting-edge technologies to help you stay ahead of the competition and meet the evolving demands of your customers.',
    features: [
      'Business process optimization',
      'Customer experience transformation',
      'Digital strategy consulting',
      'Technology roadmap development',
      'Change management and adoption'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
  },
  'cloud-services': {
    id: 'cloud-services',
    title: 'Cloud Services',
    description: 'Accelerate innovation with secure, scalable cloud solutions.',
    longDescription: 'Our comprehensive cloud services help organizations migrate, modernize, and manage their cloud infrastructure. We provide end-to-end solutions that enable businesses to leverage the full potential of cloud computing while ensuring security, performance, and cost optimization.',
    features: [
      'Cloud migration & modernization',
      'Multi-cloud strategy development',
      'Cloud security & compliance',
      'Cloud cost optimization',
      'Managed cloud services'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  },
  'cybersecurity': {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect your assets with our advanced security framework.',
    longDescription: 'Our cybersecurity solutions provide comprehensive protection for your digital assets. We employ a multi-layered approach to security that addresses threats at every level, ensuring your data, applications, and infrastructure are secure against evolving cyber threats.',
    features: [
      'Security assessment & testing',
      'Threat detection & response',
      'Identity & access management',
      'Security operations center (SOC)',
      'Compliance & risk management'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop'
  },
  'data-analytics': {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform data into actionable insights for your business.',
    longDescription: 'Our data analytics solutions help organizations extract valuable insights from their data. We use advanced analytics techniques and tools to transform raw data into actionable intelligence that drives business growth, operational efficiency, and competitive advantage.',
    features: [
      'Data strategy & architecture',
      'Big data implementation',
      'Predictive analytics',
      'Business intelligence',
      'AI & machine learning integration'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  'application-development': {
    id: 'application-development',
    title: 'Application Development',
    description: 'Custom solutions built for your unique business needs.',
    longDescription: 'Our application development services deliver custom software solutions tailored to your specific business requirements. We combine technical expertise with domain knowledge to build scalable, secure, and user-friendly applications that drive business value.',
    features: [
      'Custom software development',
      'Mobile app development',
      'Web application development',
      'API integration',
      'Legacy system modernization'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'
  },
  'business-intelligence': {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    description: 'Make data-driven decisions with our BI solutions.',
    longDescription: 'Our business intelligence solutions provide organizations with the tools and insights needed to make data-driven decisions. We help you transform your data into meaningful visualizations and reports that reveal trends, patterns, and opportunities for business growth.',
    features: [
      'Data visualization & dashboards',
      'Self-service BI implementation',
      'Reporting & analytics',
      'KPI development & tracking',
      'Data governance & quality'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  }
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const serviceData = serviceId ? servicesData[serviceId] : null;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // If service doesn't exist, redirect to services section on home page
    if (!serviceData && serviceId) {
      navigate('/#services');
    }
  }, [serviceId, serviceData, navigate]);

  if (!serviceData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Button
            variant="outline"
            className="mb-8 flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">
                ROSS Solutions
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">{serviceData.title}</h1>
              <p className="text-xl text-brand-700 mb-8">{serviceData.longDescription}</p>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {serviceData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-brand-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-brand-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <Button size="lg" onClick={() => navigate('/contact')}>
                  Get Started
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src={serviceData.imageUrl} 
                  alt={serviceData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-8">See It In Action</h2>
            <div className="aspect-video rounded-xl overflow-hidden border shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={serviceData.videoUrl}
                title={`${serviceData.title} Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-brand-700 mb-8 max-w-3xl mx-auto">
              Contact our team of experts to learn how our {serviceData.title} solutions can help your organization.
            </p>
            <Button size="lg" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
