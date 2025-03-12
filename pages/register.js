// pages/register.js
import Head from 'next/head';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";


export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    loginHere: locale === 'es' ? 'Inicia sesión aquí' : 'Login here',
    passwordCheck: locale === 'es' ? 'La contraseña debe tener al menos 8 caracteres' : 'Password must be at least 8 characters long',
    passwordMatch: locale === 'es' ? 'Las contraseñas no coinciden' : 'Password do not macthed'
  };
 
  const passwordRegex = /^.{8,}$/;


  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage(translations.passwordMatch);
      setLoading(false);
      return;
    }

    // Validate password strength
  if (!passwordRegex.test(formData.password)) {
    setMessage(
      translations.passwordCheck
    );
    setLoading(false);
    return;
  }
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "basic", // Adjust as needed,
          locale
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed.");

      setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
      
      if (res.ok) {
        setMessage(data.message);
        // ✅ Auto sign-in after successful registration
        const signInResponse = await signIn("credentials", {
          redirect: false, 
          email: formData.email,
          password: formData.password,
        });
        if (!signInResponse?.error) {
          // router.push("/premium"); // Redirect after successful sign-in
          if (typeof window !== 'undefined') {
            window.location.href = "/premium"; // Redirect to /home on successful login
          }                           
        } else {
          setMessage(data.message);
        }
      }
        // router.push(data.redirectUrl);

    } catch (error) {
      setMessage(error.message || data.message);
    }

    setLoading(false);
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

<form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={translations.fullNamePlaceholder}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={translations.emailPlaceholder}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={translations.passwordPlaceholder}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder={translations.confirmPasswordPlaceholder}
          className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showConfirmPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
        </button>
      </div>

      {message && (
  <p className={`mt-4 text-center text-sm font-medium ${message.includes("exitoso") || message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
    {message}
  </p>
)}


      <button
        type="submit"
        className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-lg font-medium"
        disabled={loading}
      >
        {loading ? "Processing..." : translations.createButton}
      </button>

      <p className="text-center text-gray-500">
        {translations.alreadyRegistered}{" "}
        <Link href="/login" className="text-red-600 hover:text-red-700 font-medium">
          {translations.loginHere}
        </Link>
      </p>
    </form>
      </main>
      <Footer />
    </div>
  );
}