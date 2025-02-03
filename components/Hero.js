// components/Hero.js
const Hero = () => {
  return (
    <main className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          <span className="text-primary">Stay informed.</span>{' '}
          <span className="text-primary">Stay ahead.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
        Subscribe now for AI-powered insights, the latest breakthroughs, and expert updates in diabetes care—delivered straight to your inbox.
        </p>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;