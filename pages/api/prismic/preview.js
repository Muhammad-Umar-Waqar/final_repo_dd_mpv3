import { createClient } from '../../../lib/prismic';
import { setPreviewData, redirectToPreviewURL } from '@prismicio/next';

export default async function preview(req, res) {
  const client = createClient({ req });

  await setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client });
}