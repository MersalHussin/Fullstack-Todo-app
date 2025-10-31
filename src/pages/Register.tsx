import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";
import InputErrorMessage from "../components/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validation";
import axiosinstance from "../config/axios config";
import toast from "react-hot-toast";
import { useState } from "react";



interface IFormInput {
  username: string;
  email: string;
  password: string;
}




const  RegisterPage=()=>{
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit , formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema)
  })

  // ** Handelrs

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    console.log("DATA",data)
    setIsLoading(true);
    console.log(errors);
    

/*
مراحل الـ Requist
1- Pending => Loading
2- fulfilled => Success (Optional)
3- rejected => Faield (Optional)
*/


try {
  // 2- fulfilled => Success (Optional)
  const {status} = await axiosinstance.post("/auth/local/register", data)
  console.log(status);
  if(status === 200){
    toast.success("Register Successfull"),{
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
    console.log(error);
  }
  finally{
    setIsLoading(false);
  }
}




  // Renders
  const renderRegisterForm = REGISTER_FORM.map(({name,placeholder,type,validation},idx) =>{
    return(
      <div key={idx}>
      <Input type={type} placeholder={placeholder} {...register(name , validation)}/>
       {errors[name] && <InputErrorMessage msg={errors[name]?.message}/>}
      </div>
    )
  }) 

return (
  <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Register to get access!
      </h2>

      
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

      {renderRegisterForm}


       <Button fullWidth isLoading={isLoading} >Register


       </Button>
                  <p className="text-center text-sm text-gray-500 space-x-2">
          <span>have an account?</span>
          <Link to={"/login"} className="underline text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
