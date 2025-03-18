// // pages/instant-search.js
// import React from 'react';
// import Head from 'next/head';
// import TypesenseAdapterPkg from 'typesense-instantsearch-adapter';

// const TypesenseInstantSearchAdapter = TypesenseAdapterPkg.default || TypesenseAdapterPkg;


// import {
//   InstantSearch,
//   SearchBox,
//   Hits,
//   Pagination,
//   RefinementList,
//   Configure,
// } from 'react-instantsearch-dom';

// // Configure the adapter using client-side accessible env vars
// const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
//   server: {
//     apiKey: "Hmbay8NzkIM9CYfi7CoaFLoe5QuP2QiqUuGwdbHhqAeTc9zJ", // your search-only API key
//     nodes: [
//       {
//         host: 'search.dediabetes.com', // e.g., "search.dediabetes.com"
//         port: 443,
//         protocol: 'https',
//       },
//     ],
//   },
//   additionalSearchParameters: {
//     query_by: 'title,description',
//     filter_by: 'type:=research', // enforce searching only research documents
//     sort_by: 'publishDate:desc',
//   },
// });

// const searchClient = typesenseInstantsearchAdapter.searchClient;

// // Component to render individual search hits
// const Hit = ({ hit }) => {
//   return (
//     <div className="p-4 border rounded bg-white shadow-sm mb-4">
//       <h2 className="text-xl font-semibold">{hit.title}</h2>
//       <p className="text-sm text-gray-600">{hit.publishDate}</p>
//       <p className="mt-2">{hit.description}</p>
//     </div>
//   );
// };

// export default function InstantSearchPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Head>
//         <title>Instant Search Example</title>
//         <meta name="description" content="Instant search with Typesense and Next.js" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
      
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Instant Search</h1>
        
//         {/* InstantSearch component provides live search capabilities */}
//         <InstantSearch indexName="dediabetes4" searchClient={searchClient}>
//           {/* You can set default parameters here */}
//           <Configure hitsPerPage={6} />
          
//           {/* SearchBox automatically updates results as you type */}
//           <SearchBox 
//             translations={{ placeholder: 'Search research...' }}
//             submitIconComponent={null} // hide submit button if desired
//           />
          
//           {/* Optional: Filters (using RefinementList) */}
//           <div className="mt-4">
//             <h3 className="text-xl font-medium mb-2">Filter by Domains</h3>
//             <RefinementList attribute="domains" />
//           </div>
          
//           {/* Display search results */}
//           <div className="mt-8">
//             <Hits hitComponent={Hit} />
//           </div>
          
//           {/* Pagination component */}
//           <div className="mt-8">
//             <Pagination />
//           </div>
//         </InstantSearch>
//       </main>
//     </div>
//   );
// }
