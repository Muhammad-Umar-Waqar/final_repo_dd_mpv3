// import React, { useState, useEffect } from 'react';
// import { IconChevronDown, IconChevronUp, IconX, IconSearch } from '@tabler/icons-react';
// import { useTranslations } from '../utils/i18n';
// import { useRouter } from 'next/router';

// const FilterMenu = ({ isOpen, onClose }) => {
//   const { t } = useTranslations();
//   const router = useRouter();
//   const [openSection, setOpenSection] = useState(null);
//   const [searchOutcomes, setSearchOutcomes] = useState('');
//   const [searchInterventions, setSearchInterventions] = useState('');
//   const [selectedFilters, setSelectedFilters] = useState({
//     outcomes: [],
//     interventions: [],
//     participants: [],
//     trialType: [],
//     trialSize: [],
//     trialDuration: [],
//     geography: [],
//     year: [],
//     sponsorship: []
//   });

//   // Initialize filters from URL on mount
//   useEffect(() => {
//     if (router.isReady) {
//       const {
//         outcomes,
//         interventions,
//         trialType,
//         trialSize,
//         trialDuration,
//         geography,
//         year,
//         sponsorship
//       } = router.query;

//       const parseQueryParam = (param) => {
//         if (!param) return [];
//         return Array.isArray(param) ? param : [param];
//       };

//       setSelectedFilters({
//         outcomes: parseQueryParam(outcomes),
//         interventions: parseQueryParam(interventions),
//         trialType: parseQueryParam(trialType),
//         trialSize: parseQueryParam(trialSize),
//         trialDuration: parseQueryParam(trialDuration),
//         geography: parseQueryParam(geography),
//         year: parseQueryParam(year),
//         sponsorship: parseQueryParam(sponsorship)
//       });
//     }
//   }, [router.isReady]);

//   const outcomes = t('filterMenu.sections.outcomes.items') ?? [];
//   const interventions = t('filterMenu.sections.interventions.items') ?? [];

//   const filteredOutcomes = (Array.isArray(outcomes) ? outcomes : []).filter(outcome =>
//     outcome.toLowerCase().includes(searchOutcomes.toLowerCase())
//   );

//   const filteredInterventions = (Array.isArray(interventions) ? interventions : []).filter(intervention =>
//     intervention.toLowerCase().includes(searchInterventions.toLowerCase())
//   );

//   const handleFilterChange = (section, value) => {
//     setSelectedFilters(prev => {
//       const newFilters = { ...prev };
//       const index = newFilters[section].indexOf(value);
      
//       if (index === -1) {
//         newFilters[section] = [...newFilters[section], value];
//       } else {
//         newFilters[section] = newFilters[section].filter(item => item !== value);
//       }
      
//       return newFilters;
//     });
//   };

//   const handleApplyFilters = () => {
//     // Create new query object from current router query
//     const newQuery = { ...router.query };

//     // Update query with selected filters
//     Object.entries(selectedFilters).forEach(([key, values]) => {
//       if (values.length > 0) {
//         newQuery[key] = values;
//       } else {
//         delete newQuery[key];
//       }
//     });

//     // Reset to page 1 when filters change
//     delete newQuery.page;

//     // Update URL with new filters
//     router.push({
//       pathname: router.pathname,
//       query: newQuery
//     }, undefined, { shallow: true });

//     // Close the filter menu
//     onClose();
//   };

//   const SearchableGrid = ({ items, searchValue, onSearchChange, placeholder, section }) => (
//     <div className="space-y-4">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={searchValue}
//           onChange={(e) => onSearchChange(e.target.value)}
//           className="w-full px-4 py-2 pl-10 border border-border rounded-md bg-background"
//         />
//         <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//       </div>
//       <div className="grid grid-cols-2 border border-border">
//         {items.map((item, index) => (
//           <label
//             key={index}
//             className="contents"
//           >
//             <div className="flex items-start border-b border-r border-border p-3">
//               <input
//                 type="checkbox"
//                 checked={selectedFilters[section].includes(item)}
//                 onChange={() => handleFilterChange(section, item)}
//                 className="mr-2 mt-1.5 flex-shrink-0"
//               />
//               <span className="text-sm whitespace-normal">{item}</span>
//             </div>
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   const menuItems = [
//     {
//       title: t('filterMenu.sections.outcomes.title'),
//       content: (
//         <SearchableGrid
//           items={filteredOutcomes}
//           searchValue={searchOutcomes}
//           onSearchChange={setSearchOutcomes}
//           placeholder={t('filterMenu.searchPlaceholders.outcomes')}
//           section="outcomes"
//         />
//       )
//     },
//     {
//       title: t('filterMenu.sections.interventions.title'),
//       content: (
//         <SearchableGrid
//           items={filteredInterventions}
//           searchValue={searchInterventions}
//           onSearchChange={setSearchInterventions}
//           placeholder={t('filterMenu.searchPlaceholders.interventions')}
//           section="interventions"
//         />
//       )
//     },
//     {
//       title: t('filterMenu.sections.participants.title'),
//       children: t('filterMenu.sections.participants.items'),
//       section: 'participants'
//     },
//     {
//       title: t('filterMenu.sections.trialType.title'),
//       children: t('filterMenu.sections.trialType.items'),
//       section: 'trialType'
//     },
//     {
//       title: t('filterMenu.sections.trialSize.title'),
//       children: t('filterMenu.sections.trialSize.items'),
//       section: 'trialSize'
//     },
//     {
//       title: t('filterMenu.sections.trialDuration.title'),
//       children: t('filterMenu.sections.trialDuration.items'),
//       section: 'trialDuration'
//     },
//     {
//       title: t('filterMenu.sections.geography.title'),
//       children: t('filterMenu.sections.geography.items'),
//       section: 'geography'
//     },
//     {
//       title: t('filterMenu.sections.year.title'),
//       children: t('filterMenu.sections.year.items'),
//       section: 'year'
//     },
//     {
//       title: t('filterMenu.sections.sponsorship.title'),
//       children: t('filterMenu.sections.sponsorship.items'),
//       section: 'sponsorship'
//     }
//   ];

//   return (
//     <div 
//       className={`fixed inset-y-0 right-0 w-80 bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       } z-50`}
//     >
//       <div className="h-full overflow-y-auto">
//         <div className="p-4 border-b border-border flex justify-between items-center">
//           <h2 className="font-semibold">{t('filterMenu.title')}</h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-secondary/10 rounded-full"
//             aria-label={t('filterMenu.closeMenu')}
//           >
//             <IconX className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-2">
//           {menuItems.map((item, index) => (
//             <div key={index} className="border-b border-border last:border-0">
//               <button
//                 onClick={() => setOpenSection(openSection === index ? null : index)}
//                 className="w-full px-3 py-2 flex justify-between items-center text-foreground hover:text-primary hover:bg-secondary/10"
//               >
//                 <span>{item.title}</span>
//                 {openSection === index ? (
//                   <IconChevronUp className="w-4 h-4" />
//                 ) : (
//                   <IconChevronDown className="w-4 h-4" />
//                 )}
//               </button>
              
//               {openSection === index && (
//                 <div className="px-3 py-2 bg-secondary/5">
//                   {item.content || (
//                     <div className="space-y-2">
//                       {item.children.map((child, childIndex) => (
//                         <label
//                           key={childIndex}
//                           className="flex items-center hover:bg-secondary/10 px-3 py-1 rounded"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={selectedFilters[item.section].includes(child)}
//                             onChange={() => handleFilterChange(item.section, child)}
//                             className="mr-2"
//                           />
//                           <span className="text-sm text-muted-foreground">{child}</span>
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//           <button
//             onClick={handleApplyFilters}
//             className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
//           >
//             {t('filterMenu.applyFilters')}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterMenu;



































// // components/FilterMenu.js
// import React, { useState, useEffect } from 'react';
// import { IconChevronDown, IconChevronUp, IconX, IconSearch } from '@tabler/icons-react';
// import { useTranslations } from '../utils/i18n';
// import { useRouter } from 'next/router';

// const FilterMenu = ({ isOpen, onClose }) => {
//   const { t } = useTranslations();
//   const router = useRouter();

//   // Initialize all filters with keys that match your Typesense document fields
//   const initialFilters = {
//     domains: [],
//     year: [],
//     duration: [],
//     size: [],
//     region: [],
//     age: [],
//     sex: [],
//     other: [],
//     studyType: [],
//     industrySponsored: [],
//     bias: []
//   };

//   const [selectedFilters, setSelectedFilters] = useState(initialFilters);
//   const [openSection, setOpenSection] = useState(null);

//   // When router is ready, initialize filters from URL query parameters
//   useEffect(() => {
//     if (router.isReady) {
//       const parseQueryParam = (param) => {
//         if (!param) return [];
//         return Array.isArray(param) ? param : [param];
//       };

//       setSelectedFilters({
//         domains: parseQueryParam(router.query.domains),
//         year: parseQueryParam(router.query.year),
//         duration: parseQueryParam(router.query.duration),
//         size: parseQueryParam(router.query.size),
//         region: parseQueryParam(router.query.region),
//         age: parseQueryParam(router.query.age),
//         sex: parseQueryParam(router.query.sex),
//         other: parseQueryParam(router.query.other),
//         studyType: parseQueryParam(router.query.studyType),
//         industrySponsored: parseQueryParam(router.query.industrySponsored),
//         bias: parseQueryParam(router.query.bias)
//       });
//     }
//   }, [router.isReady, router.query]);

//   const handleFilterChange = (section, value) => {
//     setSelectedFilters(prev => {
//       const current = prev[section] || [];
//       let newValues;
//       if (current.includes(value)) {
//         newValues = current.filter(item => item !== value);
//       } else {
//         newValues = [...current, value];
//       }
//       return { ...prev, [section]: newValues };
//     });
//   };

//   const handleApplyFilters = () => {
//     // Create a new query object based on the selected filters
//     const newQuery = { ...router.query };
//     Object.entries(selectedFilters).forEach(([key, values]) => {
//       if (values.length > 0) {
//         newQuery[key] = values;
//       } else {
//         delete newQuery[key];
//       }
//     });
//     // Reset page when filters change
//     delete newQuery.page;
//     router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
//     onClose();
//   };

//   // Define the fixed options for each filter section per client requirements
//   const filterOptions = {
//     domains: [
//       "Supplements and Vitamins",
//       "Diabetes Prevention",
//       "T1D Cure Research",
//       "Diabetes Complications",
//       "Behavioral Intervention",
//       "Digital Health",
//       "Precision Medicine",
//       "Pharmacological Treatments"
//     ],
//     duration: [
//       "Short-Term (≤3 mo)",
//       "Medium-Term (3–12 mo)",
//       "Long-Term (1–5 y)",
//       "Extended (5–20+ y)"
//     ],
//     size: [
//       "Small size (≤100)",
//       "Medium size (100–500)",
//       "Large size (5000+)",
//       "Mega size (5000+)"
//     ],
//     region: [
//       "North America",
//       "Europe (EU & UK)",
//       "Asia-Pacific (APAC)",
//       "Latin America (LATAM)",
//       "Middle East & North Africa (MENA)",
//       "Sub-Saharan Africa",
//       "Global"
//     ],
//     age: [
//       "Children (≤13)",
//       "Adolescent (13–18)",
//       "Young Adult (19–39)",
//       "Middle Aged (40-64)",
//       "Older Adults (65+)"
//     ],
//     sex: ["Male", "Female"],
//     other: [
//       "with Non-diabetics",
//       "with Cardiovascular Disease",
//       "with Chronic Kidney Disease",
//       "with Obesity",
//       "with T2 Diabetes",
//       "with T1 Diabetes",
//       "with Prediabetes",
//       "with Insulin Resistance",
//       "Pregnant Women"
//     ],
//     studyType: [
//       "Meta-Analysis",
//       "Systematic Review",
//       "RCTs",
//       "Non-randomized CT",
//       "Cohort",
//       "Case-Control",
//       "Cross-Sectional"
//     ],
//     industrySponsored: ["true", "false"],
//     bias: ["Low", "Some Concerns", "High", "Very High"]
//   };

//   // Menu items for all sections.
//   // For 'year', we will use a text input instead of a checkbox grid.
//   const menuItems = [
//     {
//       title: t('filterMenu.domainsTitle') || "Domain",
//       section: 'domains',
//       items: filterOptions.domains
//     },
//     {
//       title: t('filterMenu.yearTitle') || "Year",
//       section: 'year',
//       isTextInput: true
//     },
//     {
//       title: t('filterMenu.durationTitle') || "Duration",
//       section: 'duration',
//       items: filterOptions.duration
//     },
//     {
//       title: t('filterMenu.sizeTitle') || "Size",
//       section: 'size',
//       items: filterOptions.size
//     },
//     {
//       title: t('filterMenu.regionTitle') || "Region",
//       section: 'region',
//       items: filterOptions.region
//     },
//     {
//       title: t('filterMenu.ageTitle') || "Age",
//       section: 'age',
//       items: filterOptions.age
//     },
//     {
//       title: t('filterMenu.sexTitle') || "Sex",
//       section: 'sex',
//       items: filterOptions.sex
//     },
//     {
//       title: t('filterMenu.otherTitle') || "Other",
//       section: 'other',
//       items: filterOptions.other
//     },
//     {
//       title: t('filterMenu.studyTypeTitle') || "Study Type",
//       section: 'studyType',
//       items: filterOptions.studyType
//     },
//     {
//       title: t('filterMenu.industrySponsoredTitle') || "Industry Sponsored",
//       section: 'industrySponsored',
//       items: filterOptions.industrySponsored
//     },
//     {
//       title: t('filterMenu.biasTitle') || "Bias",
//       section: 'bias',
//       items: filterOptions.bias
//     }
//   ];

//   // A reusable grid component for sections with checkboxes
//   const FilterGrid = ({ items, section }) => (
//     <div className="grid grid-cols-2 border border-border">
//       {items.map((item, index) => (
//         <label key={index} className="flex items-center border-b border-r border-border p-3">
//           <input
//             type="checkbox"
//             checked={selectedFilters[section].includes(item)}
//             onChange={() => handleFilterChange(section, item)}
//             className="mr-2"
//           />
//           <span className="text-sm">{item}</span>
//         </label>
//       ))}
//     </div>
//   );

//   return (
//     <div
//       className={`fixed inset-y-0 right-0 w-80 bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       } z-50`}
//     >
//       <div className="h-full overflow-y-auto">
//         <div className="p-4 border-b border-border flex justify-between items-center">
//           <h2 className="font-semibold">{t('filterMenu.title') || "Filters"}</h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-secondary/10 rounded-full"
//             aria-label={t('filterMenu.closeMenu') || "Close"}
//           >
//             <IconX className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-2">
//           {menuItems.map((item, index) => (
//             <div key={index} className="border-b border-border last:border-0">
//               <button
//                 onClick={() => setOpenSection(openSection === index ? null : index)}
//                 className="w-full px-3 py-2 flex justify-between items-center text-foreground hover:text-primary hover:bg-secondary/10"
//               >
//                 <span>{item.title}</span>
//                 {openSection === index ? (
//                   <IconChevronUp className="w-4 h-4" />
//                 ) : (
//                   <IconChevronDown className="w-4 h-4" />
//                 )}
//               </button>

//               {openSection === index && (
//                 <div className="px-3 py-2 bg-secondary/5">
//                   {item.isTextInput ? (
//                     <input
//                       type="text"
//                       placeholder={t('filterMenu.yearPlaceholder') || "Enter year"}
//                       value={selectedFilters[item.section][0] || ""}
//                       onChange={(e) =>
//                         setSelectedFilters((prev) => ({
//                           ...prev,
//                           [item.section]: [e.target.value]
//                         }))
//                       }
//                       className="w-full px-3 py-2 border border-border rounded"
//                     />
//                   ) : (
//                     <FilterGrid items={item.items} section={item.section} />
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}

//           <button
//             onClick={handleApplyFilters}
//             className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
//           >
//             {t('filterMenu.applyFilters') || "Apply Filters"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterMenu;

























// components/FilterMenu.js
import React, { useState, useEffect } from 'react';
import { IconChevronDown, IconChevronUp, IconX, IconSearch } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import { useRouter } from 'next/router';

const FilterMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslations();
  const router = useRouter();

  // Initialize filters with keys matching your document fields (bias_overall is used here)
  const initialFilters = {
    domains: [],
    year: [],
    duration: [],
    size: [],
    region: [],
    age: [],
    sex: [],
    other: [],
    studyType: [],
    industrySponsored: [],
    bias_overall: []
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [openSection, setOpenSection] = useState(null);

  // When router is ready, initialize filters from URL query parameters
  useEffect(() => {
    if (router.isReady) {
      const parseQueryParam = (param) => {
        if (!param) return [];
        return Array.isArray(param) ? param : [param];
      };

      setSelectedFilters({
        domains: parseQueryParam(router.query.domains),
        year: parseQueryParam(router.query.year),
        duration: parseQueryParam(router.query.duration),
        size: parseQueryParam(router.query.size),
        region: parseQueryParam(router.query.region),
        age: parseQueryParam(router.query.age),
        sex: parseQueryParam(router.query.sex),
        other: parseQueryParam(router.query.other),
        studyType: parseQueryParam(router.query.studyType),
        industrySponsored: parseQueryParam(router.query.industrySponsored),
        bias_overall: parseQueryParam(router.query.bias_overall)
      });
    }
  }, [router.isReady, router.query]);

  const handleFilterChange = (section, value) => {
    setSelectedFilters(prev => {
      const current = prev[section] || [];
      let newValues;
      if (current.includes(value)) {
        newValues = current.filter(item => item !== value);
      } else {
        newValues = [...current, value];
      }
      return { ...prev, [section]: newValues };
    });
  };

  const handleApplyFilters = () => {
    // Create a new query object based on the selected filters
    const newQuery = { ...router.query };
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        newQuery[key] = values;
      } else {
        delete newQuery[key];
      }
    });
    // Reset page when filters change
    delete newQuery.page;
    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
    onClose();
  };

  // Define the fixed options for each filter section per client requirements
  const filterOptions = {
    domains: [
      "Supplements and Vitamins",
      "Diabetes Prevention",
      "T1D Cure Research",
      "Diabetes Complications",
      "Behavioral Intervention",
      "Digital Health",
      "Precision Medicine",
      "Pharmacological Treatments"
    ],
    duration: [
      "Short-Term (≤3 mo)",
      "Medium-Term (3–12 mo)",
      "Long-Term (1–5 y)",
      "Extended (5–20+ y)"
    ],
    size: [
      "Small size (≤100)",
      "Medium size (100–500)",
      "Large size (5000+)",
      "Mega size (5000+)"
    ],
    region: [
      "North America",
      "Europe (EU & UK)",
      "Asia-Pacific (APAC)",
      "Latin America (LATAM)",
      "Middle East & North Africa (MENA)",
      "Sub-Saharan Africa",
      "Global"
    ],
    age: [
      "Children (≤13)",
      "Adolescent (13–18)",
      "Young Adult (19–39)",
      "Middle Aged (40-64)",
      "Older Adults (65+)"
    ],
    sex: ["Male", "Female"],
    other: [
      "with Non-diabetics",
      "with Cardiovascular Disease",
      "with Chronic Kidney Disease",
      "with Obesity",
      "with T2 Diabetes",
      "with T1 Diabetes",
      "with Prediabetes",
      "with Insulin Resistance",
      "Pregnant Women"
    ],
    studyType: [
      "Meta-Analysis",
      "Systematic Review",
      "RCTs",
      "Non-randomized CT",
      "Cohort",
      "Case-Control",
      "Cross-Sectional"
    ],
    industrySponsored: ["true", "false"],
    bias_overall: ["Low", "Some Concerns", "High", "Very High"]
  };

  // Menu items for each section.
  // For 'year', use a text input instead of checkboxes.
  const menuItems = [
    {
      title: t('filterMenu.domainsTitle') || "Domain",
      section: 'domains',
      items: filterOptions.domains
    },
    {
      title: t('filterMenu.yearTitle') || "Year",
      section: 'year',
      isTextInput: true
    },
    {
      title: t('filterMenu.durationTitle') || "Duration",
      section: 'duration',
      items: filterOptions.duration
    },
    {
      title: t('filterMenu.sizeTitle') || "Size",
      section: 'size',
      items: filterOptions.size
    },
    {
      title: t('filterMenu.regionTitle') || "Region",
      section: 'region',
      items: filterOptions.region
    },
    {
      title: t('filterMenu.ageTitle') || "Age",
      section: 'age',
      items: filterOptions.age
    },
    {
      title: t('filterMenu.sexTitle') || "Sex",
      section: 'sex',
      items: filterOptions.sex
    },
    {
      title: t('filterMenu.otherTitle') || "Other",
      section: 'other',
      items: filterOptions.other
    },
    {
      title: t('filterMenu.studyTypeTitle') || "Study Type",
      section: 'studyType',
      items: filterOptions.studyType
    },
    {
      title: t('filterMenu.industrySponsoredTitle') || "Industry Sponsored",
      section: 'industrySponsored',
      items: filterOptions.industrySponsored
    },
    {
      title: t('filterMenu.biasTitle') || "Bias",
      section: 'bias_overall',
      items: filterOptions.bias_overall
    }
  ];

  // A reusable grid component for sections with checkboxes
  const FilterGrid = ({ items, section }) => (
    <div className="grid grid-cols-2 border border-border">
      {items.map((item, index) => (
        <label key={index} className="flex items-center border-b border-r border-border p-3">
          <input
            type="checkbox"
            checked={selectedFilters[section].includes(item)}
            onChange={() => handleFilterChange(section, item)}
            className="mr-2"
          />
          <span className="text-sm">{item}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-semibold">{t('filterMenu.title') || "Filters"}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary/10 rounded-full"
            aria-label={t('filterMenu.closeMenu') || "Close"}
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpenSection(openSection === index ? null : index)}
                className="w-full px-3 py-2 flex justify-between items-center text-foreground hover:text-primary hover:bg-secondary/10"
              >
                <span>{item.title}</span>
                {openSection === index ? (
                  <IconChevronUp className="w-4 h-4" />
                ) : (
                  <IconChevronDown className="w-4 h-4" />
                )}
              </button>

              {openSection === index && (
                <div className="px-3 py-2 bg-secondary/5">
                  {item.isTextInput ? (
                    <input
                      type="text"
                      placeholder={t('filterMenu.yearPlaceholder') || "Enter year"}
                      value={selectedFilters[item.section][0] || ""}
                      onChange={(e) =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [item.section]: [e.target.value]
                        }))
                      }
                      className="w-full px-3 py-2 border border-border rounded"
                    />
                  ) : (
                    <FilterGrid items={item.items} section={item.section} />
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleApplyFilters}
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {t('filterMenu.applyFilters') || "Apply Filters"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
