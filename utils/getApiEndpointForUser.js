// utils/apiEndpoint.js
export const getApiEndpointForUser = (role) => {
   
    return role === 'premium' || role === 'admin'
      ? '/api/research/typesense-search'
      : '/api/research/search';
  };
  
// utils/apiEndpoint.js
export const getApiEndpointForUserArticle = (role) => {
    return role === 'premium' || role === 'admin'
      ? '/api/research/typesense-search'
      : '/api/blog/search';
  };
// utils/apiEndpoint.js
export const getApiEndpointForUserArchive = (role, content_type) => {
   
    return role === 'premium' || role === 'admin'
      ? '/api/research/typesense-search'
      : '/api/blog/search';
  };
  