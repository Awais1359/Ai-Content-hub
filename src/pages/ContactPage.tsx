import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">Get In Touch</h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100">
            Have questions or feedback? We'd love to hear from you. Contact us anytime.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <Mail className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-sm sm:text-base text-gray-600 break-all">contact@contenthub.com</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">We respond within 24 hours</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <Phone className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-sm sm:text-base text-gray-600">+1 (555) 123-4567</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">Mon-Fri, 9AM-5PM EST</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <MapPin className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-sm sm:text-base text-gray-600">123 Content Street</p>
              <p className="text-sm sm:text-base text-gray-600">San Francisco, CA 94102</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a Message</h2>
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-3 sm:px-4 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Contact Us?</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Partnerships & Collaborations</h4>
                  <p className="text-gray-600">
                    Interested in working with ContentHub? We're always looking for talented writers and collaborators.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Feedback & Suggestions</h4>
                  <p className="text-gray-600">
                    Your feedback helps us improve. Share your thoughts about our content and platform.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Technical Support</h4>
                  <p className="text-gray-600">
                    Experiencing issues? Our support team is here to help resolve any technical problems.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Content Requests</h4>
                  <p className="text-gray-600">
                    Have a topic you'd like us to cover? Let us know and we might feature it!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
