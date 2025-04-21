import { getDocumentByUID } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { uid } = req.query;
  // Ensure language is either en-us or es-es, defaulting to en-us
  const lang = req.query.lang === 'es-es' ? 'es-es' : 'en-us';

  try {
    const doc = await getDocumentByUID('research', uid, lang);
    
    if (!doc) {
      return res.status(404).json({ message: 'Research post not found' });
    }

   

    console.log("DOC::", doc?.data)
    // Transform the MongoDB document into the expected format
    const transformedData = {
      title: doc.data?.json_content?.short_title,
      publisher: doc.data?.json_content?.publisher,
      publishDate: doc.data?.json_content?.publication_date,
      domain: doc.data?.domain,
      summary: doc.data?.json_content?.TLDR,
      copyright_license: doc.data?.copyright_license || '',
      studyDesign: {
        interventions: doc.data?.json_content?.interventions_SNOMED,
        outcomes: doc.data?.json_content?.outcomes_using_COMET,
        studyType: doc.data?.json_content?.study_design,
        duration: doc.data?.json_content?.study_duration,
        size: doc.data?.json_content?.study_size_cat
      },
      studyPopulation: {
        ageRange: doc.data?.json_content?.participants_age,
        sex: doc.data?.json_content?.participants_sex,
        geography: doc.data?.json_content?.participants_geo,
        others: doc.data?.json_content?.participants_char
      },
      methodology: doc.data?.json_content?.methodology,
      interventions: doc.data?.json_content?.interventions,
      keyFindings: doc.data?.json_content?.key_findings,
      comparison: doc.data?.json_content?.comparison_with_similar_studies,
      biasScore: doc.data?.json_content?.overall_cochrane_risk_of_bias_score,
      effectivenessAnalysis: {
        intervention: doc.data?.json_content?.intervention,
        effectiveness: doc.data?.json_content?.rank_value
      },
      journalReference: {
        full: doc.data?.json_content?.research_reference_AMA
      },
      headerImage: doc.data?.screenshot_study_header?.url,
      mentions: {
        expert: doc.data?.mentions_group?.expert || [],
        online: doc.data?.mentions_group?.online || [],
        reddit: doc.data?.mentions_group?.reddit || [],
        studies: doc.data?.mentions_group?.studies || [],
        x: doc.data?.mentions_group?.x || [],
        youtube: doc.data?.mentions_group?.youtube || []
      }
    };
  
    res.status(200).json(transformedData);
  } catch (error) {
    console.error('Error fetching research post:', error);
    res.status(500).json({ message: 'Error fetching research post' });
  }
}
