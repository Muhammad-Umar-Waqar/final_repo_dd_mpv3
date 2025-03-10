import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react"; // Import icons
import { useTranslations } from "../utils/i18n";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { locale } = useTranslations();
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    if (!token) {
      setMessage(locale === "es" ? "Token no encontrado" : "Token not found");
      setIsSubmitting(false);
      return;
    }

    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale, // Send the language header
      },
    });

    const data = await res.json();
    setMessage(data.message);
    setNewPassword(""); // Clear password field after submission
    setIsSubmitting(false);

    if(res.ok) router.push('/login');
  }

  const translations = {
    title: locale === "es" ? "Restablecer Contraseña" : "Reset Password",
    passwordPlaceholder: locale === "es" ? "Ingrese nueva contraseña" : "Enter new password",
    resetting: locale === "es" ? "Restableciendo..." : "Resetting...",
    resetPassword: locale === "es" ? "Restablecer Contraseña" : "Reset Password",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
        {translations.title}
      </h2>
  
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={translations.passwordPlaceholder}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none pr-12"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
          </button>
        </div>
  
        <button
          type="submit"
          className={`w-full mt-4 p-3 font-medium text-white rounded-lg transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-opacity-90 shadow-md hover:shadow-lg"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? translations.resetting : translations.resetPassword}
        </button>
      </form>
  
      {message && (
        <p
          className={`mt-4 p-3 text-center text-sm font-medium rounded-lg ${
            message.includes("success")
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