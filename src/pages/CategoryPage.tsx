import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArticleWithCategory, Category } from '../lib/types';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowLeft } from 'lucide-react';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<ArticleWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategoryAndArticles();
    }
  }, [slug]);

  const fetchCategoryAndArticles = async () => {
    if (!slug) return;
    try {
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (categoryError) throw categoryError;

      if (categoryData) {
        setCategory(categoryData as Category);

        const { data: articlesData, error: articlesError } = await supabase
          .from('articles')
          .select('*, categories(*)')
          .eq('category_id', categoryData.id)
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (articlesError) throw articlesError;
        setArticles(articlesData as ArticleWithCategory[]);
      }
    } catch (error) {
      console.error('Error fetching category articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 sm:h-12 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-2/3 mb-8 sm:mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-video bg-gray-200"></div>
                  <div className="p-4 sm:p-6">
                    <div className="h-3 bg-gray-200 rounded mb-2 sm:mb-3 w-20"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 sm:mb-8 font-semibold text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">{category.name}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">{category.description}</p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg">No articles found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
