import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArticleWithCategory } from '../lib/types';
import { ArticleCard } from '../components/ArticleCard';
import { Search } from 'lucide-react';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ArticleWithCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch();
      } else {
        setArticles([]);
        setSearched(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const performSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .eq('published', true)
        .or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data as ArticleWithCategory[]);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-8 text-center">Search Articles</h1>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-base sm:text-lg"
            />
            <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-3 bg-gray-200 rounded mb-2 sm:mb-3 w-20"></div>
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : searched && articles.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg">No articles found matching "{searchQuery}"</p>
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-600 text-sm sm:text-base">
                Found {articles.length} article{articles.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg">Start typing to search articles...</p>
          </div>
        )}
      </div>
    </div>
  );
}
