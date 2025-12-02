import { ChangeEvent, FormEvent, useState } from "react";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "./ui/Button"
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import axiosinstance from "../config/axios config";

interface ITodo {
  id: number;
  documentId: string;
  title: string;
  description: string;
}

const TodoList = () => {

const [isEditModalOpen , setIsEditModalOpen] = useState(false)
const [todoToEdit, setTodoToEdit] = useState<ITodo>({
  description: "",
    documentId: "",
  id: 0,
  title: ""
});
const storageKey = "loggedinUser";
const userDataString =  localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const {isLoading, data} = UseAuthenticatedQuery({
  url:"/users/me?populate=todoayas",
  querykey:['todoayas'],
  config: {
    headers: {
      Authorization: `Bearer ${userData.jwt}`
    }
  }
});



// Handelers
const  onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {value, name} = e.target;
  setTodoToEdit({
    ...todoToEdit,
    [name]: value
  })
}
const  onSubmitHandler = async (e : FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const{title, description} = todoToEdit;
    console.log(todoToEdit.documentId);
    try {
      const res = await axiosinstance.put(`/todoayas/${todoToEdit.documentId}`, {data: {title , description}},{
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
}

const onCloseEditModal = () =>{
  setIsEditModalOpen(false);
  setTodoToEdit({
    id: 0,
    documentId: "",
    title: "",
    description: "",
 })}
const onOpenEditModal = (todo:ITodo) => {
  setTodoToEdit(todo)
  setIsEditModalOpen(true);
}

if(isLoading) return <p>Loading....</p>

return (
    <>
    <div className="flex flex-col w-full flex-wrap items-center justify-between">
     {data.todoayas.length ? data.todoayas.map((todo: ITodo) =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <div className="w-full">
          <p className="font-semibold">{todo.title}</p>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </div>
        <Button onClick={() => onOpenEditModal(todo)} size={"sm"}>Edit</Button>
        <Button variant={"danger"} size={"sm"}>Remove</Button>
    </div>
      )): <p>No Todos yet</p>}

      <Modal isOpen={isEditModalOpen} closeModal={onCloseEditModal} title="Edit this Tood"  >
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <Input value={todoToEdit.title} onChange={onChangeHandler} name="title"/>
        <Textarea  value={todoToEdit.description} onChange={onChangeHandler} name="description" placeholder="Edit Description" className="mt-4 w-full"/>
        <div className="flex gap-2 mt-4">
        <Button onClick={onCloseEditModal} size={"sm"}>Cancel</Button>
        <Button variant={"cancel"} size={"sm"} >Apply</Button>
        </div>
      </form>
      </Modal>
      </div>
 
       
    </>
  )
}

export default TodoList