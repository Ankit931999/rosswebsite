
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real application, this would send the form data to a server
    toast({
      title: "Form submitted",
      description: "Thank you for your message. We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 leading-tight">
            Contact Us
          </h2>
          <p className="text-brand-700 max-w-2xl mx-auto">
            Have questions about our services or want to discuss your project? Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/3 space-y-8 animate-on-scroll">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                <Phone className="text-brand-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-900 mb-1">Call Us</h3>
                <p className="text-brand-700">+1 (800) 123-4567</p>
                <p className="text-brand-700">Monday - Friday, 9am - 6pm</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                <Mail className="text-brand-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-900 mb-1">Email Us</h3>
                <p className="text-brand-700">info@ross-tech.com</p>
                <p className="text-brand-700">support@ross-tech.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                <MessageSquare className="text-brand-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-900 mb-1">Headquarters</h3>
                <p className="text-brand-700">123 Tech Boulevard, Suite 500</p>
                <p className="text-brand-700">San Francisco, CA 94103</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 animate-on-scroll">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (800) 123-4567" {...field} />
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
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project or inquiry..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="mr-2" size={16} />
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
