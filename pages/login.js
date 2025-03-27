// pages/login.js
import Head from 'next/head';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { locale } = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirect
    });
    console.log("result:", result)

    if (result?.error) {
      setError(result.error);
    }
    if(result.status == 200 || !result.error ){
      if (typeof window !== 'undefined') {
        window.location.href = "/"; // Redirect to /home on successful login
      }
    }
  };

  const translations = {
    title: locale === 'es' ? 'INICIAR SESIÓN' : 'LOGIN NOW',
    welcome: locale === 'es' ? 'Bienvenido de nuevo' : 'Welcome back',
    enterDetails: locale === 'es' ? 'Por favor ingresa tus datos' : 'Please enter your details',
    emailPlaceholder: locale === 'es' ? 'Ingresa tu correo*' : 'Enter your email*',
    passwordPlaceholder: locale === 'es' ? 'Ingresa tu contraseña*' : 'Enter your password*',
    forgotPassword: locale === 'es' ? '¿Olvidaste tu contraseña?' : 'Forgot password',
    loginButton: locale === 'es' ? 'Iniciar sesión' : 'Log in',
    registerButton: locale === 'es' ? 'Registrarse ahora' : 'Register now',
  };

  const errorMessages = {
    "User not found": {
      en: "User not found",
      es: "Usuario no encontrado",
    },
    "Invalid credentials": {
      en: "Invalid credentials",
      es: "Credenciales inválidas",
    },
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${translations.title} - deDiabetes`}</title>
        <meta name="description" content={locale === 'es' ? 'Inicia sesión en tu cuenta deDiabetes' : 'Login to your deDiabetes account'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">{translations.title}</h1>
          <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4">{translations.welcome}</h2>
          <p className="text-xl text-gray-500">{translations.enterDetails}</p>
        </div>
         <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder={translations.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={translations.passwordPlaceholder}
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <IconEyeOff className="w-5 h-5" />
          ) : (
            <IconEye className="w-5 h-5" />
          )}
        </button>
      </div>


{error && (
  <p className="text-red-500 text-sm text-center">
    {errorMessages[error]?.[locale] || error}
  </p>
)}


      <Link
        href="/forgot-password"
        className="block text-center text-blue-500 hover:text-blue-600 transition-colors"
      >
        {translations.forgotPassword}
      </Link>

      <button
        type="submit"
        className="w-full py-3 bg-rose-100 text-black rounded-md hover:bg-rose-200 transition-colors text-lg font-medium"
      >
        {translations.loginButton}
      </button>

      <Link
        href="/register"
        className="block text-center py-3 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors text-lg font-medium"
      >
        {translations.registerButton}
      </Link>
    </form>
      </main>
      <Footer />
    </div>
  );
}