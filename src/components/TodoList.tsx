import axiosinstance from "../config/axios config";
import Button from "./ui/Button"
import { useQuery } from '@tanstack/react-query'

const TodoList = () => {
const storageKey = "loggedinUser";
const userDataString =  localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const {isLoading, data,error} = useQuery({
  queryKey: ['todo'],
  queryFn:async() =>{
    const {data}= await axiosinstance.get("/users/me?populate=todoayas",{
      headers: {
        Authorization: `Bearer ${userData.jwt}`
      }
    }
  )
  return data;
  }
})

console.log(isLoading,data,error);

if(isLoading) return <p>Loading....</p>
if(error) return "An error has occurred" + error.message
return (
    <>
    <div className="flex flex-col w-full flex-wrap items-center justify-between">
     
     {data.todoayas.map(todo =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <p className="w-full font-semibold"> 1- {todo.title}</p>
        <Button size={"sm"}>Edit</Button>
        <Button variant={"danger"} size={"sm"}>Remove</Button>
    </div>
      ))}
      </div>
 
       
    </>
  )
}

export default TodoList