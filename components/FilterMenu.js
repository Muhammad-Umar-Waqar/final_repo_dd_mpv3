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
  const {locale } = useTranslations();

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
  // const filterOptions = {
  //   domains: [
  //     "Supplements and Vitamins",
  //     "Diabetes Prevention",
  //     "T1D Cure Research",
  //     "Diabetes Complications",
  //     "Behavioral Intervention",
  //     "Digital Health",
  //     "Precision Medicine",
  //     "Pharmacological Treatments"
  //   ],
  //   duration: [
  //     "Short-Term (≤3 mo)",
  //     "Medium-Term (3–12 mo)",
  //     "Long-Term (1–5 y)",
  //     "Extended (5–20+ y)"
  //   ],
  //   size: [
  //     "Small size (≤100)",
  //     "Medium size (100–500)",
  //     "Large size (5000+)",
  //     "Mega size (5000+)"
  //   ],
  //   region: [
  //     "North America",
  //     "Europe (EU & UK)",
  //     "Asia-Pacific (APAC)",
  //     "Latin America (LATAM)",
  //     "Middle East & North Africa (MENA)",
  //     "Sub-Saharan Africa",
  //     "Global"
  //   ],
  //   age: [
  //     "Children (≤13)",
  //     "Adolescent (13–18)",
  //     "Young Adult (19–39)",
  //     "Middle Aged (40-64)",
  //     "Older Adults (65+)"
  //   ],
  //   sex: ["Male", "Female"],
  //   other: [
  //     "with Non-diabetics",
  //     "with Cardiovascular Disease",
  //     "with Chronic Kidney Disease",
  //     "with Obesity",
  //     "with T2 Diabetes",
  //     "with T1 Diabetes",
  //     "with Prediabetes",
  //     "with Insulin Resistance",
  //     "Pregnant Women"
  //   ],
  //   studyType: [
  //     "Meta-Analysis",
  //     "Systematic Review",
  //     "RCTs",
  //     "Non-randomized CT",
  //     "Cohort",
  //     "Case-Control",
  //     "Cross-Sectional"
  //   ],
  //   industrySponsored: ["true", "false"],
  //   bias_overall: ["Low", "Some Concerns", "High", "Very High"]
  // };

// Define the options as objects with a fixed value and a locale-dependent label
const filterOptions = {
  domains: [
    {
      value: "Supplements and Vitamins",
      label: locale === "es" ? "Suplementos y Vitaminas" : "Supplements and Vitamins"
    },
    {
      value: "Diabetes Prevention",
      label: locale === "es" ? "Prevención de Diabetes" : "Diabetes Prevention"
    },
    {
      value: "T1D Cure Research",
      label: locale === "es" ? "Investigación sobre la Cura de la T1D" : "T1D Cure Research"
    },
    {
      value: "Diabetes Complications",
      label: locale === "es" ? "Complicaciones de la Diabetes" : "Diabetes Complications"
    },
    {
      value: "Behavioral Intervention",
      label: locale === "es" ? "Intervención Conductual" : "Behavioral Intervention"
    },
    {
      value: "Digital Health",
      label: locale === "es" ? "Salud Digital" : "Digital Health"
    },
    {
      value: "Precision Medicine",
      label: locale === "es" ? "Medicina de Precisión" : "Precision Medicine"
    },
    {
      value: "Pharmacological Treatments",
      label: locale === "es" ? "Tratamientos Farmacológicos" : "Pharmacological Treatments"
    }
  ],
  duration: [
    {
      value: "Short-Term (≤3 mo)",
      label: locale === "es" ? "Corto Plazo (≤3 meses)" : "Short-Term (≤3 mo)"
    },
    {
      value: "Medium-Term (3–12 mo)",
      label: locale === "es" ? "Mediano Plazo (3–12 meses)" : "Medium-Term (3–12 mo)"
    },
    {
      value: "Long-Term (1–5 y)",
      label: locale === "es" ? "Largo Plazo (1–5 años)" : "Long-Term (1–5 y)"
    },
    {
      value: "Extended (5–20+ y)",
      label: locale === "es" ? "Extendido (5–20+ años)" : "Extended (5–20+ y)"
    }
  ],
  size: [
    {
      value: "Small size (≤100)",
      label: locale === "es" ? "Tamaño pequeño (≤100)" : "Small size (≤100)"
    },
    {
      value: "Medium size (100–500)",
      label: locale === "es" ? "Tamaño mediano (100–500)" : "Medium size (100–500)"
    },
    {
      value: "Large size (5000+)",
      label: locale === "es" ? "Tamaño grande (5000+)" : "Large size (5000+)"
    },
    {
      value: "Mega size (5000+)",
      label: locale === "es" ? "Tamaño mega (5000+)" : "Mega size (5000+)"
    }
  ],
  region: [
    {
      value: "North America",
      label: locale === "es" ? "Norteamérica" : "North America"
    },
    {
      value: "Europe (EU & UK)",
      label: locale === "es" ? "Europa (UE y Reino Unido)" : "Europe (EU & UK)"
    },
    {
      value: "Asia-Pacific (APAC)",
      label: locale === "es" ? "Asia-Pacífico (APAC)" : "Asia-Pacific (APAC)"
    },
    {
      value: "Latin America (LATAM)",
      label: locale === "es" ? "Latinoamérica (LATAM)" : "Latin America (LATAM)"
    },
    {
      value: "Middle East & North Africa (MENA)",
      label: locale === "es" ? "Medio Oriente y Norte de África (MENA)" : "Middle East & North Africa (MENA)"
    },
    {
      value: "Sub-Saharan Africa",
      label: locale === "es" ? "África Subsahariana" : "Sub-Saharan Africa"
    },
    {
      value: "Global",
      label: "Global"  // Same in both languages
    }
  ],
  age: [
    {
      value: "Children (≤13)",
      label: locale === "es" ? "Niños (≤13)" : "Children (≤13)"
    },
    {
      value: "Adolescent (13–18)",
      label: locale === "es" ? "Adolescentes (13–18)" : "Adolescent (13–18)"
    },
    {
      value: "Young Adult (19–39)",
      label: locale === "es" ? "Adultos Jóvenes (19–39)" : "Young Adult (19–39)"
    },
    {
      value: "Middle Aged (40-64)",
      label: locale === "es" ? "Adultos de Mediana Edad (40-64)" : "Middle Aged (40-64)"
    },
    {
      value: "Older Adults (65+)",
      label: locale === "es" ? "Adultos Mayores (65+)" : "Older Adults (65+)"
    }
  ],
  sex: [
    {
      value: "Male",
      label: locale === "es" ? "Masculino" : "Male"
    },
    {
      value: "Female",
      label: locale === "es" ? "Femenino" : "Female"
    }
  ],
  other: [
    {
      value: "with Non-diabetics",
      label: locale === "es" ? "con No diabéticos" : "with Non-diabetics"
    },
    {
      value: "with Cardiovascular Disease",
      label: locale === "es" ? "con Enfermedad Cardiovascular" : "with Cardiovascular Disease"
    },
    {
      value: "with Chronic Kidney Disease",
      label: locale === "es" ? "con Enfermedad Renal Crónica" : "with Chronic Kidney Disease"
    },
    {
      value: "with Obesity",
      label: locale === "es" ? "con Obesidad" : "with Obesity"
    },
    {
      value: "with T2 Diabetes",
      label: locale === "es" ? "con Diabetes Tipo 2" : "with T2 Diabetes"
    },
    {
      value: "with T1 Diabetes",
      label: locale === "es" ? "con Diabetes Tipo 1" : "with T1 Diabetes"
    },
    {
      value: "with Prediabetes",
      label: locale === "es" ? "con Prediabetes" : "with Prediabetes"
    },
    {
      value: "with Insulin Resistance",
      label: locale === "es" ? "con Resistencia a la Insulina" : "with Insulin Resistance"
    },
    {
      value: "Pregnant Women",
      label: locale === "es" ? "Mujeres Embarazadas" : "Pregnant Women"
    }
  ],
  studyType: [
    {
      value: "Meta-Analysis",
      label: locale === "es" ? "Meta-análisis" : "Meta-Analysis"
    },
    {
      value: "Systematic Review",
      label: locale === "es" ? "Revisión Sistemática" : "Systematic Review"
    },
    {
      value: "RCTs",
      label: locale === "es" ? "Ensayos Controlados Aleatorios" : "RCTs"
    },
    {
      value: "Non-randomized CT",
      label: locale === "es" ? "Ensayos Clínicos No Aleatorizados" : "Non-randomized CT"
    },
    {
      value: "Cohort",
      label: "Cohort"  // Use same value if translation is not required or if it is understood as is
    },
    {
      value: "Case-Control",
      label: locale === "es" ? "Caso-Control" : "Case-Control"
    },
    {
      value: "Cross-Sectional",
      label: locale === "es" ? "Transversal" : "Cross-Sectional"
    }
  ],
  industrySponsored: [
    {
      value: "true",
      label: locale === "es" ? "Verdadero" : "true"
    },
    {
      value: "false",
      label: locale === "es" ? "Falso" : "false"
    }
  ],
  bias_overall: [
    {
      value: "Low",
      label: locale === "es" ? "Bajo" : "Low"
    },
    {
      value: "Some Concerns",
      label: locale === "es" ? "Algunas Preocupaciones" : "Some Concerns"
    },
    {
      value: "High",
      label: locale === "es" ? "Alto" : "High"
    },
    {
      value: "Very High",
      label: locale === "es" ? "Muy Alto" : "Very High"
    }
  ]
};

  

  // Menu items for each section.
  // For 'year', use a text input instead of checkboxes.
  const menuItems = [
    {
      title: t('filterMenu.sections.domainsTitle') || "Domain",
      section: 'domains',
      items: filterOptions.domains
    },
    {
      title: t('filterMenu.sections.yearTitle') || "Year",
      section: 'year',
      isTextInput: true
    },
    {
      title: t('filterMenu.sections.durationTitle') || "Duration",
      section: 'duration',
      items: filterOptions.duration
    },
    {
      title: t('filterMenu.sections.sizeTitle') || "Size",
      section: 'size',
      items: filterOptions.size
    },
    {
      title: t('filterMenu.sections.regionTitle') || "Region",
      section: 'region',
      items: filterOptions.region
    },
    {
      title: t('filterMenu.sections.ageTitle') || "Age",
      section: 'age',
      items: filterOptions.age
    },
    {
      title: t('filterMenu.sections.sexTitle') || "Sex",
      section: 'sex',
      items: filterOptions.sex
    },
    {
      title: t('filterMenu.sections.otherTitle') || "Other",
      section: 'other',
      items: filterOptions.other
    },
    {
      title: t('filterMenu.sections.studyTypeTitle') || "Study Type",
      section: 'studyType',
      items: filterOptions.studyType
    },
    {
      title: t('filterMenu.sections.industrySponsoredTitle') || "Industry Sponsored",
      section: 'industrySponsored',
      items: filterOptions.industrySponsored
    },
    {
      title: t('filterMenu.sections.biasTitle') || "Bias",
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
            checked={selectedFilters[section].includes(item.value)}
            onChange={() => handleFilterChange(section, item.value)}
            className="mr-2"
          />
          <span className="text-sm">{item.label}</span>
        </label>
      ))}
    </div>
  );
  

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 sm:w-[22rem] bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
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
                  {/* {item.isTextInput ? (
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
                  )} */}

{item.isTextInput ? (
  item.section === 'year' ? (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder={t('filterMenu.yearFromPlaceholder') || "From"}
        value={selectedFilters.year[0] || ""}
        onChange={(e) =>
          setSelectedFilters(prev => ({
            ...prev,
            year: [e.target.value, prev.year[1] || ""]
          }))
        }
        className="w-1/2 px-3 py-2 border border-border rounded"
      />
      <input
        type="text"
        placeholder={t('filterMenu.yearToPlaceholder') || "To"}
        value={selectedFilters.year[1] || ""}
        onChange={(e) =>
          setSelectedFilters(prev => ({
            ...prev,
            year: [prev.year[0] || "", e.target.value]
          }))
        }
        className="w-1/2 px-3 py-2 border border-border rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      placeholder={t('filterMenu.yearPlaceholder') || "Enter year"}
      value={selectedFilters[item.section][0] || ""}
      onChange={(e) =>
        setSelectedFilters(prev => ({
          ...prev,
          [item.section]: [e.target.value]
        }))
      }
      className="w-full px-3 py-2 border border-border rounded"
    />
  )
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
