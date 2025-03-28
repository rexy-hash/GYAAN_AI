
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookmarkPlus, Github, Star, ExternalLink, ArrowUpRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLatestModels } from '@/hooks/useModels';
import { AIModel } from '@/types/api';
import { Skeleton } from './ui/skeleton';

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
    <Card className="ai-card">
      <div className={`h-1 ${model.categoryColor}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg">{model.name}</CardTitle>
            <CardDescription className="flex items-center text-xs mt-1">
              <SourceIcon /> {model.source} • {model.date}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{model.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {model.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className={`tag ${model.categoryColor.replace('bg-', 'bg-').replace('-dark', '-light')} ${model.categoryColor.replace('bg-', 'text-')}`}>
            {model.category}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 mr-1 fill-current text-aiorange" />
            {model.stars}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ModelCardSkeleton = () => (
  <Card className="ai-card">
    <div className="h-1 bg-gray-200"></div>
    <CardHeader className="pb-2">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </CardHeader>
    <CardContent>
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
    </CardContent>
  </Card>
);

const RecentModels: React.FC = () => {
  const { data: models, isLoading, error } = useLatestModels();

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-600">
        Error loading models: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (
        // Show skeletons while loading
        Array(6).fill(0).map((_, i) => <ModelCardSkeleton key={i} />)
      ) : (
        // Show actual models when loaded
        models?.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))
      )}
    </div>
  );
};

export default RecentModels;
