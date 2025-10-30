import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";
import InputErrorMessage from "../components/InputErrorMessage";


interface IFormInput {
  username: string;
  email: string;
  password: string;
}


// Renders
const  RegisterPage=()=>{
  const { register, handleSubmit , formState:{errors} } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  console.log(errors);



  return (
    <div className="max-w-md mx-auto">
      
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Register to get access!
      </h2>
      
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Username" {...register("username" , {required: true, minLength:5})}/>
          {errors.username && errors.username.type === "required" && <InputErrorMessage msg="User name is Requird"/>}
          {errors.username && errors.username.type === "minLength" && <InputErrorMessage msg="User Should at least 5 charcters"/>}
        <Input placeholder="Emaill address" {...register("email" , {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,})} />
          {errors.email && errors.email.type === "required" && <InputErrorMessage msg="Email is Requird"/>}
          {errors.email && errors.email.type === "pattern" && <InputErrorMessage msg="Not Valid Email"/>}
        <Input placeholder="Password" {...register("password" , {required: true , minLength:6})} />
          {errors.password && errors.password.type === "required" && <InputErrorMessage msg="Password is Requird"/>}
          {errors.password && errors.password.type === "minLength" && <InputErrorMessage msg="Password Should at least 6 charcters"/>}

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
