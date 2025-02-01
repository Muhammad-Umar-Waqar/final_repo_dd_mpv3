// components/post-template/index.js
import React from 'react';
import { IconChevronUp, IconPhoto, IconFileAnalytics, IconBook } from '@tabler/icons-react';

const PostTemplate = ({
  title = "Understanding Artificial Pancreas Systems: Results from a 24-Month Trial",
  publishDate = "January 31, 2025",
  studyDesign = {
    interventions: ["Continuous Monitoring", "Smart Insulin"],
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
    Participants were randomly assigned to treatment groups using a computer-generated algorithm, with 
    stratification by age and diabetes duration.`,
  interventions = `The intervention protocol consisted of a multi-component diabetes management system integrating 
    continuous glucose monitoring with automated insulin delivery.`,
  keyFindings = `The study revealed significant improvements in glycemic control among intervention group 
    participants. Key outcomes included a 35% reduction in hypoglycemic events and a 28% improvement 
    in time-in-range glucose levels.`,
    biasScore = "Moderate",
    effectivenessAnalysis = {
        intervention: "AI-Driven Monitoring",
        effectiveness: "Moderate"
      },
      journalReference = {
        authors: "Smith J, Johnson M, Williams R",
        title: "Recent Advances in Diabetes Management: A Comprehensive Review",
        journal: "J Diabetes Res",
        year: "2024",
        volume: "15",
        issue: "3",
        pages: "125-140",
        doi: "10.1234/jdr.2024.15.3.125"
      }
}) => {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Back to top button */}
      <button 
        className="fixed bottom-8 right-8 p-2 bg-background border border-border rounded-full shadow-lg hover:bg-secondary/10 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <IconChevronUp className="w-5 h-5 text-foreground" />
      </button>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose prose-lg max-w-none">
          {/* Article Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-12">
            <div className="flex items-center gap-1">
              Originally published by{" "}
              <span className="text-primary">De Diabetes</span>
            </div>
            <time>{publishDate}</time>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-[16/9] bg-muted rounded-lg mb-8">
            <div className="w-full h-full flex items-center justify-center">
              <IconPhoto className="w-12 h-12 text-border" />
            </div>
          </div>

         
          {/* Study Design Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-8">Study Design</h2>
            
            <div className="bg-secondary/5 rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Interventions:</span>
                <div className="flex gap-3 flex-wrap">
                  {studyDesign.interventions.map((intervention, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
                      {intervention}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Study Type:</span>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full">
                  {studyDesign.studyType}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Duration:</span>
                <span className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full">
                  {studyDesign.duration}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Size:</span>
                <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full">
                  {studyDesign.size}
                </span>
              </div>
            </div>
          </section>

          {/* Study Population Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-8">Study Population</h2>
            
            <div className="bg-secondary/5 rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Age Range:</span>
                <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
                  {studyPopulation.ageRange}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Sex:</span>
                <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full">
                  {studyPopulation.sex}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Geography:</span>
                <div className="flex gap-3 flex-wrap">
                  {studyPopulation.geography.map((location, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-4 py-1 rounded-full">
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-foreground font-medium w-32">Others:</span>
                <div className="flex gap-3 flex-wrap">
                  {studyPopulation.others.map((item, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Methodology Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Methodology</h2>
            <p className="text-foreground leading-relaxed mb-8">
              {methodology}
            </p>
          </section>

          {/* Interventions Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interventions</h2>
            <p className="text-foreground leading-relaxed mb-8">
              {interventions}
            </p>
          </section>

          {/* Key Findings Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Key Findings</h2>
            <p className="text-foreground leading-relaxed mb-8">
              {keyFindings}
            </p>
          </section>
           {/* Bias Analysis Score Section */}
           <section className="mt-12 max-w-2xl mx-auto">
            <div className="bg-secondary/5 rounded-lg p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconFileAnalytics className="w-6 h-6 text-foreground" />
                  <h2 className="text-2xl font-bold m-0">Bias Analysis Score</h2>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm">
                  {biasScore}
                </span>
              </div>
            </div>
          </section>
            {/* Effectiveness Analysis Section */}
            <section className="mt-12 bg-secondary/5 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <IconFileAnalytics className="w-6 h-6 text-foreground" />
              <h2 className="text-2xl font-bold m-0">Effectiveness Analysis</h2>
            </div>
            
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-left font-semibold text-foreground">Aspect</th>
                    <th className="py-3 px-4 text-left font-semibold text-foreground">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-foreground">Intervention</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {effectivenessAnalysis.intervention}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-foreground">Effectiveness</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        {effectivenessAnalysis.effectiveness}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Journal Reference Section */}
          <section className="mt-12 bg-secondary/5 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <IconBook className="w-6 h-6 text-foreground" />
              <h2 className="text-2xl font-bold m-0">Journal Reference</h2>
            </div>
            
            <p className="text-foreground text-lg italic mb-4">
              {journalReference.authors}. {journalReference.title}.{' '}
              <span className="not-italic">{journalReference.journal}.{' '}
              {journalReference.year};{journalReference.volume}({journalReference.issue}):{journalReference.pages}.{' '}
              doi:{journalReference.doi}</span>
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default PostTemplate;