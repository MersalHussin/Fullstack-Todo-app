import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "./ui/Button"

const TodoList = () => {
const storageKey = "loggedinUser";
const userDataString =  localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const {isLoading, data} = UseAuthenticatedQuery({
  url:"/users/me?populate=todoayas",
  querykey:['todos'],
  config: {
    headers: {
      Authorization: `Bearer ${userData.jwt}`
    }
  }
});

if(isLoading) return <p>Loading....</p>
return (
    <>
    <div className="flex flex-col w-full flex-wrap items-center justify-between">
     
     {data.todoayas.length ? data.todoayas.map(todo =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <p className="w-full font-semibold"> 1- {todo.title}</p>
        <Button size={"sm"}>Edit</Button>
        <Button variant={"danger"} size={"sm"}>Remove</Button>
    </div>
      )): <p>No Todos yet</p>}
      </div>
 
       
    </>
  )
}

export default TodoList