import { Users, Target, LineChart, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export function About() {
  const { t } = useTranslation('pages/about');

  const testimonials = t('testimonials.items', {
    returnObjects: true,
  }) as Testimonial[];
  const milestones = Object.entries(
    t('journey.milestones', { returnObjects: true })
  );

  // Default images for testimonials
  const testimonialImages = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('mission.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('mission.subtitle')}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t('mission.description')}
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {t('mission.sections.vision.title')}
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  {t('mission.sections.vision.description')}
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {t('mission.sections.values.title')}
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  {t('mission.sections.values.description')}
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <LineChart className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {t('mission.sections.impact.title')}
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  {t('mission.sections.impact.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('journey.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('journey.subtitle')}
            </p>
          </div>

          <div className="relative">
            {milestones.map(([year, milestone], index) => (
              <div key={year} className="relative pb-8">
                {index !== milestones.length - 1 && (
                  <div
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></div>
                )}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                      <span className="text-white text-sm font-medium">
                        {year.slice(2)}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 py-0">
                    <div className="text-lg font-medium text-gray-900">
                      {milestone.title}
                    </div>
                    <div className="mt-1 text-gray-500">
                      {milestone.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              {t('testimonials.title')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {Array.isArray(testimonials) &&
              testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-gray-600 mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={`${testimonialImages[index]}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                        alt={testimonial.name}
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
