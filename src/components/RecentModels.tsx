
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookmarkPlus, Github, Star, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelCardProps {
  name: string;
  description: string;
  source: 'GitHub' | 'HuggingFace' | 'ArXiv' | 'Other';
  sourceUrl: string;
  category: string;
  categoryColor: string;
  tags: string[];
  stars: number;
  date: string;
}

const ModelCard: React.FC<ModelCardProps> = ({
  name,
  description,
  source,
  sourceUrl,
  category,
  categoryColor,
  tags,
  stars,
  date
}) => {
  // Generate the source icon based on the source type
  const SourceIcon = () => {
    switch(source) {
      case 'GitHub':
        return <Github className="h-4 w-4 mr-1" />;
      default:
        return <ExternalLink className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <Card className="ai-card">
      <div className={`h-1 ${categoryColor}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex items-center text-xs mt-1">
              <SourceIcon /> {source} • {date}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className={`tag ${categoryColor.replace('bg-', 'bg-').replace('-dark', '-light')} ${categoryColor.replace('bg-', 'text-')}`}>
            {category}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 mr-1 fill-current text-aiorange" />
            {stars}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentModels: React.FC = () => {
  const models = [
    {
      name: "GPT-5 Turbo",
      description: "Latest version of OpenAI's large language model with improved performance and new capabilities.",
      source: "Other" as const,
      sourceUrl: "#",
      category: "NLP Models",
      categoryColor: "bg-aiblue-dark",
      tags: ["language-model", "text-generation", "closed-source"],
      stars: 2456,
      date: "2 days ago"
    },
    {
      name: "StableDiffusion XL-Turbo",
      description: "Real-time image generation model with faster inference and higher quality output.",
      source: "HuggingFace" as const,
      sourceUrl: "#",
      category: "Computer Vision",
      categoryColor: "bg-aipurple-dark",
      tags: ["image-generation", "diffusion-model", "real-time"],
      stars: 1728,
      date: "Yesterday"
    },
    {
      name: "CodeLlama 70B",
      description: "Advanced code generation and completion model with improved contextual understanding.",
      source: "GitHub" as const,
      sourceUrl: "#",
      category: "Code Models",
      categoryColor: "bg-aiorange-dark",
      tags: ["code-generation", "language-model", "open-source"],
      stars: 1356,
      date: "3 days ago"
    },
    {
      name: "DALL-E 3 HD",
      description: "Upgraded image generation with enhanced resolution and improved understanding of complex prompts.",
      source: "Other" as const,
      sourceUrl: "#",
      category: "Content Generation",
      categoryColor: "bg-aigreen-dark",
      tags: ["image-generation", "text-to-image", "closed-source"],
      stars: 1984,
      date: "1 week ago"
    },
    {
      name: "AudioGPT Pro",
      description: "Multimodal model that understands and generates both text and audio in multiple languages.",
      source: "ArXiv" as const,
      sourceUrl: "#",
      category: "Multimodal",
      categoryColor: "bg-aiteal-dark",
      tags: ["audio", "text-to-speech", "speech-recognition"],
      stars: 894,
      date: "4 days ago"
    },
    {
      name: "LangChain Vector",
      description: "Advanced framework for developing applications with LLMs through composability using vector databases.",
      source: "GitHub" as const,
      sourceUrl: "#",
      category: "NLP Models",
      categoryColor: "bg-aiblue-dark",
      tags: ["framework", "vector-db", "embeddings"],
      stars: 1642,
      date: "2 days ago"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <ModelCard
          key={model.name}
          name={model.name}
          description={model.description}
          source={model.source}
          sourceUrl={model.sourceUrl}
          category={model.category}
          categoryColor={model.categoryColor}
          tags={model.tags}
          stars={model.stars}
          date={model.date}
        />
      ))}
    </div>
  );
};

export default RecentModels;
