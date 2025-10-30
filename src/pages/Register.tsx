import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";
import InputErrorMessage from "../components/InputErrorMessage";
import { REGISTER_FORM } from "../data";


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
  const { register, handleSubmit , formState:{errors} } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log("DATA",data)
  
  console.log(errors);

  // Renders
  const renderRegisterForm = REGISTER_FORM.map(({name,placeholder,type,validation},idx) =>{
    return(
      <div key={idx}>
      <Input type={type} placeholder={placeholder} {...register(name , validation)}/>
       {errors[name] && errors[name].type === "required" && <InputErrorMessage msg={`${name} is requird`}/>}
        {errors[name] && errors[name].type === "minLength" && <InputErrorMessage msg={`${name} Should at least 6 charcters`}/>}
        {errors[name] && errors[name].type === "pattern" && <InputErrorMessage msg="Email not Valid"/>}

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
