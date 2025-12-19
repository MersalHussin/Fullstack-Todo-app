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

interface ITodo {
  id: number;
  documentId: string;
  title: string;
  description: string;
}

interface IEditFormInput {
  title: string;
  description?: string;
}

const TodoList = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IEditFormInput>({
    resolver: yupResolver(editModelSchema),
    mode: "onSubmit"
  });

const [isUpdating , setIsUpdating] = useState(false)
const [isRemoveOpen , setIsRemoveOpen] = useState(false)
const [isEditModalOpen , setIsEditModalOpen] = useState(false)
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


const onCloseEditModal = () =>{
  setIsEditModalOpen(false);
  reset();
}

const onOpenEditModal = (todo:ITodo) => {
  setTodoToEdit(todo);
  setIsEditModalOpen(true);
  reset({ title: todo.title, description: todo.description });
}

  const removeHandler = () =>{
    try {
      const res = axiosinstance.delete(`/todoayas/${todoToEdit?.documentId}`,{
        headers:{
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      console.log(res);
      closeRemoveModal()
    } catch (error) {
      console.log(error);
    }
  }
  
  const openRemoveModal = () => {
    setIsRemoveOpen(true)
  }
  function closeRemoveModal() {
    setIsRemoveOpen(false)
  }
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
    <div className="flex flex-col w-full flex-wrap items-center justify-between">
     {data.todoayas.length ? data.todoayas.map((todo: ITodo) =>(

       <div key={todo.id}  className="flex items-center justify-between w-full mb-4 p-4 border rounded-md">
        <div className="w-full">
          <p className="font-semibold">{todo.title}</p>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </div>
        <Button onClick={() => onOpenEditModal(todo)} size={"sm"}>Edit</Button>
        <Button onClick={()=> openRemoveModal()} variant={"danger"} size={"sm"}>Remove</Button>
    </div>
      )): <p>No Todos yet</p>}

      <Modal isOpen={isEditModalOpen} closeModal={onCloseEditModal} title="Edit this Todo"  >
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div>
          <Input {...register("title")} placeholder="Title" />
          {errors.title && <InputErrorMessage msg={errors.title.message} />}
        </div>
        <div>
          <Textarea {...register("description")} placeholder="Description" className="w-full"/>
          {errors.description && <InputErrorMessage msg={errors.description.message} />}
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
        closeModal={onCloseEditModal}
        title="Are you Sure to remove this modal"
      >
          <p className="text-gray-500 text-md font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis  eum unde corporis odit voluptatem repellendus minus incidunt laudantium! Quaerat.</p>
<div className="flex gap-3 pt-1  ">
            <Button className="flex-1 bg-red-600 " style={{background:"red"}} onClick={removeHandler}>Yes, Remove</Button>
          <Button type="button" onClick={closeRemoveModal} className="flex-1 bg-gray-100 hover:bg-gray-200" style={{color:"black", backgroundColor:"gray"}}>Cancel</Button>
</div>
      </Modal>
 
       
    </>
  )
}

export default TodoList