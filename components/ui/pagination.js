import { usePathname, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
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
        <nav className="flex justify-center items-center gap-2 mt-8">
            <Link href={currentPage > 1 ? createPageURL(currentPage - 1) : ''} scroll={false}>
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    className="h-8 w-8"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>

            <div className="flex items-center gap-2">
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 py-1">
                                {page}
                            </span>
                        );
                    }

                    return (
                        <Link key={page} href={createPageURL(page)} scroll={false}>
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                className="h-8 w-8"
                            >
                                {page}
                            </Button>
                        </Link>
                    );
                })}
            </div>

            <Link href={currentPage < totalPages ? createPageURL(currentPage + 1) : ''} scroll={false}>
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    className="h-8 w-8"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </Link>
        </nav>
    );
}

export default Pagination;