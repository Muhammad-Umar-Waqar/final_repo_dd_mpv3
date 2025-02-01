// pages/posts/artificial-pancreas-trial.js
import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import PostTemplate from '../../components/post-template';

export default function ArtificialPancreasTrialPost() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const postData = {
    title: "Long-term Outcomes of Artificial Pancreas Systems: A 24-Month Multi-Center Trial",
    summary: `esto si viene del blog post and diabetes 
      duration before being randomly assigned to either the intervention group (artificial pancreas system) 
      or the control group (standard insulin pump therapy) using a computer-generated algorithm.`,
    publishDate: "January 31, 2025",
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
    methodology: `This landmark study implemented a comprehensive methodological framework to evaluate the 
      long-term efficacy of artificial pancreas systems. Participants were stratified by age and diabetes 
      duration before being randomly assigned to either the intervention group (artificial pancreas system) 
      or the control group (standard insulin pump therapy) using a computer-generated algorithm.`,
    interventions: `The artificial pancreas system utilized in this study combined next-generation continuous 
      glucose monitoring technology with an advanced automated insulin delivery algorithm. The system 
      featured predictive hypoglycemia prevention, adaptive basal rate adjustment, and automated correction 
      boluses. Control group participants used standard insulin pump therapy with manual adjustments based 
      on CGM data.`,
    keyFindings: `The 24-month trial demonstrated significant clinical benefits of the artificial pancreas 
      system. Intervention group participants experienced a 35% reduction in hypoglycemic events and a 28% 
      improvement in time-in-range glucose levels compared to the control group. Additionally, HbA1c levels 
      showed a sustained reduction of 0.8% (9 mmol/mol) from baseline in the intervention group versus 0.3% 
      (3 mmol/mol) in the control group.`,
    biasScore: "Moderate",
    effectivenessAnalysis: {
      intervention: "AI-Driven Monitoring",
      effectiveness: "Moderate"
    },
    journalReference: {
      full: "Smith J, Johnson M, Williams R. Recent Advances in Diabetes Management: A Comprehensive Review. J Diabetes Res. 2024;15(3):125-140. doi:10.1234/jdr.2024.15.3.125"
    },
    // Discussion cards - all types included with dummy data
    expertCards: [
      {
        title: "Expert Analysis of AID Systems",
        outboundLink: "https://example.com/expert-analysis",
        author: "Dr. Sarah Chen"
      },
      {
        title: "Clinical Perspective on Trial Results",
        outboundLink: "https://example.com/expert-analysis",
        author: "Prof. Michael Roberts"
      }
    ],
    onlineCards: [
      {
        title: "Patient Experience Forum",
        outboundLink: "https://example.com/expert-analysis",
        author: "T1D Support Network"
      },
      {
        title: "Healthcare Provider Discussion",
        outboundLink: "https://example.com/expert-analysis",
        author: "Diabetes Care Community"
      }
    ],
    redditCards: [
      {
        title: "r/diabetes Tech Discussion",
        outboundLink: "https://example.com/expert-analysis",
        author: "r/diabetes"
      },
      {
        title: "Patient AMA Thread",
        outboundLink: "https://example.com/expert-analysis",
        author: "r/T1D"
      }
    ],
    studyCards: [
      {
        title: "Comparative Analysis",
        outboundLink: "https://example.com/expert-analysis",
        author: "Diabetes Research Institute"
      },
      {
        title: "Meta-analysis Update",
        outboundLink: "https://example.com/expert-analysis",
        author: "Clinical Trials Database"
      }
    ],
    xCards: [
      {
        title: "Research Impact Thread",
        outboundLink: "https://example.com/expert-analysis",
        author: "@DiabetesExperts"
      },
      {
        title: "Healthcare Policy Discussion",
        outboundLink: "https://example.com/expert-analysis",
        author: "@HealthPolicy"
      }
    ],
    youtubeCards: [
      {
        title: "Trial Results Explained",
        outboundLink: "https://example.com/expert-analysis",
        author: "DiabetesEd Channel"
      },
      {
        title: "Patient Success Stories",
        outboundLink: "https://example.com/expert-analysis",
        author: "Medical Tech Reviews"
      }
    ],
    relatedPosts: [
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
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${postData.title} - Dexdiabetes`}</title>
        <meta 
          name="description" 
          content="Latest results from a 24-month trial of an artificial pancreas system showing significant improvements in glycemic control." 
        />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <article>
          <PostTemplate {...postData} />
        </article>
      </main>
    </div>
  );
}