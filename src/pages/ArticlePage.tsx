import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArticleWithCategory } from '../lib/types';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleWithCategory | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    if (!slug) return;
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setArticle(data as ArticleWithCategory);
        fetchRelatedArticles(data.category_id, data.id);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (categoryId: string, currentArticleId: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .eq('published', true)
        .eq('category_id', categoryId)
        .neq('id', currentArticleId)
        .limit(3);

      if (error) throw error;
      setRelatedArticles(data as ArticleWithCategory[]);
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="aspect-video bg-gray-200 rounded-lg mb-6 sm:mb-8"></div>
            <div className="space-y-3 sm:space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 sm:mb-8 font-semibold text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full aspect-video object-cover"
            />

            <div className="p-4 sm:p-8 md:p-12">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Link
                  to={`/category/${article.categories.slug}`}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <Tag className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span>{article.categories.name}</span>
                </Link>
                <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                  {new Date(article.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed border-l-4 border-blue-600 pl-4">
                {article.description}
              </p>

              <div
                className="prose prose-sm sm:prose md:prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
