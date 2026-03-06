import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X } from 'lucide-react';
import { Category } from '../lib/types';

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">ContentHub</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <Link to="/" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="text-sm lg:text-base text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <Link to="/about" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
            </nav>

            {/* Desktop Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5" />
              </Link>
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                <User className="w-5 h-5" />
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-600 hover:text-blue-600 transition-colors p-1"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="block text-base text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Home
              </Link>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    onClick={closeMobileMenu}
                    className="block text-base text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-2"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-3">
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="block text-base text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-2"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block text-base text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-2"
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
