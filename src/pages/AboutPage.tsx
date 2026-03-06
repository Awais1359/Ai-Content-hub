import { Heart, Globe, Zap } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">About ContentHub</h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl">
            Your trusted source for insightful articles on Pets, Health, AI, and Fashion.
            We're committed to delivering quality content that informs, inspires, and empowers.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Passionate About Content</h3>
              <p className="text-sm sm:text-base text-gray-600">
                We believe in creating meaningful, well-researched articles that educate and inspire our readers across multiple topics.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <Globe className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our platform connects readers worldwide, sharing diverse perspectives and expert knowledge on topics that matter.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <Zap className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Always Evolving</h3>
              <p className="text-sm sm:text-base text-gray-600">
                We stay ahead of trends and continuously update our content to reflect the latest developments in our categories.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              ContentHub is dedicated to democratizing knowledge and making quality information accessible to everyone.
              We cover four essential categories that impact daily life: Pets, Health, Artificial Intelligence, and Fashion.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              Our team of expert writers and contributors research thoroughly to bring you accurate, engaging, and actionable content.
              Whether you're a pet owner seeking care tips, a health enthusiast, an AI enthusiast, or a fashion-forward individual,
              ContentHub has something for you.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              We believe in the power of information to transform lives. Our content is designed to educate, entertain, and empower
              our readers to make informed decisions about the topics that matter most to them.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Our Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pets</h3>
                <p className="text-gray-600">Comprehensive guides for pet care, training, nutrition, and creating a happy home for your furry friends.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Health</h3>
                <p className="text-gray-600">Expert health advice covering fitness, nutrition, mental wellness, and preventive care.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI</h3>
                <p className="text-gray-600">Insights into artificial intelligence, machine learning, and how AI is shaping our future.</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-600">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fashion</h3>
                <p className="text-gray-600">Style tips, trend forecasts, and guides to help you express your unique fashion sense.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
