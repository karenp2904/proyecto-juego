import React from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    const getPageNumbers = () => {
        const pages = [];
        const leftLimit = Math.max(1, currentPage - 2);
        const rightLimit = Math.min(totalPages, currentPage + 2);

        for (let i = leftLimit; i <= rightLimit; i++) {
            pages.push(i);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center my-2 space-x-1 ">
            <button
                className={`px-2 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary text-white hover:bg-secundary'}`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}>
                <MdArrowBack className="w-6 h-6" />
            </button>

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    className={`px-4 md:px-4 py-2  rounded ${page === currentPage ? 'bg-primary text-white font-bold' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => handlePageChange(page)}>
                    {page}
                </button>
            ))}

            <button
                className={`px-4 py-2  rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary text-white hover:bg-secundary'}`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}>
                <MdArrowForward className="w-6 h-6" />
            </button>
        </div>
    );
};

export default Pagination;
