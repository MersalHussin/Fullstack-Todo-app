import { useEffect, useState } from "react"
import Button from "./ui/Button"
import axiosinstance from "../config/axios config"


const TodoList = () => {
const [todos, setTodos] = useState([]);
const [isLoading, setIsLoading] = useState(true); 
const storageKey = "loggedinUser";
const userDataString =  localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

useEffect(() =>{
  try{
    axiosinstance.get("/users/me?populate=todoayas", {
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      }
    })
    .then((res => setTodos(res.data.todoayas)))
    .catch(err => console.log("This is error", err))
    .finally(() => setIsLoading(false));
  }catch(error){
    console.log(error);
  }
},[userData?.jwt])

if(isLoading){
  return <p>Loading...</p>
}

  return (
    <>
    <div className="flex flex-col w-full flex-wrap items-center justify-between">
      {todos.length ? todos.map(todo => (

      <div key={todo.id} className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <p className="w-full font-semibold"> 1- {todo.title}</p>
        <Button size={"sm"}>Edit</Button>
        <Button variant={"danger"} size={"sm"}>Remove</Button>
    </div>
      )) : (<p>No todos found.</p>)}
      </div>
 
       
    </>
  )
}

export default TodoList