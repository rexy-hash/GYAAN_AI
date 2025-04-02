
import React, { useState } from 'react';
import { Bell, CircuitBoard, Menu, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from './SearchBar';
import { ModeToggle } from './ModeToggle';
import { useAuth } from '@/contexts/AuthContext';

const alerts = [
  {
    id: "1",
    title: "New AI Model Available",
    description: "A new AI model in the Vision category has been released.",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Subscription Update",
    description: "Your subscription to the AI Research Journal has been renewed.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "3",
    title: "Category Growth Alert",
    description: "The Natural Language Processing category has grown by 15% this week.",
    time: "3 hours ago",
    read: true,
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <button 
          className="md:hidden mr-2" 
          onClick={() => document.dispatchEvent(new CustomEvent('toggle-sidebar'))}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </button>
        
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <CircuitBoard className="h-6 w-6 text-primary" />
          <div className="hidden md:block">
            <div className="text-lg font-bold">GYAAN AI</div>
            <div className="text-xs text-muted-foreground -mt-1">AI ka adda</div>
          </div>
        </Link>
        
        <div className="flex-1 flex justify-center px-2">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Link to="/login" className="hidden md:flex">
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}

          <ModeToggle />
          
          <button onClick={() => setIsOpen(true)}>
            <Bell className="h-5 w-5" />
          </button>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 rounded-full border p-4">
                    <div className={cn(
                      "mt-0.5 rounded-full p-1",
                      alert.read ? "bg-muted" : "bg-primary"
                    )}>
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {alert.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-2 w-full rounded-full"
                >
                  Mark all as read
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
