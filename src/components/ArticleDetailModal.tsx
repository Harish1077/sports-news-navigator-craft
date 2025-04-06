
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { NewsArticle } from '@/services/newsService';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from "@/components/ui/badge";

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleDetailModal = ({ article, isOpen, onClose }: ArticleDetailModalProps) => {
  if (!article) return null;

  const { title, description, urlToImage, publishedAt, source, category, url } = article;
  const formattedDate = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  
  // Get category color (same as in NewsCard)
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {urlToImage && (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={urlToImage || 'https://picsum.photos/800/600?grayscale'} 
                alt={title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className={`${getCategoryColor(category)} text-white`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              </div>
            </div>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="font-medium text-sports-blue">{source.name}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          
          <div className="article-content">
            <p className="mb-4 text-lg">{description}</p>
            
            {/* Extended article content - in a real app, this would be the full content */}
            <p className="mb-4">
              This article provides detailed information about the latest sports event. 
              The coverage includes an in-depth analysis of key moments and player performances.
            </p>
            
            <p className="mb-4">
              Experts have weighed in on the significance of this development in the world of sports,
              with many noting the potential long-term implications for the teams and athletes involved.
            </p>
            
            <p className="mb-4">
              Fans have responded enthusiastically to the news, with social media conversations highlighting
              the excitement and anticipation around what comes next.
            </p>
          </div>
          
          <div className="mt-6">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sports-red hover:underline"
            >
              Read full article on {source.name}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDetailModal;
