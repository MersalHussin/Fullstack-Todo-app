import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const LoginPage=()=>{


  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Login to get access!
      </h2>
      <form className="space-y-4">
          <Input placeholder="Emaill address" />
          <Input placeholder="Password" />
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
