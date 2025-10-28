import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";


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
        <Input placeholder="Username" {...register("username" , {required: "Username is required"})}/>
        <p>{errors?.username?.message}</p>
        <Input placeholder="Emaill address" {...register("email" , {required: "Email is required"})} />
        <Input placeholder="Password" {...register("password" , {required: "Password is required"})} />

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
