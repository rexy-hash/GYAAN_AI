
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/MySidebar';
import { useParams } from 'react-router-dom';
import { useModelsByCategory } from '@/hooks/useModels';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Github, ArrowUpRight, FileText, ExternalLink, Star, Bell, BellOff, Rocket } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useModelSubscription } from '@/hooks/useModelSubscription';

const ModelCard = ({ model }) => {
  const { subscribeToModel, unsubscribeFromModel } = useModelSubscription();
  
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
  
  const handleSubscription = () => {
    if (model.isSubscribed) {
      unsubscribeFromModel.mutate(model.id);
    } else {
      subscribeToModel.mutate(model.id);
    }
  };

  const handleExplore = () => {
    // Open the model URL in a new tab
    window.open(`https://example.com/models/${model.id}`, '_blank');
    toast.success(`Exploring ${model.name}`, {
      description: 'Opening model details in a new tab',
    });
  };

  return (
    <Card className="ai-card group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
      <div className={`h-1 ${model.categoryColor}`}></div>
      <div className="p-4 pb-2">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{model.name}</h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <SourceIcon /> {model.source} • {model.date}
            </div>
            <div className="text-xs text-muted-foreground mt-1 italic">
              Developed by {model.company || "AI Research Team"}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={handleSubscription}
              disabled={subscribeToModel.isPending || unsubscribeFromModel.isPending}
            >
              {model.isSubscribed ? 
                <BellOff className="h-4 w-4 text-primary" /> : 
                <Bell className="h-4 w-4" />
              }
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmark}>
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>
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
        <div className="flex justify-between items-center mb-4">
          <span className={`px-2 py-1 rounded-full text-xs ${model.categoryColor.replace('bg-', 'bg-').replace('-dark', '-light')} ${model.categoryColor.replace('bg-', 'text-')}`}>
            {model.category}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 mr-1 fill-current text-aiorange" />
            {model.stars}
          </div>
        </div>
        <Button 
          onClick={handleExplore} 
          className="w-full group-hover:bg-gradient-to-r from-primary to-accent transition-all"
        >
          <Rocket className="h-4 w-4 mr-2" /> Explore Now
        </Button>
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
  
  // Convert kebab-case URL parameter to Title Case for the API
  const formattedCategoryName = categoryId ? 
    categoryId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : '';
    
  // Map URL slug to exact category name as in the API
  const categoryMapping = {
    'nlp-models': 'NLP Models',
    'computer-vision': 'Computer Vision',
    'code-models': 'Code Models',
    'content-generation': 'Content Generation',
    'multimodal': 'Multimodal'
  };
  
  // Use the mapped category name or fallback to the formatted name
  const apiCategoryName = categoryId && categoryMapping[categoryId] 
    ? categoryMapping[categoryId] 
    : formattedCategoryName;
  
  const { data: models, isLoading, error } = useModelsByCategory(apiCategoryName);

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
              <h1 className="text-3xl font-bold mb-6">{apiCategoryName} Models</h1>
              
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
                      <EmptyState categoryName={apiCategoryName} />
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
