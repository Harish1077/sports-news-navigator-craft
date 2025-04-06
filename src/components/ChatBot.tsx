
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm your sports news assistant. How can I help you today?",
    isUser: false,
  },
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you find the latest sports news!",
        "Would you like to know about recent matches?",
        "I can filter news by sports categories if you'd like.",
        "Is there a specific sports team you're interested in?",
        "Check out the trending section for popular stories!"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false,
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="rounded-full h-14 w-14 shadow-lg"
            variant="default"
          >
            <MessageCircle size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md w-[90vw] md:w-[400px]" side="right">
          <SheetHeader>
            <SheetTitle>Sports News Assistant</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex-1 overflow-y-auto py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[80%] ${
                      message.isUser
                        ? 'bg-sports-blue text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="resize-none flex-1"
                  rows={2}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={inputMessage.trim() === ''}
                  className="self-end"
                >
                  <Send size={18} />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send message
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatBot;
