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
      // New effectiveness analysis data
    effectivenessAnalysis: {
        intervention: "AI-Driven Monitoring",
        effectiveness: "Moderate"
      },
      // New journal reference data
      journalReference: {

        full: "Smith J, Johnson M, Williams R. Recent Advances in Diabetes Management: A Comprehensive Review. J Diabetes Res. 2024;15(3):125-140. doi:10.1234/jdr.2024.15.3.125"
      }
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{postData.title} - Dediabetes</title>
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