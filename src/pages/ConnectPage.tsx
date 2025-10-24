import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Mail, User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ConnectPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted!",
      description: "We'll contact you shortly to schedule your demo.",
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Get a Demo - Connect with Daddy Leads | Schedule Your Free Demo</title>
        <meta name="description" content="Schedule a free demo of Daddy Leads. Connect with our team via WhatsApp, Telegram, or Discord to see how our lead scraping tools can grow your business." />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: '#faf8f0' }}>
        <Navbar />

        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#411c78' }}>
                Get Connected
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                Have questions about pricing? Connect with us for personalized assistance
              </p>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center gap-8 mb-16"
            >
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <MessageCircle className="w-10 h-10" />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #0088cc, #006699)' }}
              >
                <Send className="w-10 h-10" />
              </a>
              <a
                href="https://discord.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #5865F2, #4752C4)' }}
              >
                <MessageCircle className="w-10 h-10" />
              </a>
            </motion.div>

            {/* Demo Request Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-2 shadow-xl" style={{ borderColor: '#411c78' }}>
                <CardHeader>
                  <CardTitle className="text-2xl text-center" style={{ color: '#411c78' }}>
                    Request a Free Demo
                  </CardTitle>
                  <p className="text-center text-gray-600 mt-2">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Company Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Tell us about your needs (optional)
                      </label>
                      <textarea
                        placeholder="What are you looking to accomplish with Daddy Leads?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold"
                      style={{ backgroundColor: '#411c78' }}
                    >
                      Request Demo
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <div style={{ backgroundColor: '#faf8f0' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ConnectPage;
