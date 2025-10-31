import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/InputErrorMessage";
import { LOGIN_FORM } from "../data";
import { loginSchema } from "../validation";

interface IFormInput {
  email: string;
  password: string;
  username?: string;
}

const LoginPage=()=>{
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log("DATA", data);

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
        <Button fullWidth>Login</Button>
        <p className="text-center text-sm text-gray-500 space-x-2">
          <span>No account?</span>
          <Link to={"/register"} className="underline text-indigo-600 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
