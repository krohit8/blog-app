import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signUpInput, signInInput } from "@krohit8/blog-common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "../../config";

export function AuthForm({
  formType,
}: {
  formType: typeof signUpInput | typeof signInInput;
}) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formType>>({
    resolver: zodResolver(formType),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formType>) {
    if (formType === signUpInput) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signup`,
          values
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/blogs");
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
      }
    } else {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signin`,
          values
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/blogs");
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
      }
    }
  }
  return (
    <div className="w-full  my-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formType === signUpInput ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="hidden"></div>
          )}
          <Button type="submit" className="w-full h-10 cursor-pointer">
            {formType === signUpInput ? "Signup" : "Signin"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
