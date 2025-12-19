const TodoSkeleton = () => {
  return (
  <div role="status" className="max-w-full p-4 rounded-base shadow-xs animate-pulse ">
<div className="flex items-center justify-between  px-4" >
        <div>
            <div className="h-2.5 bg-gray-400 rounded-full w-24 mb-2.5"></div>
        </div>
        <div className="flex items-center gap-1 justify-center">
        <div className="h-10 bg-gray-400 rounded-md w-20 "></div>
        <div className="h-10 bg-gray-400 rounded-md w-20"></div>
        </div>
  </div>
  </div>
  );
};

export default TodoSkeleton;
