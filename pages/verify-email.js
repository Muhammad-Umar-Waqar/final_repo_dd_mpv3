import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslations } from "../utils/i18n";

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("loading");
  const {locale} = useTranslations();

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, router]);

  const messages = {
    loading: {
      en: "Verifying your email...",
      es: "Verificando tu correo electrónico...",
    },
    success: {
      en: "Email verified! Redirecting to login...",
      es: "¡Correo verificado! Redirigiendo al inicio de sesión...",
    },
    error: {
      en: (
        <>
          Invalid or expired token. <Link href="/resend-verification" className="text-blue-500 hover:underline">Resend verification email</Link>.
        </>
      ),
      es: (
        <>
          Token inválido o expirado. <Link href="/resend-verification" className="text-blue-500 hover:underline">Reenviar correo de verificación</Link>.
        </>
      ),
    },
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        {status === "loading" && <p className="text-gray-600 dark:text-gray-300">{messages.loading[locale]}</p>}
        {status === "success" && <p className="text-green-600 dark:text-green-400 font-semibold">{messages.success[locale]}</p>}
        {status === "error" && <p className="text-red-600 dark:text-red-400 font-semibold">{messages.error[locale]}</p>}
      </div>
    </div>
  );
}
