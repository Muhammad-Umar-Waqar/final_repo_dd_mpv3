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
    publishDate: "January 31, 2025",
    studyDesign: {
      interventions: ["Continuous Glucose Monitor", "Automated Insulin Pump"],
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
        content: "In-depth review of the latest automated insulin delivery developments",
        date: "2h ago",
        author: "Dr. Sarah Chen"
      },
      {
        title: "Clinical Perspective on Trial Results",
        content: "Key implications for diabetes management practice",
        date: "1d ago",
        author: "Prof. Michael Roberts"
      }
    ],
    onlineCards: [
      {
        title: "Patient Experience Forum",
        content: "Real-world feedback from system users",
        date: "3h ago",
        author: "T1D Support Network"
      },
      {
        title: "Healthcare Provider Discussion",
        content: "Implementation strategies and clinical observations",
        date: "6h ago",
        author: "Diabetes Care Community"
      }
    ],
    redditCards: [
      {
        title: "r/diabetes Tech Discussion",
        content: "Community insights on the trial results",
        date: "4h ago",
        author: "r/diabetes"
      },
      {
        title: "Patient AMA Thread",
        content: "Trial participant sharing experiences",
        date: "1d ago",
        author: "r/T1D"
      }
    ],
    studyCards: [
      {
        title: "Comparative Analysis",
        content: "How this trial compares to previous AID studies",
        date: "1d ago",
        author: "Diabetes Research Institute"
      },
      {
        title: "Meta-analysis Update",
        content: "Integration of new findings with existing research",
        date: "2d ago",
        author: "Clinical Trials Database"
      }
    ],
    xCards: [
      {
        title: "Research Impact Thread",
        content: "Expert commentary on trial implications",
        date: "1h ago",
        author: "@DiabetesExperts"
      },
      {
        title: "Healthcare Policy Discussion",
        content: "Implications for treatment guidelines",
        date: "5h ago",
        author: "@HealthPolicy"
      }
    ],
    youtubeCards: [
      {
        title: "Trial Results Explained",
        content: "Visual breakdown of key findings",
        date: "6h ago",
        author: "DiabetesEd Channel"
      },
      {
        title: "Patient Success Stories",
        content: "Video testimonials from trial participants",
        date: "1d ago",
        author: "Medical Tech Reviews"
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