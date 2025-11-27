import { useState } from "react";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "./ui/Button"
import Input from "./ui/Input";
import Modal from "./ui/Modal";

interface ITodo {
  id: number;
  title: string;
}

const TodoList = () => {

const [isEditModalOpen , setIsEditModalOpen] = useState(false)
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



// Handelers
const onToggleEditModal = () =>{
  setIsEditModalOpen(prev => !prev)
}

if(isLoading) return <p>Loading....</p>
return (
    <>
    <div className="flex flex-col w-full flex-wrap items-center justify-between">
     
     {data.todoayas.length ? data.todoayas.map((todo: ITodo) =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <p className="w-full font-semibold"> 1- {todo.title}</p>
        <Button onClick={onToggleEditModal} size={"sm"}>Edit</Button>
        <Button variant={"danger"} size={"sm"}>Remove</Button>
    </div>
      )): <p>No Todos yet</p>}

      <Modal isOpen={isEditModalOpen} closeModal={onToggleEditModal} title="Edit this Tood"  >
        <Input value="Edit Todo"/>
        <div className="flex gap-2 mt-4">
        <Button onClick={onToggleEditModal} size={"sm"}>Cancel</Button>
        <Button variant={"cancel"} size={"sm"}>Apply</Button>
        </div>
      </Modal>
      </div>
 
       
    </>
  )
}

export default TodoList