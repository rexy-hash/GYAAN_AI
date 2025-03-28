
import React from 'react';
import { 
  Home, 
  BarChart2, 
  BookOpen, 
  Code2,
  Eye, 
  FileText, 
  Settings, 
  Star, 
  PanelLeft, 
  MessageSquare, 
  Database,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  count?: number;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  isActive = false,
  count,
  to
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors",
        isActive 
          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span className="flex-grow">{label}</span>
      {count !== undefined && (
        <span className={cn(
          "inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded-full text-xs font-medium",
          isActive 
            ? "bg-white/20 text-white" 
            : "bg-sidebar-accent-foreground/20 text-sidebar-accent-foreground"
        )}>
          {count}
        </span>
      )}
    </Link>
  );
};

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();
  
  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {collapsed ? (
        <div className="p-4 flex justify-center">
          <PanelLeft className="h-6 w-6 text-sidebar-foreground" />
        </div>
      ) : (
        <div className="p-4 flex items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-aiblue mr-3">
            <Eye className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-sidebar-foreground">AIScout</h2>
        </div>
      )}
      
      <div className="flex flex-col flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <SidebarItem 
          icon={Home} 
          label="Dashboard" 
          isActive={location.pathname === '/dashboard'} 
          to="/dashboard" 
        />
        <SidebarItem 
          icon={BookOpen} 
          label="Discoveries" 
          count={12} 
          isActive={location.pathname === '/discoveries'} 
          to="/discoveries" 
        />
        <SidebarItem icon={BarChart2} label="Trends" to="/trends" />
        <SidebarItem icon={Star} label="Favorites" count={5} to="/favorites" />
        
        <div className="mt-6 mb-2 px-3">
          <h3 className={cn(
            "uppercase text-xs font-medium opacity-60",
            collapsed ? "sr-only" : "text-sidebar-foreground"
          )}>
            Categories
          </h3>
        </div>
        
        <SidebarItem icon={MessageSquare} label="NLP Models" count={8} to="/category/nlp-models" />
        <SidebarItem icon={Image} label="Computer Vision" count={7} to="/category/computer-vision" />
        <SidebarItem icon={Code2} label="Code Models" count={4} to="/category/code-models" />
        <SidebarItem icon={FileText} label="Content Generation" count={6} to="/category/content-generation" />
        <SidebarItem icon={Database} label="Multimodal" count={3} to="/category/multimodal" />
        
        <div className="mt-auto">
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
