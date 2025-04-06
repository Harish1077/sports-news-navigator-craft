
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
  
  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'basketball': 'bg-orange-500',
      'soccer': 'bg-green-500',
      'tennis': 'bg-yellow-500',
      'football': 'bg-blue-500',
      'motorsports': 'bg-red-500',
      'baseball': 'bg-indigo-500',
      'olympics': 'bg-purple-500',
      'golf': 'bg-emerald-500'
    };
    
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div 
      onClick={() => onArticleClick(article)}
      className="cursor-pointer news-card hover:scale-[1.02] transition-transform duration-300"
    >
      <Card className="border border-gray-200 h-full flex flex-col">
        <div className="relative overflow-hidden h-48">
          <img 
            src={urlToImage || 'https://picsum.photos/800/600?grayscale'} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className={`${getCategoryColor(category)} text-white`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        </div>
        
        <CardContent className="py-4 px-5 flex-grow flex flex-col">
          <div className="mb-1 flex items-center text-xs text-muted-foreground">
            <span className="font-medium text-sports-blue">{source.name}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{description}</p>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()} 
            className="mt-auto text-sports-red text-sm font-medium hover:underline"
          >
            Read more
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsCard;
