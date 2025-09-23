import { AuthForm } from "@/components/hookForm";
import { signInInput } from "@krohit8/blog-common";
import  { TextArea } from "@/components/textArea";
export const Signin = () => {
  return (
    <div className="w-full flex h-screen  ">
      <div className="w-1/2 flex items-center h-full ">
        <div className="flex flex-col   h-[80%] w-[60%] mx-auto items-center ">
          <h1 className=" flex flex-col font-bold text-4xl  w-full h-10 mt-8 justify-center items-center">
            Create an account
          </h1>
          <h3 className="flex  text-slate-400 text-md mt-2 ">
            Already have an account? <a className="underline ml-2">Login</a>
          </h3>

          <AuthForm formType={signInInput}/>
        </div>
      </div>
      <div className="w-1/2 h-full flex"><TextArea/></div>
    </div>
  );
};
