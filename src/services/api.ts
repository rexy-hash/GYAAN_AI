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
    isSubscribed: false,
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
    isSubscribed: false,
  },
  {
    id: "101",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's advanced language model with improved reasoning and context handling capabilities.",
    source: "Other",
    sourceUrl: "https://anthropic.com",
    category: "NLP Models",
    categoryColor: "bg-aiblue-dark",
    tags: ["language-model", "reasoning", "closed-source"],
    stars: 1823,
    date: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "102",
    name: "Gemini Pro 1.5",
    description: "Google's multi-modal language model with extended context window and enhanced reasoning.",
    source: "Other",
    sourceUrl: "https://deepmind.google",
    category: "NLP Models",
    categoryColor: "bg-aiblue-dark",
    tags: ["language-model", "long-context", "closed-source"],
    stars: 2104,
    date: "5 days ago",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "103",
    name: "Llama 3 70B",
    description: "Meta's open-source large language model with competitive performance across benchmarks.",
    source: "GitHub",
    sourceUrl: "https://github.com/meta-llama",
    category: "NLP Models",
    categoryColor: "bg-aiblue-dark",
    tags: ["language-model", "open-source", "research"],
    stars: 3521,
    date: "2 weeks ago",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "104",
    name: "Mistral Large",
    description: "State-of-the-art open-source language model with enterprise-grade capabilities.",
    source: "Other",
    sourceUrl: "https://mistral.ai",
    category: "NLP Models",
    categoryColor: "bg-aiblue-dark",
    tags: ["language-model", "enterprise", "closed-source"],
    stars: 1957,
    date: "3 days ago",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
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
    isSubscribed: false,
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
    isSubscribed: false,
  },
  {
    id: "201",
    name: "CLIP Vision Pro",
    description: "OpenAI's advanced vision-language model with improved zero-shot performance on diverse tasks.",
    source: "Other",
    sourceUrl: "https://openai.com",
    category: "Computer Vision",
    categoryColor: "bg-aipurple-dark",
    tags: ["vision-language", "zero-shot", "closed-source"],
    stars: 1876,
    date: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "202",
    name: "DreamShaper XL",
    description: "Advanced AI image generation model with photorealistic outputs and enhanced creative control.",
    source: "HuggingFace",
    sourceUrl: "https://huggingface.co/dreamshaper",
    category: "Computer Vision",
    categoryColor: "bg-aipurple-dark",
    tags: ["image-generation", "photorealistic", "open-source"],
    stars: 2245,
    date: "4 days ago",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "203",
    name: "YOLO v9",
    description: "Next generation object detection system with improved accuracy and real-time performance.",
    source: "GitHub",
    sourceUrl: "https://github.com/ultralytics",
    category: "Computer Vision",
    categoryColor: "bg-aipurple-dark",
    tags: ["object-detection", "real-time", "open-source"],
    stars: 3145,
    date: "2 weeks ago",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  
  {
    id: "3",
    name: "CodeLlama 70B",
    description: "Advanced code generation and completion model with improved contextual understanding.",
    source: "GitHub",
    sourceUrl: "https://github.com/facebookresearch",
    category: "Code Models",
    categoryColor: "bg-aiorange-dark",
    tags: ["code-generation", "language-model", "open-source"],
    stars: 1356,
    date: "3 days ago",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
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
    isSubscribed: false,
  },
  {
    id: "301",
    name: "GitHub Copilot X",
    description: "Next-generation AI pair programmer with enhanced context understanding and code suggestions.",
    source: "Other",
    sourceUrl: "https://github.com/features/copilot",
    category: "Code Models",
    categoryColor: "bg-aiorange-dark",
    tags: ["code-completion", "ide-integration", "closed-source"],
    stars: 2876,
    date: "5 days ago",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "302",
    name: "DeepCoder",
    description: "AI system that learns to write programs by synthesizing code fragments from existing codebases.",
    source: "ArXiv",
    sourceUrl: "https://arxiv.org/deepcoder",
    category: "Code Models",
    categoryColor: "bg-aiorange-dark",
    tags: ["program-synthesis", "code-search", "research"],
    stars: 1125,
    date: "2 weeks ago",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "303",
    name: "CodeFusion Pro",
    description: "Advanced code generation model with multi-language support and specialized framework knowledge.",
    source: "GitHub",
    sourceUrl: "https://github.com/codefusion",
    category: "Code Models",
    categoryColor: "bg-aiorange-dark",
    tags: ["code-generation", "multi-language", "open-source"],
    stars: 1567,
    date: "6 days ago",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  
  {
    id: "4",
    name: "DALL-E 3 HD",
    description: "Upgraded image generation with enhanced resolution and improved understanding of complex prompts.",
    source: "Other",
    sourceUrl: "https://openai.com/dall-e-3",
    category: "Content Generation",
    categoryColor: "bg-aigreen-dark",
    tags: ["image-generation", "text-to-image", "closed-source"],
    stars: 1984,
    date: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "401",
    name: "Midjourney V6",
    description: "Industry-leading image generation system with photorealistic outputs and intuitive prompt handling.",
    source: "Other",
    sourceUrl: "https://midjourney.com",
    category: "Content Generation",
    categoryColor: "bg-aigreen-dark",
    tags: ["image-generation", "photorealistic", "closed-source"],
    stars: 3254,
    date: "4 days ago",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "402",
    name: "AudioCraft Pro",
    description: "Meta's advanced audio generation model for creating high-quality music and sound effects.",
    source: "GitHub",
    sourceUrl: "https://github.com/facebookresearch/audiocraft",
    category: "Content Generation",
    categoryColor: "bg-aigreen-dark",
    tags: ["audio-generation", "music", "open-source"],
    stars: 1645,
    date: "3 days ago",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "403",
    name: "TextCraft GPT",
    description: "Specialized content generation model for marketing, creative writing, and business communications.",
    source: "Other",
    sourceUrl: "https://textcraft.ai",
    category: "Content Generation",
    categoryColor: "bg-aigreen-dark",
    tags: ["text-generation", "marketing", "closed-source"],
    stars: 876,
    date: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "404",
    name: "VideoGen AI",
    description: "Text-to-video generation model with smooth transitions and realistic motion synthesis.",
    source: "HuggingFace",
    sourceUrl: "https://huggingface.co/videogen",
    category: "Content Generation",
    categoryColor: "bg-aigreen-dark",
    tags: ["video-generation", "text-to-video", "open-source"],
    stars: 2134,
    date: "5 days ago",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  
  {
    id: "5",
    name: "AudioGPT Pro",
    description: "Multimodal model that understands and generates both text and audio in multiple languages.",
    source: "ArXiv",
    sourceUrl: "https://arxiv.org/audiogpt",
    category: "Multimodal",
    categoryColor: "bg-aiteal-dark",
    tags: ["audio", "text-to-speech", "speech-recognition"],
    stars: 894,
    date: "4 days ago",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "501",
    name: "GPT-4o",
    description: "OpenAI's most advanced multimodal model with improved reasoning across text, images, and audio.",
    source: "Other",
    sourceUrl: "https://openai.com/gpt-4o",
    category: "Multimodal",
    categoryColor: "bg-aiteal-dark",
    tags: ["multimodal", "reasoning", "closed-source"],
    stars: 3756,
    date: "1 week ago",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "502",
    name: "Claude 3 Vision",
    description: "Anthropic's multimodal assistant with advanced visual understanding and reasoning capabilities.",
    source: "Other",
    sourceUrl: "https://anthropic.com/claude",
    category: "Multimodal",
    categoryColor: "bg-aiteal-dark",
    tags: ["multimodal", "vision", "closed-source"],
    stars: 2845,
    date: "3 days ago",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
  },
  {
    id: "503",
    name: "Gemini Pro Vision",
    description: "Google's advanced multimodal model with seamless integration across text, images, and code.",
    source: "Other",
    sourceUrl: "https://deepmind.google/gemini",
    category: "Multimodal",
    categoryColor: "bg-aiteal-dark",
    tags: ["multimodal", "vision", "closed-source"],
    stars: 2674,
    date: "6 days ago",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    isSubscribed: false,
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

// Store user subscriptions
let userSubscriptions: string[] = [];

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
    
    if (model) {
      model.isSubscribed = userSubscriptions.includes(model.id);
    }
    
    return {
      data: model || null,
      error: model ? null : "Model not found"
    };
  }
  
  // Get models filtered by category
  async getModelsByCategory(category: string): Promise<APIResponse<AIModel[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filteredModels = mockModels.filter(m => m.category === category)
      .map(model => ({
        ...model,
        isSubscribed: userSubscriptions.includes(model.id)
      }));
    
    return {
      data: filteredModels,
      error: null
    };
  }
  
  // Get models filtered by source
  async getModelsBySource(source: AIModel['source']): Promise<APIResponse<AIModel[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filteredModels = mockModels.filter(m => m.source === source)
      .map(model => ({
        ...model,
        isSubscribed: userSubscriptions.includes(model.id)
      }));
    
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
    ).map(model => ({
      ...model,
      isSubscribed: userSubscriptions.includes(model.id)
    }));
    
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
    ).map(model => ({
      ...model,
      isSubscribed: userSubscriptions.includes(model.id)
    }));
    
    return {
      data: latestModels,
      error: null
    };
  }

  // Subscribe to a model
  async subscribeToModel(modelId: string): Promise<APIResponse<boolean>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!userSubscriptions.includes(modelId)) {
      userSubscriptions.push(modelId);
    }
    
    return {
      data: true,
      error: null
    };
  }
  
  // Unsubscribe from a model
  async unsubscribeFromModel(modelId: string): Promise<APIResponse<boolean>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    userSubscriptions = userSubscriptions.filter(id => id !== modelId);
    
    return {
      data: true,
      error: null
    };
  }
  
  // Get all subscribed models
  async getSubscribedModels(): Promise<APIResponse<AIModel[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const subscribedModels = mockModels
      .filter(model => userSubscriptions.includes(model.id))
      .map(model => ({
        ...model,
        isSubscribed: true
      }));
    
    return {
      data: subscribedModels,
      error: null
    };
  }
}

// Export a singleton instance
export const api = new API();
