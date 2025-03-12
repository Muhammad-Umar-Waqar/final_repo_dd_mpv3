import { searchAll } from '../../../db/search';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      q = '',              // search term
      lang = 'en-us',      // language
      page = 1,            // current page
      limit = 10,          // results per page
      outcomes,            // outcomes filter
      interventions,       // interventions filter
      trialType,          // trial type
      trialSize,          // trial size
      trialDuration,      // trial duration
      geography,          // geography
      year,               // publication year
      sponsorship,        // sponsorship
      domains             // domains filter
    } = req.query;

    // Convert parameters from string to array when needed
    const parseArrayParam = (param) => {
      if (!param) return [];
      return Array.isArray(param) ? param : [param];
    };

    // Convert specific parameters
    const parsedYear = year ? parseInt(year) : undefined;
    const parsedSponsorship = sponsorship === 'true' ? true : sponsorship === 'false' ? false : undefined;

    const results = await searchAll({
      searchTerm: q,
      lang,
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
      outcomes: parseArrayParam(outcomes),
      interventions: parseArrayParam(interventions),
      trialType: parseArrayParam(trialType),
      trialSize: parseArrayParam(trialSize),
      trialDuration: parseArrayParam(trialDuration),
      geography: parseArrayParam(geography),
      year: parsedYear,
      sponsorship: parsedSponsorship,
      domains: parseArrayParam(domains)
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error in archive search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 