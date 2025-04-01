
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, Brain, Zap, ChevronDown, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      toast.success("Login successful!", {
        description: "Welcome to GYAAN AI",
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const scrollToDashboard = () => {
    // Smooth scroll to dashboard section
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
    
    // After scrolling is complete, navigate to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Background graphics */}
      <div className="fixed inset-0 -z-10">
        {/* Animated circuit pattern background */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="stroke-primary">
              <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 L100,50 M50,0 L50,100" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" strokeWidth="0.5" />
                <circle cx="0" cy="0" r="5" fill="none" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="5" fill="none" strokeWidth="0.5" />
                <circle cx="0" cy="100" r="5" fill="none" strokeWidth="0.5" />
                <circle cx="100" cy="0" r="5" fill="none" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 relative z-10">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-primary/30"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                x: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%'
                ],
                y: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%'
                ]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          ))}
        </div>

        {/* AI Brain Logo Animation */}
        <motion.div
          className="relative mb-8 z-10"
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
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-full p-8 relative shadow-lg shadow-primary/20">
              <Brain size={100} className="text-primary-foreground" />
              {/* Synapse connections */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary-foreground rounded-full"
                  style={{
                    top: `${30 + Math.random() * 40}%`,
                    left: `${30 + Math.random() * 40}%`
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
            </div>
            <motion.div 
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary h-3 w-3 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {/* Pulsing rings around the brain */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.6,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          <motion.div 
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full h-6 rounded-full bg-black/20 blur-md"
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Welcome to <span className="text-primary">GYAAN AI</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-6 text-center text-primary/90 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          AI ka adda
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full z-10">
          {/* Left side - Features */}
          <motion.div
            className="text-center md:text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-lg mb-8">
              Your personal AI discovery and tracking platform. We help you find, compare, and stay updated with the latest AI models and tools.
            </p>
            
            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {[
                { icon: <Zap className="h-6 w-6" />, title: "Fast Discovery" },
                { icon: <Bot className="h-6 w-6" />, title: "AI Tracking" },
                { icon: <Brain className="h-6 w-6" />, title: "Smart Insights" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-full bg-card/50 backdrop-blur-sm border border-primary/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 rounded-full bg-primary/10 mb-2 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center md:justify-start">
              <Button 
                onClick={scrollToDashboard} 
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Explore dashboard <ChevronDown size={16} />
              </Button>
            </div>
          </motion.div>
          
          {/* Right side - Login form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <Card className="w-full max-w-md bg-card/50 backdrop-blur-md border border-primary/10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full rounded-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                      </>
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <span>Don't have an account? </span>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto"
                      onClick={() => navigate('/signup')}
                    >
                      Sign up
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Down arrow animation */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            y: [0, 10, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <ChevronDown size={36} className="text-primary" />
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Index;
