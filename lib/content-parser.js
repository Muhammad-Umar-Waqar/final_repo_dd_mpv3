/**
 * Process HTML content from Prismic/MongoDB data
 * @param {Array} content - Array of content objects
 * @returns {string} Processed HTML
 */
export function processContent(content) {
  if (!Array.isArray(content)) return '';

  let html = '';
  let listBuffer = [];
  let isProcessingList = false;
  let currentListType = null;

  const cleanHtml = (text) => {
    return text
      .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
      .replace(/<p>\s*<\/p>/g, '') // Do it twice for nested empty paragraphs
      // Convert reference notation to superscript
      .replace(/\[\^(\d+)\]/g, '<sup class="text-sm">$1</sup>');
  };

  const closeCurrentList = () => {
    if (listBuffer.length > 0) {
      const tag = currentListType === 'ol' ? 'ol' : 'ul';
      const classes = currentListType === 'ol' ? 'list-decimal' : 'list-disc';
      // Add extra margin for bibliography
      const extraClasses = currentListType === 'ol' && listBuffer[0].includes('reference') ? 'mt-12' : '';
      html += `<${tag} class="${classes} pl-6 mb-6 ${extraClasses}">\n`;
      html += listBuffer.join('\n');
      html += `\n</${tag}>\n`;
      listBuffer = [];
      isProcessingList = false;
      currentListType = null;
    }
  };

  let previousWasHeading = false;

  content.forEach((block, index) => {
    if (!block.text) return;
    let text = block.text.trim();

    // Skip empty blocks
    if (!text) {
      html += '\n';
      return;
    }

    // Skip standalone closing tags or convert them to proper format
    if (text.match(/^<\/(ul|ol)>$/i)) return;
    text = text.replace(/&lt;\/[uo]l&gt;/g, ''); // Remove encoded list closing tags

    // Detect list type from opening tag or content context
    if (text.match(/^<(ul|ol)>$/i)) {
      currentListType = text.toLowerCase().includes('ol') ? 'ol' : 'ul';
      isProcessingList = true;
      return;
    }

    // Handle list items
    if (text.includes('<li>')) {
      isProcessingList = true;
      // If no list type is set, check if it should be ordered
      if (!currentListType) {
        // Check if this is a reference/bibliography section
        const prevBlock = content[index - 1];
        const prevText = prevBlock?.text?.toLowerCase() || '';
        const isReference = prevText.includes('reference') || 
                          prevText.includes('bibliography') ||
                          prevText.includes('citations');
        currentListType = isReference ? 'ol' : 'ul';
      }
      
      // Clean and extract content between <li> tags
      const liContent = cleanHtml(
        text
          .replace(/<\/?li>/g, '')
          .replace(/<\/?[uo]l>/g, '')
          .replace(/<p[^>]*>/g, '')
          .replace(/<\/p>/g, '')
      );
      
      if (liContent.trim()) {
        listBuffer.push(`<li class="mb-3">${liContent}</li>`);
      }
      
      // Check if next block is not a list item
      const nextBlock = content[index + 1];
      const nextText = nextBlock?.text?.trim();
      if (!nextBlock || !nextText?.includes('<li>')) {
        closeCurrentList();
      }
      return;
    }

    // If we were processing a list and found non-list content, close the list
    if (isProcessingList) {
      closeCurrentList();
    }

    // Process regular content
    text = cleanHtml(text);
    
    // Add extra spacing after headings
    const extraSpacing = previousWasHeading ? 'mt-6' : '';
    
    if (text.startsWith('<h1>')) {
      html += text.replace('<h1>', '<h1 class="text-4xl font-semibold mb-8 mt-8">');
      previousWasHeading = true;
    } else if (text.startsWith('<h2>')) {
      html += text.replace('<h2>', '<h2 class="text-3xl font-medium mb-6 mt-10">');
      previousWasHeading = true;
    } else if (text.startsWith('<h3>')) {
      html += text.replace('<h3>', '<h3 class="text-2xl font-medium mb-4 mt-8">');
      previousWasHeading = true;
    } else if (text.startsWith('<p>')) {
      const cleanedText = text.replace(/<p[^>]*>/, `<p class="mb-4 leading-relaxed ${extraSpacing}">`);
      if (cleanedText.replace(/<[^>]*>/g, '').trim()) {
        html += cleanedText;
      }
      previousWasHeading = false;
    } else if (text.trim()) {
      html += `<div class="mb-4 ${extraSpacing}">${text}</div>`;
      previousWasHeading = false;
    }
    html += '\n';
  });

  // Close any remaining list
  closeCurrentList();

  return html;
}

/**
 * Sanitize HTML text if not already HTML
 */
export function sanitizeText(text) {
  const str = String(text || '');
  if (/<[a-z][\s\S]*>/i.test(str)) return str;
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Format text with Prismic spans (strong, em, hyperlinks)
 */
// export function formatTextWithSpans(text, spans = []) {
//   if (!text) return '';
//   let formattedText = sanitizeText(text);
//   if (!spans?.length) return formattedText;

//   const sortedSpans = [...spans].sort((a, b) => b.start - a.start);
//   sortedSpans.forEach(span => {
//     const spanContent = formattedText.slice(span.start, span.end);
//     if (span.type === 'strong') {
//       formattedText = formattedText.slice(0, span.start) + 
//         `<strong>${spanContent}</strong>` + 
//         formattedText.slice(span.end);
//     } else if (span.type === 'em') {
//       formattedText = formattedText.slice(0, span.start) + 
//         `<em>${spanContent}</em>` + 
//         formattedText.slice(span.end);
//     } else if (span.type === 'hyperlink' && span.data?.url) {
//       formattedText = formattedText.slice(0, span.start) + 
//         `<a href="${sanitizeText(span.data.url)}" class="text-primary hover:underline">${spanContent}</a>` + 
//         formattedText.slice(span.end);
//     }
//   });
//   return formattedText;
// }



export function formatTextWithSpans(text, spans = []) {
  if (!text) return '';
  // Sanitize the text first
  let formattedText = sanitizeText(text);

  // Process text spans (if available)
  if (spans?.length) {
    const sortedSpans = [...spans].sort((a, b) => b.start - a.start);
    sortedSpans.forEach(span => {
      const spanContent = formattedText.slice(span.start, span.end);
      if (span.type === 'strong') {
        formattedText = formattedText.slice(0, span.start) +
          `<strong>${spanContent}</strong>` +
          formattedText.slice(span.end);
      } else if (span.type === 'em') {
        formattedText = formattedText.slice(0, span.start) +
          `<em>${spanContent}</em>` +
          formattedText.slice(span.end);
      } else if (span.type === 'hyperlink' && span.data?.url) {
        formattedText = formattedText.slice(0, span.start) +
          `<a href="${sanitizeText(span.data.url)}" class="text-primary hover:underline">${spanContent}</a>` +
          formattedText.slice(span.end);
      }
    });
  }

  // New DOI processing: find any occurrence of "doi:" followed by non-whitespace characters
  // and replace it with an anchor element that links to the DOI URL.
    formattedText = formattedText.replace(/doi:([^\s]+?)(?=\.?(?:\s|$))/gi, (match, doi) => {
      // Construct the correct URL by prepending "https://doi.org/" to the DOI number
      const doiURL = `https://doi.org/${doi}`;
      const iconSVG = `<svg  style="display: inline; margin-bottom: 4px;  margin-left: 1px;" xmlns="http://www.w3.org/2000/svg"  width="17"  height="17"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>`;
      return `<a href="${doiURL}" style="text-decoration: underline;">${match}${iconSVG}</a>`;
    });

  return formattedText;
}

/**
 * Process different types of content slices (text, image, quote)
 */
export function processSlice(slice) {
  if (!slice) return '';

  switch (slice.slice_type) {
    case 'text':
      if (Array.isArray(slice.primary?.text)) {
        return processContent(slice.primary.text);
      }
      return sanitizeText(slice.primary?.text || '');

    case 'image':
      if (slice.primary?.image?.url) {
        return `
          <figure class="my-8">
            <img 
              src="${slice.primary.image.url}"
              alt="${sanitizeText(slice.primary.image.alt || '')}"
              class="w-full rounded-lg"
            />
            ${slice.primary.caption ? 
              `<figcaption class="text-center text-sm text-gray-500 mt-2">
                ${sanitizeText(slice.primary.caption)}
              </figcaption>` 
              : ''}
          </figure>
        `;
      }
      return '';

    case 'quote':
      let quoteHtml = '<blockquote class="border-l-4 border-primary pl-4 my-6">';
      
      if (slice.primary?.quote) {
        quoteHtml += `<p class="text-lg italic">${processContent(slice.primary.quote)}</p>`;
      }
      
      if (slice.primary?.source) {
        const source = typeof slice.primary.source === 'string' 
          ? slice.primary.source 
          : slice.primary.source[0]?.text || '';
        if (source) {
          quoteHtml += `<cite class="block text-sm mt-2">— ${sanitizeText(source)}</cite>`;
        }
      }
      
      quoteHtml += '</blockquote>';
      return quoteHtml;

    default:
      return '';
  }
} 