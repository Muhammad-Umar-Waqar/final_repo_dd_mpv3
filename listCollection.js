// listCollections.js
import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [
    {
      host: "search.dediabetes.com",
      port: 443,
      protocol: 'https'
    }
  ],
  // Use the master key for admin operations like listing collections
  apiKey: "Hmbay8NzkIM9CYfi7CoaFLoe5QuP2QiqUuGwdbHhqAeTc9zJ",
  connectionTimeoutSeconds: 5,
});

(async () => {
  try {
    const collections = await client.collections().retrieve();
    console.log('Collections:', collections);
  } catch (error) {
    console.error('Error retrieving collections:', error);
  }
})();
