import {
  Bell,
  GitCompare,
  CheckCircle2,
  AlertCircle,
  Settings,
  RefreshCw,
  Activity,
  Lock,
  Gauge,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Features() {
  const { t } = useTranslation('pages/features');

  const mainFeatures = [
    {
      title: t('sections.main.realTimeMonitoring.title'),
      description: t('sections.main.realTimeMonitoring.description'),
      icon: Activity,
      details: [
        t('sections.main.realTimeMonitoring.details.tracking'),
        t('sections.main.realTimeMonitoring.details.alerts'),
        t('sections.main.realTimeMonitoring.details.analytics'),
        t('sections.main.realTimeMonitoring.details.healthChecks'),
      ],
    },
    {
      title: t('sections.main.multiPlatform.title'),
      description: t('sections.main.multiPlatform.description'),
      icon: GitCompare,
      details: [
        t('sections.main.multiPlatform.details.tableau'),
        t('sections.main.multiPlatform.details.looker'),
        t('sections.main.multiPlatform.details.powerbi'),
        t('sections.main.multiPlatform.details.custom'),
      ],
    },
    {
      title: t('sections.main.smartAlerting.title'),
      description: t('sections.main.smartAlerting.description'),
      icon: Bell,
      details: [
        t('sections.main.smartAlerting.details.thresholds'),
        t('sections.main.smartAlerting.details.priority'),
        t('sections.main.smartAlerting.details.rootCause'),
        t('sections.main.smartAlerting.details.recommendations'),
      ],
    },
    {
      title: t('sections.main.performance.title'),
      description: t('sections.main.performance.description'),
      icon: Gauge,
      details: [
        t('sections.main.performance.details.loadTime'),
        t('sections.main.performance.details.usage'),
        t('sections.main.performance.details.resources'),
        t('sections.main.performance.details.optimization'),
      ],
    },
  ];

  const technicalFeatures = [
    {
      title: t('sections.technical.security.title'),
      icon: Lock,
      description: t('sections.technical.security.description'),
      benefits: [
        t('sections.technical.security.benefits.sso'),
        t('sections.technical.security.benefits.rbac'),
        t('sections.technical.security.benefits.audit'),
        t('sections.technical.security.benefits.encryption'),
      ],
    },
    {
      title: t('sections.technical.rules.title'),
      icon: Settings,
      description: t('sections.technical.rules.description'),
      benefits: [
        t('sections.technical.rules.benefits.builder'),
        t('sections.technical.rules.benefits.templates'),
        t('sections.technical.rules.benefits.metrics'),
        t('sections.technical.rules.benefits.chaining'),
      ],
    },
    {
      title: t('sections.technical.testing.title'),
      icon: RefreshCw,
      description: t('sections.technical.testing.description'),
      benefits: [
        t('sections.technical.testing.benefits.scheduled'),
        t('sections.technical.testing.benefits.regression'),
        t('sections.technical.testing.benefits.load'),
        t('sections.technical.testing.benefits.validation'),
      ],
    },
  ];

  const competitiveComparison = [
    {
      feature: t('comparison.realTime.title'),
      qdt: true,
      others: false,
      description: t('comparison.realTime.description'),
    },
    {
      feature: t('comparison.multiPlatform.title'),
      qdt: true,
      others: false,
      description: t('comparison.multiPlatform.description'),
    },
    {
      feature: t('comparison.alerts.title'),
      qdt: true,
      others: true,
      description: t('comparison.alerts.description'),
    },
    {
      feature: t('comparison.rules.title'),
      qdt: true,
      others: false,
      description: t('comparison.rules.description'),
    },
    {
      feature: t('comparison.performance.title'),
      qdt: true,
      others: true,
      description: t('comparison.performance.description'),
    },
    {
      feature: t('comparison.testing.title'),
      qdt: true,
      others: false,
      description: t('comparison.testing.description'),
    },
  ];

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

      {/* Main Features Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('sections.core.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('sections.core.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center text-gray-600"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('sections.technical.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('sections.technical.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {technicalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-center text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600 text-center">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-gray-600"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Demo Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('demo.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('demo.subtitle')}
            </p>
          </div>

          <div className="relative bg-gray-900 rounded-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Dashboard Analytics"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('demo.cta.title')}
                </h3>
                <Link
                  to="/demo"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t('demo.cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('comparison.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('comparison.subtitle')}
            </p>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t('comparison.columns.feature')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    QDT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t('comparison.columns.others')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t('comparison.columns.details')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {competitiveComparison.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.qdt ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.others ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
