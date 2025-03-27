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
          <div className='flex items-center justify-around gap-2'>
            <button   onClick={() => {
    router.push({ pathname: router.pathname }, undefined, { shallow: true });
  }} className='text-sm underline text-gray-700 hover:text-primary'>Clear All</button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary/10 rounded-full"
            aria-label={t('filterMenu.closeMenu') || "Close"}
            >
            <IconX className="w-5 h-5" />
          </button>
            </div>
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
