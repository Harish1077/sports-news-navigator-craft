
import React, { useState, useEffect } from 'react';
import { fetchSportsNews, getSportCategories, NewsArticle } from '@/services/newsService';
import NewsCard from './NewsCard';
import CategoryFilters from './CategoryFilters';
import ArticleDetailModal from './ArticleDetailModal';
import { Skeleton } from "@/components/ui/skeleton";

interface NewsFeedProps {
  searchQuery: string;
}

const NewsFeed = ({ searchQuery }: NewsFeedProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const response = await fetchSportsNews();
        setArticles(response.articles);
        setCategories(getSportCategories());
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filter articles based on search query and selected category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-sports-blue to-blue-700 p-6 rounded-lg mb-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white">Latest Sports News</h2>
        <p className="text-blue-100 mt-2">Stay updated with the latest sports coverage from around the world</p>
      </div>
      
      <CategoryFilters 
        categories={categories} 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="news-card">
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredArticles.map((article) => (
            <NewsCard 
              key={article.id} 
              article={article} 
              onArticleClick={handleArticleClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
          <h3 className="text-xl font-medium text-sports-blue">
            No articles found matching your criteria.
          </h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter settings.
          </p>
        </div>
      )}
      
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default NewsFeed;
