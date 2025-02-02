import React, { useState } from 'react';
import { IconChevronUp, IconPhoto, IconFileAnalytics, IconFileTextAi, IconClock } from '@tabler/icons-react';
import DiscussionsSection from '../DiscussionsSection.js';
import RelatedPosts from './RelatedPosts';

const BlogPost = ({
  title = "Understanding Artificial Pancreas Systems: Results from a 24-Month Trial",
  author = "Dr. Sarah Johnson",
  publishDate = "January 31, 2025",
  readTime = "8 min read",
  summary = "baba baba baba",
  studyDesign = {
    interventions: ["Continuous Monitoring", "Smart Insulin"],
    outcomes:["outcome 1", "outcome 2"],
    studyType: "Randomized Controlled Trial",
    duration: "24 Months",
    size: "500 Participants"
  },
  studyPopulation = {
    ageRange: "18-65 years",
    sex: "All genders",
    geography: ["Multi-center US", "Europe"],
    others: ["Type 1 Diabetes", "5+ years diagnosed"]
  },
  methodology = `The study employed a rigorous methodological framework to ensure data reliability and validity. 
    Participants were randomly assigned to treatment groups using a computer-generated algorithm.`,
  interventions = `The intervention protocol consisted of a multi-component diabetes management system integrating 
    continuous glucose monitoring with automated insulin delivery.`,
  keyFindings = `The study revealed significant improvements in glycemic control among intervention group 
    participants. Key outcomes included a 35% reduction in hypoglycemic events.`,
    comparison = `The study revealed significant improvements in glycemic control among intervention group 
    participants. Key outcomes included a 35% reduction in hypoglycemic events.`,
    biasScore = "Moderate",
  effectivenessAnalysis = {
    intervention: "AI-Driven Monitoring",
    effectiveness: "Moderate"
  },
  journalReference = {
    full: "daba daba daba"
  },
  expertCards = [],
  onlineCards = [],
  redditCards = [],
  studyCards = [],
  xCards = [],
  youtubeCards = [],
  relatedPosts = []
}) => {
  // Back to top button visibility state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Back to top button */}
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
        >
          <IconChevronUp className="w-6 h-6" />
        </button>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <IconPhoto className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{author}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>{publishDate}</time>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <IconClock className="w-4 h-4" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {studyDesign.interventions.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-16">
          <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
            <IconPhoto className="w-12 h-12 text-muted-foreground" />
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground text-center">
            Study visualization of the automated insulin delivery system
          </figcaption>
        </figure>
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            <p>{summary}</p>
          </section>

        {/* Study Design Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Study Design</h2>
          <div className="bg-secondary/5 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Interventions</h3>
                <div className="flex flex-wrap gap-2">
                  {studyDesign.interventions.map((intervention, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {intervention}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Study Type</h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {studyDesign.studyType}
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Outcomes</h3>
                <div className="flex flex-wrap gap-2">
                  {studyDesign.outcomes.map((outcome, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>  
              <div>
                <h3 className="font-medium mb-2">Duration</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {studyDesign.duration}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {studyDesign.size}
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* Study Population Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Study Population</h2>
          <div className="bg-secondary/5 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Age Range</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {studyPopulation.ageRange}
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Sex</h3>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                  {studyPopulation.sex}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Geography</h3>
              <div className="flex flex-wrap gap-2">
                {studyPopulation.geography.map((location, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {location}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Other Criteria</h3>
              <div className="flex flex-wrap gap-2">
                {studyPopulation.others.map((criterion, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {criterion}
                  </span>
                ))}
              </div>
            </div>
            
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="prose prose-lg max-w-none mb-16">
          <section>
            <h2>Methodology</h2>
            <p>{methodology}</p>
          </section>

          <section>
            <h2>Interventions</h2>
            <p>{interventions}</p>
          </section>

          <section>
            <h2>Key Findings</h2>
            <p>{keyFindings}</p>
          </section>
          <section>
            <h2>Comparison with other Studies</h2>
            <p>{comparison}</p>
          </section>
        </section>

              {/* Bias Analysis Section - Now in its own centered row */}
              <section>
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary/5 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <IconFileTextAi className="w-6 h-6" />
                <h2 className="text-xl font-bold">Bias Analysis Score </h2>
              </div>
              <div className="flex justify-center">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {biasScore}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="prose prose-lg max-w-none">
          <section>
            <div className="flex mb-4 ">
            <h2>Effectiveness Analysis</h2></div>
          
            <div className="space-y-5 bg-secondary/5 rounded-lg p-6  ">
            
              <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Intervention:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {effectivenessAnalysis.intervention}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Effectiveness:</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {effectivenessAnalysis.effectiveness}
                </span>
              </div>
            
          </div>
          </section>

        </section>


              {/* Journal Reference section */}
        <section className="prose prose-lg max-w-none mb-16">


          <section>
            <h2>Journal Reference</h2>
            <p className="italic">{journalReference.full}</p>
          </section>



          
        </section>
        

        {/* Discussions Section */}
        <DiscussionsSection
          expertCards={expertCards}
          onlineCards={onlineCards}
          redditCards={redditCards}
          studyCards={studyCards}
          xCards={xCards}
          youtubeCards={youtubeCards}
        />
         {/* Newsletter Section */}
         <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay informed. Stay ahead.</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Subscribe now for the latest breakthroughs, expert insights, and cutting-edge updates in diabetes care—delivered straight to your inbox.
          </p>
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
          </div>
        </section>
        {/* Add this before the Newsletter section */}
      <RelatedPosts posts={relatedPosts} />
      </main>
      
    </div>
  );
};

export default BlogPost;