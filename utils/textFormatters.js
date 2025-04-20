/**
 * Converts a DOI found within text into a clickable link.
 * It matches a DOI pattern (e.g., "10.xxxx/xxxx") and wraps it as a link.
 *
 * @param {string} text - The text potentially containing a DOI.
 * @returns {string} - The text with the DOI replaced by a clickable link.
 */

export function formatTextWithDoiLink(text) {
    if (!text) return '';
    
    // Use a regex to search for a DOI string. This regex covers common DOI formats.
    const doiRegex = /(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/gi;
    
    // Replace any DOI in the text with an anchor element linking to https://doi.org/<DOI>
    return text.replace(doiRegex, (doi) => {
      const doiUrl = `https://doi.org/${doi}`;
      return `<a href="${doiUrl}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${doi}</a>`;
    });
  }
  