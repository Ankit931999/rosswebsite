
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { initializeAnimations } from '@/utils/animations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ServiceConsultationForm from '@/components/forms/ServiceConsultationForm';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  videoUrl: string;
  imageUrl: string;
}

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
    videoUrl: '/videos/digital-transformation.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
  },
  'artificial-intelligence': {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description: 'Implement AI solutions to automate processes and gain competitive advantages.',
    longDescription: 'Our AI solutions harness the power of machine learning, natural language processing, and computer vision to transform your business operations. We develop custom AI applications that automate complex tasks, provide deep insights, and create new opportunities for innovation and growth.',
    features: [
      'Machine learning model development',
      'Natural language processing',
      'Computer vision solutions',
      'Predictive analytics',
      'AI integration with existing systems'
    ],
    videoUrl: 'https://ankitvermawebsite.s3.eu-north-1.amazonaws.com/Videos/Artificial+Intelligence.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
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
    videoUrl: '/videos/cloud-services.mp4',
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
    videoUrl: 'https://ankitvermawebsite.s3.eu-north-1.amazonaws.com/Videos/Cybersecurity.mp4',
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
    videoUrl: '/videos/data-analytics.mp4',
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
    videoUrl: '/videos/app-development.mp4',
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
    videoUrl: '/videos/business-intelligence.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  'crm-services': {
    id: 'crm-services',
    title: 'CRM Services',
    description: 'Streamline customer relationships and improve sales processes.',
    longDescription: 'Our CRM services help businesses better manage customer interactions and relationships throughout the customer lifecycle. We implement customized CRM solutions that streamline sales processes, improve customer service, and drive customer loyalty and retention.',
    features: [
      'CRM implementation & integration',
      'Sales process automation',
      'Customer service optimization',
      'Marketing automation',
      'CRM analytics & reporting'
    ],
    videoUrl: '/videos/crm-services.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
  },
  'web-services': {
    id: 'web-services',
    title: 'Web Services',
    description: 'Dynamic, responsive web solutions for your online presence.',
    longDescription: 'Our web services offer comprehensive solutions for businesses looking to establish or enhance their online presence. We create responsive, user-friendly websites and web applications that engage visitors, drive conversions, and represent your brand effectively in the digital space.',
    features: [
      'Responsive website design',
      'E-commerce development',
      'Content management systems',
      'Website optimization',
      'Progressive web applications'
    ],
    videoUrl: '/videos/web-services.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2128&auto=format&fit=crop'
  },
  'software-solutions': {
    id: 'software-solutions',
    title: 'Software Solutions',
    description: 'Tailored software solutions that drive business efficiency.',
    longDescription: 'Our software solutions are designed to address the unique challenges and requirements of your business. We develop customized software applications that automate processes, improve productivity, and help you achieve your business objectives with greater efficiency.',
    features: [
      'Enterprise software development',
      'Software architecture design',
      'Legacy software modernization',
      'Quality assurance & testing',
      'Ongoing maintenance & support'
    ],
    videoUrl: '/videos/software-solutions.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=2070&auto=format&fit=crop'
  }
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(1, {
    message: "Company name is required.",
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  consent: z.boolean().refine(value => value === true, {
    message: "You must agree to contact terms.",
  }),
});

const CybersecurityForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Consultation request submitted",
      description: "Thank you! Our cybersecurity team will contact you shortly.",
    });
    form.reset();
  }

  return (
    <div className="bg-gradient-to-br from-brand-50 to-slate-100 p-6 md:p-10 rounded-xl shadow-md animate-on-scroll">
      <h3 className="text-2xl font-bold text-brand-900 mb-6">Request a Cybersecurity Consultation</h3>
      <p className="text-brand-700 mb-8">
        Complete the form below to discuss your security challenges with our experts. We'll analyze your needs and propose a tailored cybersecurity solution.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tell us about your security needs</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please describe your cybersecurity challenges or requirements..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to be contacted about my cybersecurity needs
                  </FormLabel>
                  <FormDescription>
                    We'll never share your information with third parties.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full md:w-auto">
            Submit Request
          </Button>
        </form>
      </Form>
    </div>
  );
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const serviceData = serviceId ? servicesData[serviceId] : null;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!serviceData && serviceId) {
      navigate('/#services');
    }
    const cleanup = initializeAnimations();
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay was prevented:', error);
      });
    }
    return cleanup;
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
            <div className="animate-on-scroll">
              <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">
                ROSS Solutions
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">{serviceData.title}</h1>
              <p className="text-xl text-brand-700 mb-8">{serviceData.longDescription}</p>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {serviceData.features.map((feature, index) => (
                    <li key={index} className="flex items-start staggered-item">
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

            <div className="relative animate-on-scroll">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src={serviceData.imageUrl} 
                  alt={serviceData.title}
                  className="w-full h-full object-cover image-fade-in"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-8">See It In Action</h2>
            <div className="aspect-video rounded-xl overflow-hidden border shadow-lg bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                loop
                controls
              >
                <source src={serviceData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* The text line below the video has been removed */}
          </div>

          <div id="service-consultation-form" className="mt-16 animate-on-scroll">
            <ServiceConsultationForm serviceName={serviceData.title} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
