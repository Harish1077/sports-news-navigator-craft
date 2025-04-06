
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import NewsFeed from '@/components/NewsFeed';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearchChange={setSearchQuery} />
      <main className="pt-4 pb-12">
        <NewsFeed searchQuery={searchQuery} />
      </main>
      <footer className="bg-sports-blue text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Sports News Navigator. All rights reserved.</p>
          <p className="text-sm mt-2 text-gray-300">
            Powered by Sports News API
          </p>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default Index;
