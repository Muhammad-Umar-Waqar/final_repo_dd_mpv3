// pages/register.js
import Head from 'next/head';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { locale } = useTranslations();

  const translations = {
    title: locale === 'es' ? 'REGISTRARSE' : 'REGISTER NOW',
    createAccount: locale === 'es' ? 'Crear cuenta' : 'Create account',
    enterDetails: locale === 'es' ? 'Por favor ingresa tus datos' : 'Please enter your details',
    fullNamePlaceholder: locale === 'es' ? 'Nombre completo*' : 'Full name*',
    emailPlaceholder: locale === 'es' ? 'Correo electrónico*' : 'Email address*',
    passwordPlaceholder: locale === 'es' ? 'Crear contraseña*' : 'Create password*',
    confirmPasswordPlaceholder: locale === 'es' ? 'Confirmar contraseña*' : 'Confirm password*',
    createButton: locale === 'es' ? 'Crear cuenta' : 'Create account',
    alreadyRegistered: locale === 'es' ? '¿Ya estás registrado?' : 'Already registered?',
    loginHere: locale === 'es' ? 'Inicia sesión aquí' : 'Login here'
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${translations.title} - deDiabetes`}</title>
        <meta name="description" content={locale === 'es' ? 'Crea tu cuenta deDiabetes' : 'Create your deDiabetes account'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">{translations.title}</h1>
          <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4">{translations.createAccount}</h2>
          <p className="text-xl text-gray-500">{translations.enterDetails}</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder={translations.fullNamePlaceholder}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder={translations.emailPlaceholder}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={translations.passwordPlaceholder}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={translations.confirmPasswordPlaceholder}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-lg font-medium"
          >
            {translations.createButton}
          </button>

          <p className="text-center text-gray-500">
            {translations.alreadyRegistered}{' '}
            <Link
              href="/login"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {translations.loginHere}
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}