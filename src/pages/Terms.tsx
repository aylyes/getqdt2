import { Scale, Shield, Clock, Globe, AlertCircle, HelpCircle } from 'lucide-react';

export function Terms() {
  const sections = [
    {
      icon: Scale,
      title: "Terms of Service",
      content: `By accessing and using QDT's dashboard quality monitoring platform, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.`
    },
    {
      icon: Shield,
      title: "Account Terms",
      content: `• You must be 18 years or older to use this service
        • You must provide accurate and complete registration information
        • You are responsible for maintaining the security of your account
        • You are responsible for all activities that occur under your account
        • You must notify us immediately of any unauthorized use of your account`
    },
    {
      icon: Clock,
      title: "Service Availability",
      content: `• We strive to maintain 99.9% service uptime
        • We reserve the right to modify or discontinue the service with 30 days notice
        • We may perform maintenance with advance notice
        • Service availability may vary by region and network conditions`
    },
    {
      icon: AlertCircle,
      title: "Acceptable Use",
      content: `You agree not to:
        • Violate any laws or regulations
        • Infringe on intellectual property rights
        • Transmit malicious code or interfere with the service
        • Attempt to gain unauthorized access to any part of the service
        • Use the service for any illegal or unauthorized purpose`
    },
    {
      icon: Globe,
      title: "Data Rights",
      content: `• You retain all rights to your data
        • We claim no ownership over your data
        • You grant us license to host and process your data
        • You are responsible for the legality of your data
        • We may remove content that violates these terms`
    },
    {
      icon: HelpCircle,
      title: "Support and Updates",
      content: `• We provide technical support via email and documentation
        • We regularly update the service with improvements
        • We may modify these terms with notice
        • Changes to terms will be effective upon posting
        • Continued use constitutes acceptance of changes`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Terms of Service
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Last updated: March 20, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <p className="text-gray-600 leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of QDT's dashboard quality monitoring platform and services. Please read these Terms carefully before using our services. By using our services, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <section.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 space-y-2 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-600 mb-4">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• By email: legal@qdt.com</li>
            <li>• By phone: +1 (555) 123-4567</li>
            <li>• By mail: 100 Market Street, Suite 300, San Francisco, CA 94105</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Terms;