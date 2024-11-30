import { ArrowRight, BarChart3, Shield, Zap, LineChart, Bell, Target, TrendingUp, Database, LayoutDashboard, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Monitor Dashboard Quality</span>
                  <span className="block text-blue-600">Across All Your BI Tools</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  QDT helps you track, analyze, and improve quality metrics across your dashboards from Tableau, Looker, Metabase, and more. Get comprehensive insights into your dashboard performance in real-time.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Request Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Seamless Integration</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Works With Your Favorite BI Tools
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Connect and monitor quality across all your business intelligence platforms
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Tableau Integration</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Monitor quality metrics directly from your Tableau dashboards and workbooks.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Database className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Looker Analytics</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Track and analyze quality across your Looker dashboards and explores.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <GitCompare className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Multi-Platform Support</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Compatible with Metabase, Power BI, and other major BI platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Key Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Dashboard Quality Management
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Monitoring</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Track dashboard quality metrics in real-time across all your BI platforms.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Quality Targets</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Set and track quality targets for your dashboards with customizable thresholds.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Bell className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Smart Alerts</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Get instant notifications when dashboard quality falls below targets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Detailed Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need for Dashboard Quality
            </p>
          </div>

          <div className="space-y-16">
            {/* Performance Tracking */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Dashboard Performance</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Monitor key quality indicators across your dashboards:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Load Time & Performance
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Data Freshness
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Usage Analytics
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Error Rates
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                <LineChart className="w-full h-48 text-blue-500" />
              </div>
            </div>

            {/* Quality Rules */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Advanced Quality Rules</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Create sophisticated dashboard monitoring rules:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Performance Thresholds
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Data Quality Checks
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Usage Pattern Analysis
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Custom Quality Standards
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                <Zap className="w-full h-48 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to improve your dashboard quality?</span>
            <span className="block text-blue-200">Start monitoring your BI platforms today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;