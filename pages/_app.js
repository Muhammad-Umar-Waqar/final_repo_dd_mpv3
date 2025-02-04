import '../styles/global.css'
import { DarkModeProvider } from '../utils/DarkModeContext'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-150">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </DarkModeProvider>
  );
}

export default MyApp