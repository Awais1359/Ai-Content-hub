import { Link } from 'react-router-dom';
import { Category } from '../lib/types';

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">ContentHub</h3>
            <p className="text-sm">
              Your trusted source for quality content on Pets, Health, AI, and Fashion.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`} className="hover:text-blue-400 transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@contenthub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-400">
                &copy; 2026 ContentHub. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Developed by Awais Rao
              </p>
            </div>
            <div className="flex space-x-6 text-sm mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}