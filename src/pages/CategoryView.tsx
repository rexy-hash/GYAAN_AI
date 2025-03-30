
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useParams } from 'react-router-dom';
import { useModelsByCategory } from '@/hooks/useModels';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Github, ArrowUpRight, FileText, ExternalLink, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ModelCard = ({ model }) => {
  // Generate the source icon based on the source type
  const SourceIcon = () => {
    switch(model.source) {
      case 'GitHub':
        return <Github className="h-4 w-4 mr-1" />;
      case 'ArXiv':
        return <FileText className="h-4 w-4 mr-1" />;
      case 'HuggingFace':
        return <ArrowUpRight className="h-4 w-4 mr-1" />;
      default:
        return <ExternalLink className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <Card className="ai-card">
      <div className={`h-1 ${model.categoryColor}`}></div>
      <div className="p-4 pb-2">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">{model.name}</h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <SourceIcon /> {model.source} • {model.date}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 pt-2">
        <p className="text-sm mb-4">{model.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {model.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded-full text-xs ${model.categoryColor.replace('bg-', 'bg-').replace('-dark', '-light')} ${model.categoryColor.replace('bg-', 'text-')}`}>
            {model.category}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 mr-1 fill-current text-aiorange" />
            {model.stars}
          </div>
        </div>
      </div>
    </Card>
  );
};

const ModelCardSkeleton = () => (
  <Card className="ai-card">
    <div className="h-1 bg-gray-200"></div>
    <div className="p-4 pb-2">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
    <div className="p-4 pt-2">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex flex-wrap gap-1 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  </Card>
);

const CategoryView = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { categoryId } = useParams();
  
  // Format categoryId for API call (convert from route param format)
  const formattedCategoryId = categoryId ? categoryId.replace(/-/g, ' ') : '';
  
  // Get category name in title case for display
  const categoryName = formattedCategoryId
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const { data: models, isLoading, error } = useModelsByCategory(formattedCategoryId);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-6">{categoryName} Models</h1>
              
              {error ? (
                <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-600">
                  Error loading models: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    Array(6).fill(0).map((_, i) => <ModelCardSkeleton key={i} />)
                  ) : (
                    models?.map((model) => (
                      <ModelCard key={model.id} model={model} />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
