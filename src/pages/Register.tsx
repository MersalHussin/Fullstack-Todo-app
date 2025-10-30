import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";
import InputErrorMessage from "../components/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validation";



// ** Handelrs
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

/*
مراحل الـ Requist
1- Pending => Loading
2- fulfilled => Success (Optional)
3- rejected => Faield (Optional)
*/


const  RegisterPage=()=>{
  const { register, handleSubmit , formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema)
  })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log("DATA",data)
  
  console.log(errors);

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


       <Button fullWidth>Register</Button>
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
