import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslations } from '../../utils/i18n';
import { getDocumentByUID, getAllDocuments, getDocumentsByType } from '../../lib/mongodb';
import ArticleTemplate from '../../components/ArticleTemplate';

export default function BlogPost({ post, authorImage, authorName }) {
  const router = useRouter();
  const { t, locale } = useTranslations();

  console.log('BlogPost component rendered with authorImage:', authorImage);

  // Show loading state if page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Show 404 if post not found
  if (!post) {
    return <div>Post not found</div>;
  }

  // Helper function to sanitize text
  const sanitizeText = (text) => {
    // Convert to string and handle null/undefined
    const str = String(text || '');
    // Don't escape HTML if it's already HTML content
    if (/<[a-z][\s\S]*>/i.test(str)) return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Helper function to format text with spans
  const formatTextWithSpans = (text, spans = []) => {
    if (!text) return '';
    let formattedText = sanitizeText(text);
    if (!spans?.length) return formattedText;

    // Sort spans in reverse order to handle nested formatting
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
    return formattedText;
  };

    // Transform MongoDB post data to match ArticleTemplate structure
  const articleData = {
    title: sanitizeText(post.data.title[0]?.text || ''),
    publishDate: new Date(post.data.release_date || post.first_publication_date).toLocaleDateString(locale),
    publisher: post.data.author?.slug || "Dexdiabetes",
    author: authorName || "Dexdiabetes Team",
    authorImage,
    readTime: "5 min read",
    imageUrl: post.data.featured_image?.url || null,
    categories: post.data.categories?.map(cat => cat.category?.uid) || [],
    relatedPosts: (post.data.related_articles_group || []).map(related => ({
      title: sanitizeText(related.article?.data?.title?.[0]?.text || ''),
      date: new Date(related.article?.first_publication_date).toLocaleDateString(locale),
      description: '',
      slug: related.article?.uid || ''
    })),
    content: (() => {
      const parts = [];
      
      // Handle text content from any field that might contain it
      const addTextContent = (field, context = '') => {
        if (!field) return;
        
        // Handle string content
        if (typeof field === 'string') {
          parts.push(`<div class="mb-4">${sanitizeText(field)}</div>`);
          return;
        }
        
        // Handle array content
        if (Array.isArray(field)) {
          field.forEach(item => {
            // Handle text objects with spans
            if (item.text) {
              const formattedText = formatTextWithSpans(item.text, item.spans);
              parts.push(`<div class="mb-4">${formattedText}</div>`);
            }
            // Handle paragraph objects with spans
            else if (item.type === 'paragraph' && item.text) {
              const formattedText = formatTextWithSpans(item.text, item.spans);
              parts.push(`<p class="mb-4">${formattedText}</p>`);
            }
            // Handle rich text objects
            else if (item.type === 'heading1') {
              parts.push(`<h1 class="text-3xl font-bold mb-4">${sanitizeText(item.text)}</h1>`);
            }
            else if (item.type === 'heading2') {
              parts.push(`<h2 class="text-2xl font-bold mb-4">${sanitizeText(item.text)}</h2>`);
            }
            else if (item.type === 'heading3') {
              parts.push(`<h3 class="text-xl font-bold mb-4">${sanitizeText(item.text)}</h3>`);
            }
            else if (item.type === 'list-item') {
              // If this is the first list item, start a new list
              if (!parts.length || !parts[parts.length - 1].includes('<ul>')) {
                parts.push('<ul class="list-disc pl-6 mb-4">');
              }
              parts.push(`<li class="mb-2">${sanitizeText(item.text)}</li>`);
              // If this is the last item or next item isn't a list item, close the list
              const nextItem = field[field.indexOf(item) + 1];
              if (!nextItem || nextItem.type !== 'list-item') {
                parts.push('</ul>');
              }
            }
          });
        }
      };

      // Try to find content in various possible locations
      if (post.data.description?.[0]?.text) {
        const formattedText = formatTextWithSpans(
          post.data.description[0].text,
          post.data.description[0].spans
        );
        parts.push(`<div class="text-lg mb-6">${formattedText}</div>`);
      }

      // Add subtitle if it exists
      if (post.data.subtitle?.[0]?.text) {
        const formattedText = formatTextWithSpans(
          post.data.subtitle[0].text,
          post.data.subtitle[0].spans
        );
        parts.push(`<div class="text-xl font-semibold mb-6">${formattedText}</div>`);
      }

      // Handle main content
      if (post.data.body) {
        post.data.body.forEach(slice => {
          if (slice.slice_type === 'text') {
            // Process rich text content
            if (Array.isArray(slice.primary?.text)) {
              slice.primary.text.forEach(block => {
                const formattedText = formatTextWithSpans(block.text, block.spans || []);
                
                switch (block.type) {
                  case 'paragraph':
                    parts.push(`<p class="mb-4">${formattedText}</p>`);
                    break;
                  case 'heading1':
                    parts.push(`<h1 class="text-3xl font-bold mb-4">${formattedText}</h1>`);
                    break;
                  case 'heading2':
                    parts.push(`<h2 class="text-2xl font-bold mb-4">${formattedText}</h2>`);
                    break;
                  case 'heading3':
                    parts.push(`<h3 class="text-xl font-bold mb-4">${formattedText}</h3>`);
                    break;
                  case 'list-item':
                    if (!parts.length || !parts[parts.length - 1].includes('<ul>')) {
                      parts.push('<ul class="list-disc pl-6 mb-4">');
                    }
                    parts.push(`<li class="mb-2">${formattedText}</li>`);
                    
                    // Close list if this is the last item or next item isn't a list item
                    const nextBlock = slice.primary.text[slice.primary.text.indexOf(block) + 1];
                    if (!nextBlock || nextBlock.type !== 'list-item') {
                      parts.push('</ul>');
                    }
                    break;
                  default:
                    parts.push(`<div class="mb-4">${formattedText}</div>`);
                }
              });
            }
            // Handle simple text content
            else if (slice.primary?.text) {
              const formattedText = formatTextWithSpans(
                slice.primary.text,
                slice.primary.spans || []
              );
              parts.push(`<p class="mb-4">${formattedText}</p>`);
            }

            // Handle items if they exist
            if (slice.items?.length) {
              let inList = false;
              
              slice.items.forEach((item, index) => {
                if (item.text) {
                  const formattedText = formatTextWithSpans(
                    item.text,
                    item.spans || []
                  );
                  
                  // Check if this is part of a list
                  if (item.type === 'list-item' || (index > 0 && slice.items[index - 1].type === 'list-item')) {
                    if (!inList) {
                      parts.push('<ul class="list-disc pl-6 mb-4">');
                      inList = true;
                    }
                    parts.push(`<li class="mb-2">${formattedText}</li>`);
                    
                    // Close list if this is the last item or next item isn't a list item
                    if (index === slice.items.length - 1 || slice.items[index + 1].type !== 'list-item') {
                      parts.push('</ul>');
                      inList = false;
                    }
                  } else {
                    parts.push(`<div class="mb-4">${formattedText}</div>`);
                  }
                }
              });
              
              // Ensure list is closed
              if (inList) {
                parts.push('</ul>');
              }
            }
          }
          // Handle image slices
          else if (slice.slice_type === 'image' && slice.primary?.image?.url) {
            parts.push(`
              <figure class="my-8">
                <img src="${slice.primary.image.url}" 
                     alt="${sanitizeText(slice.primary.image.alt || '')}" 
                     class="w-full rounded-lg" />
                ${slice.primary.caption ? 
                  `<figcaption class="text-center text-sm text-gray-500 mt-2">
                     ${sanitizeText(slice.primary.caption)}
                   </figcaption>` 
                  : ''}
              </figure>
            `);
          }
          // Handle quote slices
          else if (slice.slice_type === 'quote') {
            // Try to find quote text in various locations
            let quoteText = '';
            let quoteSource = '';

            if (slice.primary?.quote?.[0]?.text) {
              quoteText = formatTextWithSpans(
                slice.primary.quote[0].text,
                slice.primary.quote[0].spans || []
              );
            } else if (slice.primary?.text) {
              quoteText = formatTextWithSpans(
                slice.primary.text,
                slice.primary.spans || []
              );
            }

            // Try to find source in various locations
            if (slice.primary?.source) {
              quoteSource = typeof slice.primary.source === 'string' 
                ? slice.primary.source 
                : slice.primary.source[0]?.text || '';
            } else if (slice.primary?.attribution) {
              quoteSource = typeof slice.primary.attribution === 'string'
                ? slice.primary.attribution 
                : slice.primary.attribution[0]?.text || '';
            }

            if (quoteText) {
              parts.push(`
                <blockquote class="border-l-4 border-primary pl-4 my-6">
                  <p class="text-lg italic">${quoteText}</p>
                  ${quoteSource ? 
                    `<cite class="block text-sm mt-2">— ${sanitizeText(quoteSource)}</cite>` 
                    : ''}
                </blockquote>
              `);
            }
          }
        });
      }

      // Handle any standalone content
      if (post.data.content) {
        addTextContent(post.data.content, 'standalone content');
      }

      return parts.join('\n') || 'No content available';
    })()
  };

  console.log('ArticleData being passed to ArticleTemplate:', {
    title: articleData.title,
    author: articleData.author,
    authorImage: articleData.authorImage
  });

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${sanitizeText(articleData.title)} - Dexdiabetes`}</title>
        <meta name="description" content={sanitizeText(post.data.description?.[0]?.text || '')} />
      </Head>

      <ArticleTemplate {...articleData} />
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const paths = [];
  
  const databaseLocales = {
    'en-us': 'en-us',
    'es': 'es-es'
  };
  
  for (const locale of locales) {
    const dbLocale = databaseLocales[locale] || locale;
    const posts = await getAllDocuments('blog_post', dbLocale);
    const localePaths = posts.map((post) => ({
      params: { uid: post.uid },
      locale,
    }));
    paths.push(...localePaths);
  }

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params, locale = 'en-us' }) {
  try {
    console.log('getStaticProps called with:', { params, locale });
    
    if (!params?.uid) {
      console.error('No UID provided in params');
      return { notFound: true };
    }

    const databaseLocales = {
      'en-us': 'en-us',
      'es': 'es-es'
    };
    const dbLocale = databaseLocales[locale] || locale;
    
    console.log('Fetching blog post...');
    const post = await getDocumentByUID('blog_post', params.uid, dbLocale);
    
    if (!post) {
      console.log('No post found for:', { type: 'blog_post', uid: params.uid, locale });
      return { notFound: true };
    }

    console.log('Post author data:', post.data.author);

    // Fetch author document if author UID exists
    let authorImage = null;
    let authorName = null;
    if (post.data.author?.uid) {
      console.log('Fetching author document for UID:', post.data.author.uid);
      const authorDoc = await getDocumentByUID('author', post.data.author.uid, dbLocale);
      console.log('Author document:', JSON.stringify(authorDoc, null, 2));
      
      // Get author image from headshot field
      if (authorDoc?.data?.headshot?.url) {
        authorImage = authorDoc.data.headshot.url;
      }
      // Get author name from name field
      if (authorDoc?.data?.name?.[0]?.text) {
        authorName = authorDoc.data.name[0].text;
      }
      console.log('Found author image URL:', authorImage);
      console.log('Found author name:', authorName);
    }
    
    // Use default author image if no author image found
    if (!authorImage) {
      console.log('Fetching default author (dediabetes) document');
      const defaultAuthor = await getDocumentByUID('author', 'dediabetes', dbLocale);
      console.log('Default author document:', JSON.stringify(defaultAuthor, null, 2));
      
      // Get default author image from headshot field
      if (defaultAuthor?.data?.headshot?.url) {
        authorImage = defaultAuthor.data.headshot.url;
      }
      console.log('Using default author image URL:', authorImage);
    }

    console.log('Final authorImage value:', authorImage);

    return {
      props: {
        post,
        authorImage: authorImage || null,
        authorName: authorName || null
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    throw error;
  }
}
