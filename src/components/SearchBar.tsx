
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { useSearchModels } from '@/hooks/useModels';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { data: searchResults, isLoading } = useSearchModels(isSearching ? searchQuery : '');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };
  
  const handleModelClick = (modelId: string) => {
    // In a real app, this would navigate to a model detail page
    // navigate(`/model/${modelId}`);
    console.log("View model:", modelId);
    clearSearch();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search AI models, tools, papers..." 
            className="pl-8 bg-secondary/50 border-0 focus-visible:ring-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
      
      {isSearching && searchResults && searchResults.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 shadow-md">
          <CardContent className="p-0">
            <ul className="divide-y">
              {searchResults.map((model) => (
                <li 
                  key={model.id}
                  className="p-3 hover:bg-secondary/50 cursor-pointer"
                  onClick={() => handleModelClick(model.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{model.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {model.description}
                      </p>
                    </div>
                    <Badge className={model.categoryColor.replace('bg-', 'bg-').replace('-dark', '-light')}>
                      {model.category}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {isSearching && isLoading && (
        <Card className="absolute z-10 w-full mt-1 shadow-md">
          <CardContent className="p-3">
            <p className="text-muted-foreground">Searching...</p>
          </CardContent>
        </Card>
      )}
      
      {isSearching && searchResults && searchResults.length === 0 && !isLoading && (
        <Card className="absolute z-10 w-full mt-1 shadow-md">
          <CardContent className="p-3">
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
