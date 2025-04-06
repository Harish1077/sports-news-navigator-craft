
import React from 'react';
import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="rounded-full"
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="rounded-full capitalize"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilters;
