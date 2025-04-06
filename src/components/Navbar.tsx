
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface NavbarProps {
  onSearchChange: (query: string) => void;
}

const Navbar = ({ onSearchChange }: NavbarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-sports-blue">
            Sports<span className="text-sports-red">News</span>
          </h1>
        </div>
        
        <div className="w-full sm:w-auto flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              className="pl-8 bg-gray-50"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="hidden md:flex space-x-1">
          <Button variant="ghost">Latest</Button>
          <Button variant="ghost">Trending</Button>
          <Button variant="ghost">Bookmarks</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
