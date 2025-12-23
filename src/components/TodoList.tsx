import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "./ui/Button"
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import axiosinstance from "../config/axios config";
import { editModelSchema } from "../validation";
import InputErrorMessage from "./InputErrorMessage";
import TodoSkeleton from "./TodoSkeleton";
import { faker } from '@faker-js/faker';


interface ITodo {
  id?: number;
  documentId: string;
  title: string;
  description: string;
}


interface IEditFormInput {
  title: string;
  description?: string;
}

interface IAddFormInput {
  title: string;
  description?: string;
}

const TodoList = () => {
  const queryClient = useQueryClient();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, reset: resetEdit } = useForm<IEditFormInput>({
    resolver: yupResolver(editModelSchema),
    mode: "onSubmit"
  });
  const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd }, reset: resetAdd } = useForm<IAddFormInput>({
    resolver: yupResolver(editModelSchema),
    mode: "onSubmit"
  });

const [isUpdating , setIsUpdating] = useState(false)
const [isRemoveOpen , setIsRemoveOpen] = useState(false)
const [isEditModalOpen , setIsEditModalOpen] = useState(false)
const [isAddModalOpen , setIsAddModalOpen] = useState(false)
const [todoToEdit, setTodoToEdit] = useState<ITodo>();
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
const  onSubmitHandler: SubmitHandler<IEditFormInput> = async (data) =>{
  setIsUpdating(true)
    const{title, description} = data;
    try {
      const res = await axiosinstance.put(`/todoayas/${todoToEdit?.documentId}`, {data: {title , description}},{
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ['todoayas'] });
      onCloseEditModal();
    } catch (error) {
      console.log(error);
    } finally{
      setIsUpdating(false)
    }
}
const  onSubmitAddHandler: SubmitHandler<IAddFormInput> = async (data) =>{
  setIsUpdating(true)
    const{title, description} = data;
    try {
      await axiosinstance.post(`/todoayas`, {data: {title, description,user:[userData.user.id]}},{
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      queryClient.invalidateQueries({ queryKey: ['todoayas'] });
      onCloseAddModal();
    } catch (error) {
      console.log(error);
    } finally{
      setIsUpdating(false)
    }
}

// Add Model
const onCloseAddModal = () =>{
  setIsAddModalOpen(false);
  resetAdd();
}
const onOpenAddModal = () =>{
  setIsAddModalOpen(true);
  resetAdd();
}

// Edit Model
const onCloseEditModal = () =>{
  setIsEditModalOpen(false);
  resetEdit();
}

const onOpenEditModal = (todo:ITodo) => {
  setTodoToEdit(todo);
  setIsEditModalOpen(true);
  resetEdit({ title: todo.title, description: todo.description });
}

// Remove Modal
  const removeHandler = async () =>{
    setIsUpdating(true);
    try {
      await axiosinstance.delete(`/todoayas/${todoToEdit?.documentId}`,{
        headers:{
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      queryClient.invalidateQueries({ queryKey: ['todoayas'] });
      closeRemoveModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }
  const openRemoveModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsRemoveOpen(true);
  }
  function closeRemoveModal() {
    setIsRemoveOpen(false);
  }
if(isLoading) return(
  <div className="space-y-2">
    {Array.from({length:3},(_,idx) => (
      <TodoSkeleton key={idx}/>
    ))
    }
  </div>
)

const generateTodos = async () => {
  for (let i = 0; i < 100; i++) {
    try {
      const {data} = await axiosinstance.post(`/todoayas`, {data: {title:faker.word.words(5) , description:faker.lorem.paragraph(2) ,user:[userData.user.id]}},{
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally{
      setIsUpdating(false)
    }
}
    
  }

return (
    <>
    <div className="flex flex-col w-full flex-wrap items-center justify-between">
      <div className="flex w-full items-center justify-center gap-2 mb-4">
        <Button onClick={() => onOpenAddModal()}>Post New Todo</Button>
        <Button onClick={() => generateTodos()}>Generate todos</Button>
      </div>
     {data.todoayas.length ? data.todoayas.map((todo: ITodo) =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <div className="w-full">
          <p className="font-semibold"> {todo.id}- {todo.title}</p>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </div>
        <Button onClick={() => onOpenEditModal(todo)} size={"sm"}>Edit</Button>
        <Button onClick={()=> openRemoveModal(todo)} variant={"danger"} size={"sm"}>Remove</Button>
    </div>
      )): <p>No Todos yet</p>}

      <Modal isOpen={isEditModalOpen} closeModal={onCloseEditModal} title="Edit this Todo"  >
      <form onSubmit={handleSubmitEdit(onSubmitHandler)} className="space-y-4">
        <div>
          <Input {...registerEdit("title")} placeholder="Title" />
          {errorsEdit.title && <InputErrorMessage msg={errorsEdit.title.message} />}
        </div>
        <div>
          <Textarea {...registerEdit("description")} placeholder="Description" className="w-full"/>
          {errorsEdit.description && <InputErrorMessage msg={errorsEdit.description.message} />}
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="button" variant={"cancel"} onClick={onCloseEditModal} size={"sm"}>Cancel</Button>
          <Button type="submit"  size={"sm"} isLoading={isUpdating}>Apply</Button>
        </div>
      </form>
      </Modal>
      </div>


      {/* Delete Modal */}
        <Modal
        isOpen={isRemoveOpen}
        closeModal={closeRemoveModal}
        title="Are you Sure to remove this modal"
      >
          <p className="text-gray-500 text-md font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis  eum unde corporis odit voluptatem repellendus minus incidunt laudantium! Quaerat.</p>
<div className="flex gap-3 pt-1  ">
            <Button className="flex-1 bg-red-600 " style={{background:"red"}} onClick={removeHandler} isLoading={isUpdating}>Yes, Remove</Button>
          <Button type="button" onClick={closeRemoveModal} className="flex-1 bg-gray-100 hover:bg-gray-200" style={{color:"black", backgroundColor:"gray"}}>Cancel</Button>
</div>
      </Modal>
 
      {/* Add Modal */}
           <Modal isOpen={isAddModalOpen} closeModal={onCloseAddModal} title="Add New Todo"  >
      <form onSubmit={handleSubmitAdd(onSubmitAddHandler)} className="space-y-4">
        <div>
          <Input {...registerAdd("title")} placeholder="Title" />
          {errorsAdd.title && <InputErrorMessage msg={errorsAdd.title.message} />}
        </div>
        <div>
          <Textarea {...registerAdd("description")} placeholder="Description" className="w-full"/>
          {errorsAdd.description && <InputErrorMessage msg={errorsAdd.description.message} />}
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="button" variant={"cancel"} onClick={onCloseAddModal} size={"sm"}>Cancel</Button>
          <Button type="submit"  size={"sm"} isLoading={isUpdating}>Add</Button>
        </div>
      </form>
      </Modal>
  
 
       
    </>
  )
}

export default TodoList