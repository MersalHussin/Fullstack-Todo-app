import { useState } from "react";
import Paginator from "../components/Paginator";
import TodoSkeleton from "../components/TodoSkeleton";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
interface ITodo {
  id?: number;
  documentId: string;
  title: string;
  description: string;
}

  // Handlers
  const storageKey = "loggedinUser";
  const userDataString =  localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const TodosPage=()=>{
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState("DESC");
  const {isLoading, data ,isFetching} = UseAuthenticatedQuery({
  url:`/todoayas?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
  querykey:[`todos-page-${page}` , `pageSize-${pageSize}` , `sortBy-${sortBy}`],
  config: {
    headers: {
      Authorization: `Bearer ${userData.jwt}`
    }
  }
});

if(isLoading) return(
  <div className="space-y-2">
    {Array.from({length:3},(_,idx) => (
      <TodoSkeleton key={idx}/>
    ))
    }
  </div>
)

console.log(data);

// Handlers:
  const onClickNext = () => {
    console.log("Next Page clicked");
    setPage(prev => prev + 1);
    console.log(page);
  }
  const onClickPrevious = () => {
    console.log("Previous Page clicked");
    setPage(prev => prev - 1);
    console.log(page);
  }

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  }
  const onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  }


  return (
    <>
      <select name="Sort by" id="12" className="border p-2 rounded-md mb-4" value={sortBy} onChange={onChangeSortBy}>
        <option value="ASC">Oldest</option>
        <option value="DESC">Latest</option>
      </select>
      <select name="Page Size" id="12" className="border p-2 rounded-md mb-4" value={pageSize} onChange={onChangePageSize}>
        <option disabled value="">Page Size</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="40">40</option>
      </select>
     {data.data.length ? data.data.map((todo: ITodo) =>(
       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <div className="w-full">
          <h3 className="font-semibold"> {todo.id}- {todo.title}</h3>
        </div>
       
    </div>
      )): <p>No Todos yet</p>}
      <Paginator page={page} pageCount={data.meta.pagination.pageCount} records={data.meta.pagination.total} onClickNext={onClickNext} isLoading= {isLoading || isFetching} onClickPrevious={onClickPrevious}/>
    </>
  );
};

export default TodosPage;
