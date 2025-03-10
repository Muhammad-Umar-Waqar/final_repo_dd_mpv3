import '../styles/global.css'
import { ThemeProvider } from "next-themes";
import Navbar from '../components/Navbar'
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-150">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp