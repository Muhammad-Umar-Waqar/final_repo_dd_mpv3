

const REPO_NAME = "dediabetes"; // Replace with your actual Prismic repository name
const API_URL = `https://${REPO_NAME}.cdn.prismic.io/api/v2`;

async function fetchPrismicData() {
  try {
    // Step 1: Fetch the API metadata to get the Master Ref
    const apiResponse = await fetch(API_URL);
    const apiData = await apiResponse.json();
    
    const masterRef = apiData.refs.find(ref => ref.id === 'master')?.ref; // Get the master ref
    
    if (!masterRef) {
      throw new Error("Master Ref not found!");
    }

    console.log("Master Ref:", masterRef);

    // Step 2: Fetch your documents using the Master Ref
    const documentsResponse = await fetch(
      `https://${REPO_NAME}.cdn.prismic.io/api/v2/documents/search?ref=${masterRef}`
    );

    const documents = await documentsResponse.json();
    console.log("Prismic Documents:", JSON.stringify(documents, null, 2));

  } catch (error) {
    console.error("Error fetching Prismic data:", error);
  }
}

fetchPrismicData();
