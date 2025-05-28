import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import Button from './ui/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-radial from-primary-50 via-white to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-feature p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Stay updated with the latest AI content trends
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our newsletter to receive exclusive tips, industry insights, and early access to new features.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <motion.div 
                className="bg-success-50 p-6 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-success-100 rounded-full mb-4">
                  <Check className="w-6 h-6 text-success-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Thank you for subscribing!</h3>
                <p className="text-gray-600">
                  You'll receive our next newsletter in your inbox.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
                <Button
                  type="submit"
                  isLoading={isLoading}
                  rightIcon={<Send size={16} />}
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
            )}
            
            <p className="text-gray-500 text-sm mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;