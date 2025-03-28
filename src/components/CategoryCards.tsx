
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, Image, Code2, FileText, Database, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  count: number;
  growth: number;
  color: string;
  icon: React.ElementType;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  count, 
  growth, 
  color, 
  icon: Icon 
}) => {
  const isPositiveGrowth = growth >= 0;
  
  return (
    <Card className="overflow-hidden">
      <div className={`h-1 ${color}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-md ${color.replace('bg-', 'bg-').replace('-dark', '-light')}`}>
            <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
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

const CategoryCards: React.FC = () => {
  const categories = [
    {
      title: "NLP Models",
      count: 24,
      growth: 12,
      color: "bg-aiblue-dark",
      icon: MessageSquare
    },
    {
      title: "Computer Vision",
      count: 18,
      growth: 9,
      color: "bg-aipurple-dark",
      icon: Image
    },
    {
      title: "Code Models",
      count: 15,
      growth: -3,
      color: "bg-aiorange-dark",
      icon: Code2
    },
    {
      title: "Content Generation",
      count: 29,
      growth: 21,
      color: "bg-aigreen-dark",
      icon: FileText
    },
    {
      title: "Multimodal",
      count: 12,
      growth: 42,
      color: "bg-aiteal-dark",
      icon: Database
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          count={category.count}
          growth={category.growth}
          color={category.color}
          icon={category.icon}
        />
      ))}
    </div>
  );
};

export default CategoryCards;
