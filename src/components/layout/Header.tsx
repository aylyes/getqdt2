import { BarChart3, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">QDT</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">
              {t('navigation.features')}
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              {t('navigation.about')}
            </Link>
            <Link to="/docs" className="text-gray-600 hover:text-gray-900">
              {t('navigation.docs')}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              {t('navigation.contact')}
            </Link>
            <LanguageSwitcher />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/cloud" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  {t('navigation.cloud')}
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  {t('navigation.logout')}
                </button>
              </div>
            ) : (
              <Link to="/cloud" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                {t('navigation.cloud')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/features"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {t('navigation.features')}
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {t('navigation.about')}
              </Link>
              <Link
                to="/docs"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {t('navigation.docs')}
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {t('navigation.contact')}
              </Link>
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cloud"
                    className="block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {t('navigation.cloud')}
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {t('navigation.logout')}
                  </button>
                </>
              ) : (
                <Link
                  to="/cloud"
                  className="block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t('navigation.cloud')}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}