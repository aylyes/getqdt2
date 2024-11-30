import { Shield, Lock, Eye, Users, Database, Globe } from 'lucide-react';

export function Privacy() {
  const sections = [
    {
      icon: Shield,
      title: "Data Protection",
      content: `We take the protection of your data seriously. All data is encrypted both in transit and at rest using industry-standard encryption protocols. We regularly update our security measures to ensure your data remains protected against emerging threats.`
    },
    {
      icon: Lock,
      title: "Information Collection",
      content: `We collect information that you provide directly to us, including:
        • Account information (name, email, company details)
        • Dashboard configuration and metadata
        • Usage analytics and preferences
        • Technical data about your devices and systems`
    },
    {
      icon: Eye,
      title: "Data Usage",
      content: `Your data is used solely for:
        • Providing and improving our services
        • Communicating with you about your account
        • Sending relevant product updates and newsletters
        • Analyzing service performance and usage patterns`
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: `We do not sell your personal data. We may share your information with:
        • Service providers who assist in our operations
        • When required by law or to protect our rights
        • With your explicit consent`
    },
    {
      icon: Database,
      title: "Data Retention",
      content: `We retain your data for as long as your account is active or as needed to provide services. You can request data deletion at any time, subject to legal requirements and legitimate business purposes.`
    },
    {
      icon: Globe,
      title: "International Transfers",
      content: `We may transfer your data internationally. All transfers comply with relevant data protection laws and utilize appropriate safeguards to protect your information.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Privacy Policy
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
            This Privacy Policy describes how QDT ("we", "our", or "us") collects, uses, and shares your personal information when you use our dashboard quality monitoring platform. By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Policy Sections */}
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

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• By email: privacy@qdt.com</li>
            <li>• By phone: +1 (555) 123-4567</li>
            <li>• By mail: 100 Market Street, Suite 300, San Francisco, CA 94105</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Privacy;