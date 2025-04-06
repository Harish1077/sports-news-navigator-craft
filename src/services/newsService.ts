
import axios from 'axios';

// Mock data for development
const mockSportsNews = {
  articles: [
    {
      id: 1,
      title: "Lakers Defeat Warriors in Overtime Thriller",
      description: "LeBron James scores 38 points to lead Lakers past Warriors 121-118 in an intense overtime battle at Staples Center.",
      urlToImage: "https://picsum.photos/id/29/800/600",
      publishedAt: "2025-04-05T15:30:00Z",
      source: { name: "ESPN" },
      category: "basketball",
      url: "#article-link"
    },
    {
      id: 2,
      title: "Manchester United Signs New Striker in Record Deal",
      description: "Manchester United has completed the signing of Norwegian striker in a deal worth €95 million, breaking club records.",
      urlToImage: "https://picsum.photos/id/46/800/600",
      publishedAt: "2025-04-05T14:15:00Z",
      source: { name: "Sky Sports" },
      category: "soccer",
      url: "#article-link"
    },
    {
      id: 3,
      title: "Serena Williams Announces Return to Tennis",
      description: "23-time Grand Slam champion Serena Williams announces her return to professional tennis after an 18-month hiatus.",
      urlToImage: "https://picsum.photos/id/26/800/600",
      publishedAt: "2025-04-05T10:45:00Z",
      source: { name: "Tennis World" },
      category: "tennis",
      url: "#article-link"
    },
    {
      id: 4,
      title: "Chiefs Prepare for Season Opener Against Ravens",
      description: "Kansas City Chiefs intensify training as they prepare for NFL season opener against the Baltimore Ravens next week.",
      urlToImage: "https://picsum.photos/id/60/800/600",
      publishedAt: "2025-04-04T21:20:00Z",
      source: { name: "NFL Network" },
      category: "football",
      url: "#article-link"
    },
    {
      id: 5,
      title: "Max Verstappen Wins Formula 1 Monaco Grand Prix",
      description: "Red Bull's Max Verstappen secures his fourth consecutive win of the season at the challenging Monaco street circuit.",
      urlToImage: "https://picsum.photos/id/111/800/600",
      publishedAt: "2025-04-04T18:50:00Z",
      source: { name: "Formula 1" },
      category: "motorsports",
      url: "#article-link"
    },
    {
      id: 6,
      title: "New York Yankees Break Home Run Record",
      description: "The Yankees hit eight home runs in a single game, setting a new franchise record during their victory against the Red Sox.",
      urlToImage: "https://picsum.photos/id/43/800/600",
      publishedAt: "2025-04-04T16:15:00Z",
      source: { name: "MLB" },
      category: "baseball",
      url: "#article-link"
    },
    {
      id: 7,
      title: "Tokyo Olympics to Introduce Four New Sports",
      description: "The International Olympic Committee confirms the addition of four new sports for the next Olympic Games in Tokyo.",
      urlToImage: "https://picsum.photos/id/36/800/600",
      publishedAt: "2025-04-03T22:30:00Z",
      source: { name: "Olympic Channel" },
      category: "olympics",
      url: "#article-link"
    },
    {
      id: 8,
      title: "Golf Star Wins Masters Tournament in Dramatic Fashion",
      description: "Young golf sensation wins the Masters by two strokes after an eagle on the final hole, earning his first major title.",
      urlToImage: "https://picsum.photos/id/82/800/600",
      publishedAt: "2025-04-03T20:10:00Z",
      source: { name: "Golf Digest" },
      category: "golf",
      url: "#article-link"
    }
  ]
};

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
  url: string;
}

interface NewsResponse {
  articles: NewsArticle[];
}

// In a real implementation, this would call an actual API
// For now, we're returning mock data
export const fetchSportsNews = async (): Promise<NewsResponse> => {
  // For development, return mock data
  return Promise.resolve(mockSportsNews);
  
  // In production, you would use:
  // const response = await axios.get('https://your-news-api-endpoint/sports');
  // return response.data;
};

export const getSportCategories = (): string[] => {
  const categories = mockSportsNews.articles.map(article => article.category);
  return [...new Set(categories)]; // Return unique categories
};

export { type NewsArticle };
