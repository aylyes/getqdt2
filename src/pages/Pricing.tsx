import { Check, ArrowRight, Shield, Zap, Users, BarChart3, Clock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TierFeatures {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export function Pricing() {
  const { t } = useTranslation('pages/pricing');

  const tiers: TierFeatures[] = [
    {
      name: t('tiers.starter.name'),
      price: t('tiers.starter.price'),
      description: t('tiers.starter.description'),
      features: t('tiers.starter.features', { returnObjects: true }) as string[],
      cta: t('tiers.starter.cta'),
      highlighted: false
    },
    {
      name: t('tiers.professional.name'),
      price: t('tiers.professional.price'),
      description: t('tiers.professional.description'),
      features: t('tiers.professional.features', { returnObjects: true }) as string[],
      cta: t('tiers.professional.cta'),
      highlighted: true
    },
    {
      name: t('tiers.enterprise.name'),
      price: t('tiers.enterprise.price'),
      description: t('tiers.enterprise.description'),
      features: t('tiers.enterprise.features', { returnObjects: true }) as string[],
      cta: t('tiers.enterprise.cta'),
      highlighted: false
    }
  ];

  const features = [
    {
      icon: Shield,
      name: t('features.items.security.title'),
      description: t('features.items.security.description')
    },
    {
      icon: Zap,
      name: t('features.items.monitoring.title'),
      description: t('features.items.monitoring.description')
    },
    {
      icon: Users,
      name: t('features.items.collaboration.title'),
      description: t('features.items.collaboration.description')
    },
    {
      icon: BarChart3,
      name: t('features.items.analytics.title'),
      description: t('features.items.analytics.description')
    },
    {
      icon: Clock,
      name: t('features.items.support.title'),
      description: t('features.items.support.description')
    },
    {
      icon: Settings,
      name: t('features.items.integration.title'),
      description: t('features.items.integration.description')
    }
  ];

  const faqItems = [
    {
      question: t('faq.questions.switch.question'),
      answer: t('faq.questions.switch.answer')
    },
    {
      question: t('faq.questions.payment.question'),
      answer: t('faq.questions.payment.answer')
    },
    {
      question: t('faq.questions.trial.question'),
      answer: t('faq.questions.trial.answer')
    },
    {
      question: t('faq.questions.custom.question'),
      answer: t('faq.questions.custom.answer')
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
        <div className="relative z-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col rounded-2xl ${
                    tier.highlighted
                      ? 'bg-blue-600 text-white shadow-xl scale-105 z-10'
                      : 'bg-white text-gray-900 border border-gray-200'
                  } p-8`}
                >
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {tier.name}
                    </h3>
                    <p className={`mt-4 flex items-baseline ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                      {tier.price !== 'Custom' && <span className="ml-1 text-xl font-semibold">/month</span>}
                    </p>
                    <p className={`mt-6 text-sm ${tier.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                      {tier.description}
                    </p>

                    {/* Feature List */}
                    <ul className="mt-6 space-y-4">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex">
                          <Check className={`flex-shrink-0 h-5 w-5 ${
                            tier.highlighted ? 'text-blue-200' : 'text-blue-500'
                          }`} />
                          <span className={`ml-3 text-sm ${
                            tier.highlighted ? 'text-white' : 'text-gray-500'
                          }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={tier.name === 'Enterprise' ? '/contact' : '/demo'}
                    className={`mt-8 block w-full py-3 px-6 border rounded-lg text-center text-sm font-medium ${
                      tier.highlighted
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors duration-200`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-medium text-gray-900">
                {item.question}
              </h3>
              <p className="mt-2 text-gray-500">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">{t('cta.title')}</span>
            <span className="block text-blue-200">{t('cta.subtitle')}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}