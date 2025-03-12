import React from 'react';
import Link from 'next/link';
import { useTranslations } from '../../utils/i18n';
import { getEffectivenessColor } from '../../lib/research/filter-options';
import Footer from '../Footer';

const ResearchPage = ({ studies, type, mainItem, outcome }) => {
  const { t } = useTranslations();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {t('researchTable.studiesFor')} {mainItem}
        </h1>
        <h2 className="text-xl mb-8">
          {t('researchTable.outcome')}: {outcome}
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-input">
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  {t('researchTable.tableHeaders.title')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  {t('researchTable.tableHeaders.size')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  {t('researchTable.tableHeaders.effectiveness')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                  {t('researchTable.tableHeaders.bias')}
                </th>
              </tr>
            </thead>
            <tbody>
              {studies.map((study, index) => {
                // Convertir effectiveness a label
                let effectivenessLabel = 'Low';
                if (study.effectiveness === 2) effectivenessLabel = 'Med';
                else if (study.effectiveness >= 3) effectivenessLabel = 'High';

                // Convertir el tamaño a la clave de traducción
                const sizeKey = study.size.toLowerCase()
                  .replace(/\s+/g, '_')
                  .replace(/\(|\)/g, '');

                return (
                  <tr 
                    key={study.uid || index}
                    className="border-b border-input hover:bg-accent/50"
                  >
                    <td className="px-6 py-4">
                      <Link 
                        href={`/${study.uid}`} 
                        className="text-primary hover:underline"
                      >
                        {study.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {t(`researchTable.size.${sizeKey}`)}
                    </td>
                    <td className={`px-6 py-4 ${getEffectivenessColor(effectivenessLabel)}`}>
                      {t(`researchTable.effectiveness.${effectivenessLabel.toLowerCase()}`)}
                    </td>
                    <td className="px-6 py-4">
                      {t(`researchTable.bias.${study.bias.toLowerCase().replace(/\s+/g, '_')}`)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mostrar el número total de estudios */}
        <div className="mt-4 text-sm text-muted-foreground">
          {t('researchTable.totalStudies')} {studies.length}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResearchPage;