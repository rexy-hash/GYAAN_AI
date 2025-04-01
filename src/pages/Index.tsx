
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 8 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
      // Wait for exit animation to complete
      setTimeout(() => navigate('/dashboard'), 1000);
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const skipIntro = () => {
    setShowIntro(false);
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showIntro ? (
        <motion.div
          className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative mb-8"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="bg-primary rounded-full p-8 relative">
              <Bot size={100} className="text-primary-foreground" />
              <motion.div 
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary h-3 w-3 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            <motion.div 
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full h-6 rounded-full bg-black/20 blur-md"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-2 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome to <span className="text-primary">GYAAN AI</span>
          </motion.h1>

          <motion.p
            className="text-xl mb-6 text-center text-primary/90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            AI ka adda
          </motion.p>
          
          <motion.div
            className="text-center max-w-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-lg mb-8">
              Your personal AI discovery and tracking platform. We help you find, compare, and stay updated with the latest AI models and tools.
            </p>
            
            <div className="flex justify-center">
              <Button onClick={skipIntro} className="flex items-center gap-2 rounded-full">
                Skip intro <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span className="block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="block w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="block w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="inline-block mb-6 rounded-full p-4 bg-secondary">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Loading Dashboard</h2>
            <p className="text-muted-foreground">Please wait while we prepare your GYAAN AI experience...</p>
          </div>
        </motion.div>
      )}

      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Index;
