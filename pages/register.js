// pages/register.js
import Head from 'next/head';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Register() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Register - dexdiabetes</title>
        <meta name="description" content="Create your dexdiabetes account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">REGISTER NOW</h1>
          <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4">Create account</h2>
          <p className="text-xl text-gray-500">Please enter your details</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="Full name*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email address*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password*"
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
              placeholder="Confirm password*"
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
            Create account
          </button>

          <p className="text-center text-gray-500">
            Already registered?{' '}
            <Link
              href="/login"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}