
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/MySidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useModels } from '@/hooks/useModels';
import { useModelsBySource } from '@/hooks/useModelsBySource';
import { toast } from 'sonner';
import { AIModel } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Github, ArrowUpRight, FileText, ExternalLink, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ModelCardProps {
  model: AIModel;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
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
    <Card className="ai-card info-circle shadow-lg border-2 border-primary/20 hover:border-primary/50 transition-all">
      <div className={`h-2 ${model.categoryColor} rounded-t-full`}></div>
      <div className="p-5 pb-3 flex flex-col items-center text-center">
        <div className="flex justify-between items-center w-full mb-2">
          <div className="mx-auto">
            <h3 className="text-lg font-medium">{model.name}</h3>
            <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
              <SourceIcon /> {model.source} • {model.date}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 absolute top-3 right-3 rounded-full">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 pt-0 flex flex-col items-center">
        <p className="text-sm mb-4 text-center">{model.description}</p>
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {model.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center w-full">
          <span className={`px-2 py-1 rounded-full text-xs ${model.categoryColor.replace('bg-', 'bg-').replace('-dark', '-light')} ${model.categoryColor.replace('bg-', 'text-')}`}>
            {model.category}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 mr-1 fill-current text-primary" />
            {model.stars}
          </div>
        </div>
      </div>
    </Card>
  );
};

const ModelCardSkeleton = () => (
  <Card className="ai-card info-circle">
    <div className="h-2 bg-gray-200 rounded-t-full"></div>
    <div className="p-5 pb-3 flex flex-col items-center">
      <div className="flex justify-between w-full">
        <div className="space-y-2 mx-auto">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-4 w-24 mx-auto rounded-full" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full absolute top-3 right-3" />
      </div>
    </div>
    <div className="p-4 pt-0 flex flex-col items-center">
      <Skeleton className="h-4 w-full mb-2 rounded-full" />
      <Skeleton className="h-4 w-3/4 mb-4 rounded-full" />
      <div className="flex flex-wrap justify-center gap-1 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex justify-between w-full">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
    </div>
  </Card>
);

const Discoveries: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { data: allModels, isLoading: isLoadingAll } = useModels();
  const { data: githubModels, isLoading: isLoadingGithub } = useModelsBySource('GitHub');
  const { data: huggingfaceModels, isLoading: isLoadingHuggingface } = useModelsBySource('HuggingFace');
  const { data: arxivModels, isLoading: isLoadingArxiv } = useModelsBySource('ArXiv');
  
  React.useEffect(() => {
    toast.info('Discover Me More', {
      description: 'Browse by platform or view all discoveries',
    });
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-6">Discover Me More</h1>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 rounded-full">
                  <TabsTrigger value="all" className="rounded-full">All Models</TabsTrigger>
                  <TabsTrigger value="github" className="rounded-full">GitHub</TabsTrigger>
                  <TabsTrigger value="huggingface" className="rounded-full">HuggingFace</TabsTrigger>
                  <TabsTrigger value="arxiv" className="rounded-full">ArXiv</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoadingAll ? (
                      Array(6).fill(0).map((_, i) => <ModelCardSkeleton key={i} />)
                    ) : (
                      allModels?.map((model) => (
                        <ModelCard key={model.id} model={model} />
                      ))
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="github">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoadingGithub ? (
                      Array(3).fill(0).map((_, i) => <ModelCardSkeleton key={i} />)
                    ) : (
                      githubModels?.map((model) => (
                        <ModelCard key={model.id} model={model} />
                      ))
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="huggingface">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoadingHuggingface ? (
                      Array(3).fill(0).map((_, i) => <ModelCardSkeleton key={i} />)
                    ) : (
                      huggingfaceModels?.map((model) => (
                        <ModelCard key={model.id} model={model} />
                      ))
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="arxiv">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoadingArxiv ? (
                      Array(3).fill(0).map((_, i) => <ModelCardSkeleton key={i} />)
                    ) : (
                      arxivModels?.map((model) => (
                        <ModelCard key={model.id} model={model} />
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discoveries;
