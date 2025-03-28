
import React from 'react';
import { Bell, Search, Settings, UserCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-aiblue-dark mr-2">AIScout</h1>
        <span className="bg-aiblue px-1.5 py-0.5 text-xs font-bold text-white rounded">BETA</span>
      </div>
      
      <div className="flex-grow mx-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search AI models, tools, papers..." 
            className="pl-8 bg-secondary/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-aired rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
