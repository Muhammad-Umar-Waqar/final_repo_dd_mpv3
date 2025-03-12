import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;

/**
 * Creates a Prismic client for the project's repository.
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

/**
 * Get all languages configured in Prismic
 */
export const getLocales = async () => {
  const client = createClient();
  const repository = await client.getRepository();
  return repository.languages.map(lang => ({
    id: lang.id,
    name: lang.name
  }));
};

/**
 * Get document by UID and language
 */
export const getDocumentByUID = async (type, uid, lang = 'en-us') => {
  const client = createClient();
  return await client.getByUID(type, uid, { lang });
};

/**
 * Get all documents of a specific type in a specific language
 */
export const getAllDocuments = async (type, lang = 'en-us') => {
  const client = createClient();
  const documents = await client.getAllByType(type, {
    lang,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  });
  return documents;
};