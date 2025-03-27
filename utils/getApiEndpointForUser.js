// utils/apiEndpoint.js
export const getApiEndpointForUser = (role) => {
    console.log("User Role", role)
    return role === 'premium' || role === 'admin'
      ? '/api/research/typesense-search'
      : '/api/research/search';
  };
  
// utils/apiEndpoint.js
export const getApiEndpointForUserArticle = (role) => {
    console.log("User Role", role)
    return role === 'premium' || role === 'admin'
      ? '/api/research/typesense-search'
      : '/api/blog/search';
  };
// utils/apiEndpoint.js
export const getApiEndpointForUserArchive = (role, content_type) => {
    console.log("User Role", role)
    return role === 'premium' || role === 'admin'
      ? '/api/research/typesense-search'
      : '/api/blog/search';
  };
  