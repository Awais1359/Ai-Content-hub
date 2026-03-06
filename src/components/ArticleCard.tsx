import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { ArticleWithCategory } from '../lib/types';

interface ArticleCardProps {
  article: ArticleWithCategory;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/article/${article.slug}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {article.categories.name}
          </span>
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(article.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>

        <Link to={`/article/${article.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {article.description}
        </p>

        <Link
          to={`/article/${article.slug}`}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
        >
          Read More
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
