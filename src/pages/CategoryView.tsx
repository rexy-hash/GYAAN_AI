
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
import { toast } from 'sonner';

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

  const handleBookmark = () => {
    toast.success(`Added ${model.name} to bookmarks`);
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
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmark}>
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

const EmptyState = ({ categoryName }) => (
  <div className="text-center p-10 border border-dashed rounded-md border-gray-300">
    <h3 className="text-xl font-semibold mb-2">No models found</h3>
    <p className="text-muted-foreground mb-4">
      There are currently no models listed under the {categoryName} category.
    </p>
  </div>
);

const CategoryView = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { categoryId } = useParams();
  
  // Format categoryId for display (convert from route param format)
  const formattedCategoryName = categoryId ? 
    categoryId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : '';
  
  // Format for API call - the API uses specific category names like "Multimodal"
  // The categoryId from the URL will be like "multimodal"
  const apiCategoryName = formattedCategoryName;
  
  // Use the hook with the formatted category name
  const { data: models, isLoading, error } = useModelsByCategory(apiCategoryName);

  // Debug for troubleshooting
  React.useEffect(() => {
    console.log("CategoryView - categoryId:", categoryId);
    console.log("CategoryView - formattedCategoryName:", formattedCategoryName);
    console.log("CategoryView - apiCategoryName:", apiCategoryName);
    console.log("CategoryView - models:", models);
  }, [categoryId, models]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-6">{formattedCategoryName} Models</h1>
              
              {error ? (
                <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-600">
                  Error loading models: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    Array(6).fill(0).map((_, i) => <ModelCardSkeleton key={i} />)
                  ) : models && models.length > 0 ? (
                    models.map((model) => (
                      <ModelCard key={model.id} model={model} />
                    ))
                  ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                      <EmptyState categoryName={formattedCategoryName} />
                    </div>
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
