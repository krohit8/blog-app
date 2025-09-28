import { AuthForm } from "@/components/hookForm";
import { signInInput } from "@krohit8/blog-common";
import  { TextArea } from "@/components/textArea";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col h-[80%] w-full max-w-md mx-auto items-center">
          <h1 className="flex flex-col font-bold text-2xl sm:text-3xl lg:text-4xl w-full h-10 mt-8 justify-center items-center text-center">
            Sign in to your account
          </h1>
          <h3 className="flex text-slate-400 text-sm sm:text-md mt-2 text-center">
            Don't have an account? <a className="underline ml-2 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</a>
          </h3>

          <AuthForm formType={signInInput}/>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full  hidden lg:flex">
        <TextArea/>
      </div>
    </div>
  );
};
