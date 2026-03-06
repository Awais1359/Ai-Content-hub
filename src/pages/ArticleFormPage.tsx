import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Category, Database } from '../lib/types';
import { ArrowLeft, Save } from 'lucide-react';

export function ArticleFormPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image_url: '',
    category_id: '',
    published: false,
    featured: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin');
      return;
    }
    fetchCategories();
    if (id && id !== 'new') {
      fetchArticle();
    }
  }, [user, id]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    if (data) {
      setCategories(data as Category[]);
      if (!formData.category_id && data.length > 0) {
        setFormData((prev) => ({ ...prev, category_id: data[0].id }));
      }
    }
  };

  const fetchArticle = async () => {
    if (!id || id === 'new') return;
    const { data, error } = await supabase.from('articles').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Error fetching article:', error);
      return;
    }
    if (data) {
      setFormData(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const articleData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        updated_at: new Date().toISOString(),
      };

      if (id && id !== 'new') {
        const { error } = await supabase.from('articles').update(articleData as Database['public']['Tables']['articles']['Update']).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('articles').insert([articleData as Database['public']['Tables']['articles']['Insert']]);
        if (error) throw error;
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              {id && id !== 'new' ? 'Edit Article' : 'Create New Article'}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Slug (URL-friendly)
            </label>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Leave empty to auto-generate"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Short Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Content (HTML supported)
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={10}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-xs sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="image_url" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Image URL
            </label>
            <input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="category_id" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Category
            </label>
            <select
              id="category_id"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Published</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Featured on Homepage</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Save className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>{loading ? 'Saving...' : 'Save Article'}</span>
            </button>
            <Link
              to="/admin/dashboard"
              className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
