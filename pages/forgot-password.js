import { useState } from "react";
import { useTranslations } from "../utils/i18n";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const { locale } = useTranslations();

  async function handleSubmit(e) {
    e.preventDefault();
    if (isDisabled) return;

    setIsDisabled(true);
    setTimer(30);

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email, locale }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMessage(data.message);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const translations = {
    title: locale === "es" ? "¿Olvidaste tu contraseña?" : "Forgot Password",
    emailPlaceholder: locale === "es" ? "Ingresa tu correo electrónico" : "Enter your email",
    wait: locale === "es" ? "Por favor, espera" : "Wait",
    ResetLink: locale === "es" ? "Enviar enlace de restablecimiento" : "Send Reset Link",
  };

  return (
 

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
      {translations.title}
    </h2>

    <form onSubmit={handleSubmit} className="mt-6">
      <input
        type="email"
        placeholder={translations.emailPlaceholder}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        className={`w-full mt-4 p-3 font-medium text-white rounded-lg transition-all duration-200 ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-opacity-90 shadow-md hover:shadow-lg"
        }`}
        disabled={isDisabled}
      >
        {isDisabled ? `${translations.wait} ${timer}s` : translations.ResetLink}
      </button>
    </form>

    {message && (
      <p
        className={`mt-4 p-3 text-center text-sm font-medium rounded-lg ${
          message.includes("sent") || message.includes("enviado")
            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
            : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
        }`}
      >
        {message}
      </p>
    )}
  </div>
</div>
  );
}
