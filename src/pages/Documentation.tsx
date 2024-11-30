import { 
  HelpCircle,
  Search,
  ChevronRight,
  BookOpen,
  Settings,
  Shield,
  Bell,
  Play,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Guide {
  title: string;
  icon: React.ElementType;
  description: string;
  articles: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Tutorial {
  title: string;
  duration: string;
  description: string;
}

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation('pages/documentation');

  const guides: Guide[] = [
    {
      title: t('guides.sections.gettingStarted.title'),
      icon: BookOpen,
      description: t('guides.sections.gettingStarted.description'),
      articles: Array.isArray(t('guides.sections.gettingStarted.articles', { returnObjects: true })) 
        ? t('guides.sections.gettingStarted.articles', { returnObjects: true })
        : []
    },
    {
      title: t('guides.sections.configuration.title'),
      icon: Settings,
      description: t('guides.sections.configuration.description'),
      articles: Array.isArray(t('guides.sections.configuration.articles', { returnObjects: true }))
        ? t('guides.sections.configuration.articles', { returnObjects: true })
        : []
    },
    {
      title: t('guides.sections.security.title'),
      icon: Shield,
      description: t('guides.sections.security.description'),
      articles: Array.isArray(t('guides.sections.security.articles', { returnObjects: true }))
        ? t('guides.sections.security.articles', { returnObjects: true })
        : []
    },
    {
      title: t('guides.sections.monitoring.title'),
      icon: Bell,
      description: t('guides.sections.monitoring.description'),
      articles: Array.isArray(t('guides.sections.monitoring.articles', { returnObjects: true }))
        ? t('guides.sections.monitoring.articles', { returnObjects: true })
        : []
    }
  ];

  const faqItems: FAQItem[] = Object.entries(
    t('faq.questions', { returnObjects: true }) || {}
  ).map(([_, value]: [string, any]) => ({
    question: value?.question || '',
    answer: value?.answer || ''
  }));

  const tutorialItems = t('tutorials.items', { returnObjects: true });
  const tutorials: Tutorial[] = Array.isArray(tutorialItems) ? tutorialItems : [];

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.articles.some((article) =>
        article.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* User Guides */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('guides.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('guides.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {filteredGuides.map((guide, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <guide.icon className="h-6 w-6" />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{guide.description}</p>
                <ul className="space-y-3">
                  {guide.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link
                        to={`/docs/${guide.title.toLowerCase()}/${article
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <ChevronRight className="h-4 w-4 mr-2" />
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('faq.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {filteredFAQ.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      {item.question}
                    </h4>
                    <p className="mt-2 text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Tutorials */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('tutorials.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('tutorials.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      index + 1
                    }?auto=format&fit=crop&w=500&q=60`}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600">{tutorial.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">{t('support.title')}</span>
            <span className="block text-blue-200">{t('support.subtitle')}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                {t('support.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
