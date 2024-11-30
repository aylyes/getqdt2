import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Contact() {
  const { t } = useTranslation('pages/contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const officeLocations = [
    {
      city: t('offices.paris.city'),
      address: t('offices.paris.address'),
      phone: t('offices.paris.phone'),
      email: t('offices.paris.email'),
      hours: t('offices.paris.hours'),
    },
    {
      city: t('offices.london.city'),
      address: t('offices.london.address'),
      phone: t('offices.london.phone'),
      email: t('offices.london.email'),
      hours: t('offices.london.hours'),
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {t('form.title')}
              </h2>
              <p className="mt-4 text-gray-500">{t('form.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('form.fields.name')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('form.fields.email')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('form.fields.company')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('form.fields.subject')}
                  </label>
                  <div className="mt-1">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">{t('form.fields.subject')}</option>
                      <option value="sales">
                        {t('form.fields.options.sales')}
                      </option>
                      <option value="support">
                        {t('form.fields.options.support')}
                      </option>
                      <option value="demo">
                        {t('form.fields.options.demo')}
                      </option>
                      <option value="other">
                        {t('form.fields.options.other')}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('form.fields.message')}
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {t('form.submit')}
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {t('offices.title')}
              </h2>
              <p className="mt-4 text-gray-500">{t('offices.subtitle')}</p>
            </div>

            <div className="mt-8 space-y-6">
              {officeLocations.map((office, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {office.city}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                      <p className="ml-3 text-gray-500">{office.address}</p>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <p className="ml-3 text-gray-500">{office.phone}</p>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <p className="ml-3 text-gray-500">{office.email}</p>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <p className="ml-3 text-gray-500">{office.hours}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
