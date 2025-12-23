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
    const [page, setPage] = useState(1);
  const {isLoading, data} = UseAuthenticatedQuery({
  url:"/todoayas",
  querykey:['paginationTodos' ,`page=${page}`],
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



  return (
    <>
     {data.data.length ? data.data.map((todo: ITodo) =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <div className="w-full">
          <h3 className="font-semibold"> {todo.id}- {todo.title}</h3>
        </div>
       
    </div>
      )): <p>No Todos yet</p>}
      <Paginator page={page} pageCount={5}  onClickNext={onClickNext}  onClickPrevious={onClickPrevious}/>
    </>
  );
};

export default TodosPage;
