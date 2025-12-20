interface IPaginatorProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const Paginator = ({ page, totalPages, onPrevious, onNext, isFirstPage, isLastPage }: IPaginatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button 
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={onPrevious} 
        disabled={isFirstPage}
      >
        Previous
      </button>
      
      <span className="px-4 py-2 text-sm font-medium text-gray-700">
        Page {page} of {totalPages}
      </span>
      
      <button 
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={onNext} 
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
}

export default Paginator;
