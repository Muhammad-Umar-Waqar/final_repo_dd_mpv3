import Head from 'next/head';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Login - deDiabetes</title>
        <meta name="description" content="Login to your deDiabetes account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">LOGIN NOW</h1>
          <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4">Welcome back</h2>
          <p className="text-xl text-gray-500">Please enter your details</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="Enter your email*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password*"
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

          <Link
            href="/forgot-password"
            className="block text-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            Forgot password
          </Link>

          <button
            type="submit"
            className="w-full py-3 bg-rose-100 text-black rounded-md hover:bg-rose-200 transition-colors text-lg font-medium"
          >
            Log in
          </button>

          <Link
            href="/register"
            className="block text-center py-3 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors text-lg font-medium"
          >
            Register now
          </Link>
        </form>
      </main>
      <Footer />
    </div>
  );
}