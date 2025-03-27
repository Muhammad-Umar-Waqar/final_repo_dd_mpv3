import { useState } from 'react';
import { useTranslations } from '../utils/i18n';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { t, locale } = useTranslations();

  const validateFields = () => {
    if (!formData.name || !formData.email || !formData.message) {
      return locale === "es" 
        ? "Todos los campos son obligatorios." 
        : "All fields are required.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate fields on the frontend
    const validationError = validateFields();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    // Include locale in the payload
    const payload = { ...formData, locale };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Message sent successfully!");
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Show error message returned from the API
        setErrorMessage(data.message || (locale === "es" ? "Error en el envío." : "Error sending message."));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage(locale === "es" ? "Error al enviar el mensaje." : "Error sending message.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="mt-12">
          {submitted ? (
            <div className="rounded-md bg-green-50 dark:bg-green-900 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {t('contact.success')}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              {errorMessage && (
                <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    {errorMessage}
                  </p>
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.name')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="px-2 py-2 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.email')}
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow-sm px-2 py-2 focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('contact.form.message')}
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="shadow-sm px-2 py-2 focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (t('contact.form.loadingSubmit')) : t('contact.form.submit')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
