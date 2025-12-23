interface IProps {
  page: number;
  pageCount: number;
  records: number;
  isLoading: boolean;
  onClickNext?: () => void;
  onClickPrevious?: () => void;
}
const Paginator = ({page = 1,records,pageCount = 10,onClickNext,onClickPrevious}:IProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button 
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disable disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={page === 1}
        onClick={onClickPrevious}>
        Previous
      </button>
      
      <span className="px-4 py-2 text-sm font-medium text-gray-700">
        Page {page} to {pageCount} of {records} Records 
      </span>
      
      <button 
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={pageCount === page}
             onClick={onClickNext}
      >
        Next
      </button>
    </div>
  );
}

export default Paginator;
