
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Layers, Compass, Bell } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useCategories } from '@/hooks/useCategories';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();
  const { data: categories, isLoading } = useCategories();
  const [open, setOpen] = React.useState(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <div className="w-4 h-4 rounded bg-aiblue-dark" />;
      case 'Image':
        return <div className="w-4 h-4 rounded bg-aipurple-dark" />;
      case 'Code2':
        return <div className="w-4 h-4 rounded bg-aiorange-dark" />;
      case 'FileText':
        return <div className="w-4 h-4 rounded bg-aigreen-dark" />;
      case 'Database':
        return <div className="w-4 h-4 rounded bg-aiteal-dark" />;
      default:
        return <div className="w-4 h-4 rounded bg-gray-400" />;
    }
  };

  const isActiveCategory = (categoryTitle: string) => {
    const slug = categoryTitle.replace(/\s+/g, '-').toLowerCase();
    return location.pathname === `/category/${slug}`;
  };

  if (collapsed) {
    return (
      <aside className="w-16 border-r border-border bg-background flex flex-col h-full">
        <div className="py-4 flex-1">
          <div className="space-y-2 px-2">
            <NavLink to="/dashboard">
              <Button
                variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
                size="icon"
                className="w-12 h-12"
              >
                <Home className="h-5 w-5" />
              </Button>
            </NavLink>
            
            <NavLink to="/discoveries">
              <Button
                variant={location.pathname === "/discoveries" ? "secondary" : "ghost"}
                size="icon"
                className="w-12 h-12"
              >
                <Compass className="h-5 w-5" />
              </Button>
            </NavLink>
            
            <NavLink to="/subscriptions">
              <Button
                variant={location.pathname === "/subscriptions" ? "secondary" : "ghost"}
                size="icon"
                className="w-12 h-12"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </NavLink>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-60 border-r border-border bg-background flex flex-col h-full">
      <div className="py-4 flex-1 overflow-y-auto">
        <div className="space-y-1 px-3">
          <NavLink to="/dashboard">
            <Button
              variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </NavLink>
          
          <NavLink to="/discoveries">
            <Button
              variant={location.pathname === "/discoveries" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Compass className="mr-2 h-4 w-4" />
              Discover
            </Button>
          </NavLink>
          
          <NavLink to="/subscriptions">
            <Button
              variant={location.pathname === "/subscriptions" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Bell className="mr-2 h-4 w-4" />
              Subscriptions
            </Button>
          </NavLink>
        </div>
        
        <div className="mt-6">
          <Collapsible open={open} onOpenChange={setOpen} className="px-3">
            <CollapsibleTrigger asChild>
              <div className="flex items-center px-3 py-1.5 text-sm font-medium cursor-pointer hover:text-primary">
                <Layers className="mr-2 h-4 w-4" />
                Categories
                <span className="ml-auto text-xs text-muted-foreground">{open ? '−' : '+'}</span>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-1 space-y-1">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-8 mx-3 mb-1 animate-pulse bg-muted rounded" />
                ))
              ) : (
                categories?.map((category) => {
                  const isActive = isActiveCategory(category.title);
                  const categorySlug = category.title.replace(/\s+/g, '-').toLowerCase();
                  
                  return (
                    <NavLink 
                      key={category.id} 
                      to={`/category/${categorySlug}`}
                      className={cn(
                        "flex items-center text-sm px-3 py-1.5 rounded-md",
                        isActive
                          ? "bg-secondary text-secondary-foreground"
                          : "hover:bg-secondary/50"
                      )}
                    >
                      <div className="mr-2">
                        {getIcon(category.icon)}
                      </div>
                      {category.title}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {category.count}
                      </span>
                    </NavLink>
                  );
                })
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
