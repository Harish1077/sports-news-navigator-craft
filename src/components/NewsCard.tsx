
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { NewsArticle } from '@/services/newsService';

interface NewsCardProps {
  article: NewsArticle;
  onArticleClick: (article: NewsArticle) => void;
}

const NewsCard = ({ article, onArticleClick }: NewsCardProps) => {
  const { title, description, urlToImage, publishedAt, source, category } = article;
  
  // Format the date to "X time ago"
  const formattedDate = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  
  // Get category color - enhanced with more vibrant colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'basketball': 'bg-orange-600 hover:bg-orange-500',
      'soccer': 'bg-emerald-600 hover:bg-emerald-500',
      'tennis': 'bg-yellow-600 hover:bg-yellow-500',
      'football': 'bg-blue-600 hover:bg-blue-500',
      'motorsports': 'bg-red-600 hover:bg-red-500',
      'baseball': 'bg-indigo-600 hover:bg-indigo-500',
      'olympics': 'bg-purple-600 hover:bg-purple-500',
      'golf': 'bg-teal-600 hover:bg-teal-500'
    };
    
    return colors[category] || 'bg-gray-600 hover:bg-gray-500';
  };

  return (
    <div 
      onClick={() => onArticleClick(article)}
      className="cursor-pointer news-card hover:scale-[1.02] transition-transform duration-300"
    >
      <Card className="border border-gray-200 h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg">
        <div className="relative overflow-hidden h-48 group">
          <img 
            src={urlToImage || 'https://picsum.photos/800/600?grayscale'} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          <div className="absolute top-3 right-3">
            <Badge className={`${getCategoryColor(category)} text-white transition-colors duration-300`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="bg-sports-blue/80 text-white text-xs py-1 px-2 rounded">
              {source.name}
            </span>
          </div>
        </div>
        
        <CardContent className="py-4 px-5 flex-grow flex flex-col bg-gradient-to-br from-white to-gray-50">
          <div className="mb-1 flex items-center text-xs text-muted-foreground">
            <span className="text-sports-red font-medium">{formattedDate}</span>
          </div>
          
          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-sports-blue">{title}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{description}</p>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()} 
            className="mt-auto text-sports-red text-sm font-medium hover:underline transition-colors hover:text-sports-blue"
          >
            Read more
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsCard;
