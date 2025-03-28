
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, Image, Code2, FileText, Database, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCategories } from '@/hooks/useCategories';
import { Skeleton } from './ui/skeleton';

interface CategoryCardProps {
  title: string;
  count: number;
  growth: number;
  color: string;
  iconName: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  count, 
  growth, 
  color, 
  iconName 
}) => {
  const isPositiveGrowth = growth >= 0;
  
  // Map icon name to component
  const Icon = () => {
    switch(iconName) {
      case 'MessageSquare':
        return <MessageSquare className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />;
      case 'Image':
        return <Image className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />;
      case 'Code2':
        return <Code2 className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />;
      case 'FileText':
        return <FileText className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />;
      case 'Database':
        return <Database className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />;
      default:
        return <MessageSquare className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className={`h-1 ${color}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-md ${color.replace('bg-', 'bg-').replace('-dark', '-light')}`}>
            <Icon />
          </div>
          <span className={cn(
            "flex items-center text-sm",
            isPositiveGrowth ? "text-aigreen-dark" : "text-aired-dark"
          )}>
            <TrendingUp className={cn(
              "h-3 w-3 mr-1",
              isPositiveGrowth ? "" : "transform rotate-180"
            )} />
            {Math.abs(growth)}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {count} new {count === 1 ? 'model' : 'models'} this week
        </p>
      </CardContent>
    </Card>
  );
};

const CategoryCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="h-1 bg-gray-200"></div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-5 w-12" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-6 w-28 mb-2" />
      <Skeleton className="h-4 w-36" />
    </CardContent>
  </Card>
);

const CategoryCards: React.FC = () => {
  const { data: categories, isLoading, error } = useCategories();

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-600">
        Error loading categories: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {isLoading ? (
        // Show skeletons while loading
        Array(5).fill(0).map((_, i) => <CategoryCardSkeleton key={i} />)
      ) : (
        // Show actual categories when loaded
        categories?.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            count={category.count}
            growth={category.growth}
            color={category.color}
            iconName={category.icon}
          />
        ))
      )}
    </div>
  );
};

export default CategoryCards;
