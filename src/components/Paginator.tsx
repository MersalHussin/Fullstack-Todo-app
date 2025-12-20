interface IPaginatorProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ page, totalPages, onPageChange }: IPaginatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button 
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 1}
      >
        Previous
      </button>
      
      <span className="px-4 py-2 text-sm font-medium text-gray-700">
        Page {page} of {totalPages}
      </span>
      
      <button 
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={() => onPageChange(page + 1)} 
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Paginator;
