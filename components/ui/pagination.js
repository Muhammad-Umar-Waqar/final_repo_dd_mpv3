import { useRouter } from 'next/router';
import { useTranslations } from '../../utils/i18n';

const Pagination = ({ totalPages }) => {
    const router = useRouter();
    const { t } = useTranslations();
    const currentPage = Number(router.query.page) || 1;

    const handlePageChange = (pageNumber) => {
        const query = { ...router.query, page: pageNumber.toString() };
        router.push({
            pathname: router.pathname,
            query
        }, undefined, { shallow: true, scroll: false });
    };

    if (totalPages <= 1) {
        return null;
    }

    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
            pages.push('...');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);
    }

    return (
        <div className="flex justify-center items-center space-x-2 mt-12">
            <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {t('newsGrid.pagination.previous')}
            </button>

            {pages.map((page, index) => {
                if (page === '...') {
                    return (
                        <span 
                            key={`ellipsis-${index}`} 
                            className="px-3 py-2 text-sm text-muted-foreground"
                        >
                            {page}
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === page
                                ? 'text-primary-foreground bg-primary hover:bg-primary/90'
                                : 'text-foreground bg-background border border-border hover:bg-secondary/10'
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {t('newsGrid.pagination.next')}
            </button>
        </div>
    );
}

export default Pagination;