import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import PostTemplate from '../components/PostTemplate';
import ArticleTemplate from '../components/ArticleTemplate';

export default function ArtificialPancreasTrialPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Common data used by both templates
  const commonData = {
    title: "Long-term Outcomes of Artificial Pancreas Systems: A 24-Month Multi-Center Trial",
    publishDate: "January 31, 2025",
    publisher: "Diabetes Care Journal",
    author: "Dr. Sarah Johnson",
    readTime: "8 min read",
  };

  // Related posts data used by both templates
  const relatedPosts = [
    {
      title: "Impact of CGM Systems on Quality of Life: A 12-Month Study",
      date: "January 25, 2025",
      description: "A comprehensive analysis of how continuous glucose monitoring systems affect daily living, stress levels, and overall patient satisfaction in type 1 diabetes management.",
      slug: "cgm-quality-of-life-study"
    },
    {
      title: "Comparing Smart Insulin Pens vs Traditional Insulin Delivery",
      date: "January 28, 2025",
      description: "New research evaluates the effectiveness of smart insulin pens against conventional methods, examining glycemic control and user experience outcomes.",
      slug: "smart-insulin-pens-comparison"
    },
    {
      title: "Machine Learning in Diabetes Care: Predictive Analytics",
      date: "January 30, 2025",
      description: "How artificial intelligence and machine learning algorithms are revolutionizing blood glucose prediction and personalized treatment recommendations.",
      slug: "ml-diabetes-predictive-analytics"
    }
  ];

  // Specify the source type: 'article' or 'post'
  const source_type = 'article'; // You can change this to 'post' to switch templates

  // Template-specific data
  const articleData = {
    ...commonData,
    subtitle: "A comprehensive analysis of automated insulin delivery systems",
    imageUrl: null,
    imageCaption: "Artificial Pancreas System Components Diagram",
    relatedPosts,
    content: (
      <>
        <h2>Abstract</h2>
        <p>
          This groundbreaking study examines the long-term efficacy and safety of artificial 
          pancreas systems in managing type 1 diabetes over a 24-month period. The research 
          demonstrates significant improvements in glycemic control and quality of life for 
          participants.
        </p>

        <h2>Introduction</h2>
        <p>
          Artificial pancreas systems represent a significant advancement in diabetes 
          management, combining continuous glucose monitoring with automated insulin delivery. 
          This study provides crucial long-term data on their effectiveness in real-world 
          settings.
        </p>

        <h2>Methodology</h2>
        <p>
          The study employed a rigorous methodological framework to ensure data reliability and validity. 
          Participants were randomly assigned to treatment groups using a computer-generated algorithm.
        </p>

        <h2>Results and Discussion</h2>
        <p>
          The 24-month trial demonstrated significant clinical benefits of the artificial 
          pancreas system. Key findings include a 35% reduction in hypoglycemic events and 
          a 28% improvement in time-in-range glucose levels compared to the control group.
        </p>

        <h2>Conclusion</h2>
        <p>
          Our findings provide strong evidence supporting the long-term efficacy of artificial 
          pancreas systems in improving glycemic control and reducing the burden of diabetes 
          management for patients with type 1 diabetes.
        </p>
      </>
    )
  };

  const postData = {
    ...commonData,
    summary: "A comprehensive 24-month trial evaluating artificial pancreas systems shows promising results for type 1 diabetes management.",
    studyDesign: {
      interventions: ["Continuous Glucose Monitor", "Automated Insulin Pump"],
      outcomes: ["Improved Glycemic Control", "Reduced Hypoglycemic Events", "Quality of Life"],
      studyType: "Randomized Controlled Trial",
      duration: "24 Months",
      size: "500 Participants"
    },
    studyPopulation: {
      ageRange: "18-65 years",
      sex: "All genders",
      geography: ["Multi-center US", "Europe"],
      others: ["Type 1 Diabetes", "5+ years diagnosed"]
    },
    methodology: "This landmark study implemented a comprehensive methodological framework...",
    interventions: "The artificial pancreas system utilized in this study combined...",
    keyFindings: "The 24-month trial demonstrated significant clinical benefits...",
    comparison: "Compared to previous studies, our findings show...",
    biasScore: "Moderate",
    effectivenessAnalysis: {
      intervention: "AI-Driven Monitoring",
      effectiveness: "Moderate"
    },
    journalReference: {
      full: "Smith J, et al. Long-term Outcomes of Artificial Pancreas Systems. Diabetes Care. 2025;15(3):125-140."
    },
    expertCards: [
      {
        title: "Expert Analysis of AID Systems",
        outboundLink: "https://example.com/expert-analysis",
        author: "Dr. Sarah Chen"
      }
    ],
    onlineCards: [],
    redditCards: [],
    studyCards: [],
    xCards: [],
    youtubeCards: [],
    relatedPosts
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{commonData.title} - Dexdiabetes</title>
        <meta 
          name="description" 
          content="Latest results from a 24-month trial of an artificial pancreas system showing significant improvements in glycemic control." 
        />
      </Head>

      {source_type === 'article' ? (
        <ArticleTemplate 
          {...articleData}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <>
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <main>
            <article>
              <PostTemplate {...postData} />
            </article>
          </main>
        </>
      )}
    </div>
  );
}