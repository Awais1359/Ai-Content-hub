import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArticleWithCategory } from '../lib/types';
import { ArticleCard } from '../components/ArticleCard';
import { TrendingUp } from 'lucide-react';

export function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState<ArticleWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) throw error;
      setFeaturedArticles(data as ArticleWithCategory[]);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative min-h-[400px] sm:min-h-[500px] md:h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-12 sm:py-16 md:py-0">
          <div className="max-w-3xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Discover Knowledge Across Pets, Health & AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
              Expert insights, in-depth articles, and the latest trends delivered daily.
              Explore topics that matter to you and expand your understanding.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#featured"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg text-center sm:text-left"
              >
                Explore Articles
              </a>
              <a
                href="/search"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors text-center sm:text-left"
              >
                Search Topics
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Articles</h2>
              <p className="text-sm sm:text-base text-gray-600">Handpicked stories from our expert contributors</p>
            </div>
            <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 flex-shrink-0" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-3 w-20"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
