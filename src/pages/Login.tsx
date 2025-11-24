import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/InputErrorMessage";
import { LOGIN_FORM } from "../data";
import { loginSchema } from "../validation";
import axiosinstance from "../config/axios config";
import toast from "react-hot-toast";
import { IErrorMessage } from "../interfaces";
import { AxiosError } from "axios";
import { useState } from "react";

interface IFormInput {
  identifier: string;
  password: string;
}



const LoginPage=()=>{
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  });
  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    console.log("DATA",data)
    setIsLoading(true);
    console.log(errors);
    

  //Handeler
  
try {
  // 2- fulfilled => Success (Optional)
  const {status} = await axiosinstance.post("/auth/local", data)
  console.log(status);
  if(status === 200){
    toast.success("Login Successfull"),{
      duration: 4000,
      position: "top-center",
      style: {
        border: "1px solid #4ade80",
        padding: "16px",
        color: "#4ade80",
      },
      iconTheme: {
        primary: "#4ade80",
        secondary: "#ffffff",
    }}
  }
} catch (error) {
  // 3- rejected => Faield (Optional)
  const errorObj = error as AxiosError<IErrorMessage>
  toast.error(`${errorObj.response?.data.error.message}`,{
    duration: 4000,
    position: "top-center",
    style: {
      border: "1px solid #ef4444",
      padding: "16px",
      color: "#ef4444",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#ffffff",
  }})
    console.log(error);
  }
  finally{
    setIsLoading(false);
  }
}
  
  // Render
  const renderLoginForm = LOGIN_FORM.map(({ name, placeholder, type, validation }, idx) => {
    return (
      <div key={idx}>
        <Input type={type} placeholder={placeholder} {...register(name, validation)} />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    );
  });
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
         <Button fullWidth isLoading={isLoading} >Login</Button>
        <p className="text-center text-sm text-gray-500 space-x-2">
          <span>No account?</span>

        </p>
      </form>
    </div>
  );
}

export default LoginPage;
