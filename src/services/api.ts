
import { AIModel, AICategory, TrendData, APIResponse } from "@/types/api";
import { MessageSquare, Image, Code2, FileText, Database } from "lucide-react";

// Mock data for AI models
const mockModels: AIModel[] = [
  {
    id: "1",
    name: "GPT-5 Turbo",
    description: "Latest version of OpenAI's large language model with improved performance and new capabilities.",
    source: "Other",
    sourceUrl: "https://openai.com",
    category: "NLP Models",
    categoryColor: "bg-aiblue-dark",
    tags: ["language-model", "text-generation", "closed-source"],
    stars: 2456,
    date: "2 days ago",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "StableDiffusion XL-Turbo",
    description: "Real-time image generation model with faster inference and higher quality output.",
    source: "HuggingFace",
    sourceUrl: "https://huggingface.co",
    category: "Computer Vision",
    categoryColor: "bg-aipurple-dark",
    tags: ["image-generation", "diffusion-model", "real-time"],
    stars: 1728,
    date: "Yesterday",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "CodeLlama 70B",
    description: "Advanced code generation and completion model with improved contextual understanding.",
    source: "GitHub",
    sourceUrl: "https://github.com",
    category: "Code Models",
    categoryColor: "bg-aiorange-dark",
    tags: ["code-generation", "language-model", "open-source"],
    stars: 1356,
    date: "3 days ago",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "DALL-E 3 HD",
    description: "Upgraded image generation with enhanced resolution and improved understanding of complex prompts.",
    source: "Other",
    sourceUrl: "https://openai.com",
    category: "Content Generation",
    categoryColor: "bg-aigreen-dark",
    tags: ["image-generation", "text-to-image", "closed-source"],
    stars: 1984,
    date: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    name: "AudioGPT Pro",
    description: "Multimodal model that understands and generates both text and audio in multiple languages.",
    source: "ArXiv",
    sourceUrl: "https://arxiv.org",
    category: "Multimodal",
    categoryColor: "bg-aiteal-dark",
    tags: ["audio", "text-to-speech", "speech-recognition"],
    stars: 894,
    date: "4 days ago",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    name: "LangChain Vector",
    description: "Advanced framework for developing applications with LLMs through composability using vector databases.",
    source: "GitHub",
    sourceUrl: "https://github.com",
    category: "NLP Models",
    categoryColor: "bg-aiblue-dark",
    tags: ["framework", "vector-db", "embeddings"],
    stars: 1642,
    date: "2 days ago",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    name: "MindVision 2.0",
    description: "Computer vision model that recognizes and interprets human gestures and emotions in real-time.",
    source: "GitHub",
    sourceUrl: "https://github.com",
    category: "Computer Vision",
    categoryColor: "bg-aipurple-dark",
    tags: ["emotion-recognition", "gesture-recognition", "real-time"],
    stars: 1245,
    date: "5 days ago",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    name: "AutoProgrammer",
    description: "AI model that automatically generates entire programs from natural language descriptions.",
    source: "ArXiv",
    sourceUrl: "https://arxiv.org",
    category: "Code Models",
    categoryColor: "bg-aiorange-dark",
    tags: ["code-generation", "program-synthesis", "natural-language"],
    stars: 980,
    date: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Mock data for categories
const mockCategories: AICategory[] = [
  {
    id: "1",
    title: "NLP Models",
    count: 24,
    growth: 12,
    color: "bg-aiblue-dark",
    icon: "MessageSquare"
  },
  {
    id: "2",
    title: "Computer Vision",
    count: 18,
    growth: 9,
    color: "bg-aipurple-dark",
    icon: "Image"
  },
  {
    id: "3",
    title: "Code Models",
    count: 15,
    growth: -3,
    color: "bg-aiorange-dark",
    icon: "Code2"
  },
  {
    id: "4",
    title: "Content Generation",
    count: 29,
    growth: 21,
    color: "bg-aigreen-dark",
    icon: "FileText"
  },
  {
    id: "5",
    title: "Multimodal",
    count: 12,
    growth: 42,
    color: "bg-aiteal-dark",
    icon: "Database"
  }
];

// Mock trend data for the last 30 days
const generateTrendData = (): TrendData[] => {
  const data: TrendData[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate a random number between 10 and 50 for models count
    // with a general upward trend
    const baseValue = 10 + Math.floor(Math.random() * 15);
    const trendFactor = i / 10; // Creates an upward trend
    const fluctuation = Math.floor(Math.random() * 10);
    const models = Math.round(baseValue + (30 - i) * 0.8 + fluctuation - trendFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      models: models
    });
  }
  
  return data;
};

const mockTrendData = generateTrendData();

// API class to handle data fetching
class API {
  // Get all models
  async getModels(): Promise<APIResponse<AIModel[]>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: mockModels,
      error: null
    };
  }
  
  // Get a single model by ID
  async getModelById(id: string): Promise<APIResponse<AIModel | null>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const model = mockModels.find(m => m.id === id);
    
    return {
      data: model || null,
      error: model ? null : "Model not found"
    };
  }
  
  // Get models filtered by category
  async getModelsByCategory(category: string): Promise<APIResponse<AIModel[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filteredModels = mockModels.filter(m => m.category === category);
    
    return {
      data: filteredModels,
      error: null
    };
  }
  
  // Get models filtered by source
  async getModelsBySource(source: AIModel['source']): Promise<APIResponse<AIModel[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filteredModels = mockModels.filter(m => m.source === source);
    
    return {
      data: filteredModels,
      error: null
    };
  }
  
  // Search models by name or description
  async searchModels(query: string): Promise<APIResponse<AIModel[]>> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const lowercaseQuery = query.toLowerCase();
    const searchResults = mockModels.filter(
      m => m.name.toLowerCase().includes(lowercaseQuery) || 
           m.description.toLowerCase().includes(lowercaseQuery) ||
           m.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    
    return {
      data: searchResults,
      error: null
    };
  }
  
  // Get all categories
  async getCategories(): Promise<APIResponse<AICategory[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      data: mockCategories,
      error: null
    };
  }
  
  // Get trend data
  async getTrendData(): Promise<APIResponse<TrendData[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      data: mockTrendData,
      error: null
    };
  }
  
  // Get the latest models (added in the last 7 days)
  async getLatestModels(): Promise<APIResponse<AIModel[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const latestModels = mockModels.filter(
      model => new Date(model.createdAt) >= sevenDaysAgo
    );
    
    return {
      data: latestModels,
      error: null
    };
  }
}

// Export a singleton instance
export const api = new API();
