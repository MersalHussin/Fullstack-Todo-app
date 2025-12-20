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
const {isLoading, data} = UseAuthenticatedQuery({
  url:"/todoayas",
  querykey:['paginationTodos'],
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
  return (
    <>
     {data.data.length ? data.data.map((todo: ITodo) =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <div className="w-full">
          <h3 className="font-semibold"> {todo.id}- {todo.title}</h3>
        </div>
       
    </div>
      )): <p>No Todos yet</p>}
      <Paginator/>
    </>
  );
};

export default TodosPage;
