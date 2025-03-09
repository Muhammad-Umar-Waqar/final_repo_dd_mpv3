import { useState } from "react";
import { useTranslations } from "../utils/i18n";

export default function ResendVerification() {
  const { t, locale } = useTranslations();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  const translations = {
    enterEmail: locale === "es" ? "Introduce tu correo electrónico" : "Enter your email",
    resend: locale === "es" ? "Reenviar" : "Resend",
    userVerified: locale === "es" ? "El usuario ya está verificado" : "User is already verified",
    emailSent: locale === "es"
      ? "¡Correo de verificación reenviado con éxito!"
      : "Verification email resent successfully!",
    errorResending: locale === "es"
      ? "Error al reenviar el correo electrónico"
      : "Error resending email",
    wait: locale === "es" ? "Espera " : "Wait ",
    seconds: locale === "es" ? " segundos" : " seconds",
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (timer > 0) return; // Prevent multiple clicks

    const response = await fetch("/api/auth/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, locale }),
    });

    const data = await response.json();

    if (data.message === translations.userVerified) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }

    setMessage(data.message);

    if (!isVerified && response.ok) {
      setTimer(30); // Start 30s countdown
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) clearInterval(countdown);
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
          {translations.resend}
        </h1>

        <form onSubmit={handleResend} className="mt-6">
          <input
            type="email"
            placeholder={translations.enterEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          
          <button
            type="submit"
            className={`w-full mt-4 p-3 font-medium text-white rounded-lg transition-all duration-200 ${
              timer > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-opacity-90 shadow-md hover:shadow-lg"
            }`}
            disabled={timer > 0}
          >
            {timer > 0 ? `${translations.wait} ${timer} ${translations.seconds}` : translations.resend}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 p-3 text-center text-sm font-medium rounded-lg ${
              isVerified ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200" : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
