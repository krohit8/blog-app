import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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
import toast from 'react-hot-toast';
import { Spinner } from "./Spinner";
import { useCreateUserAccount, useSignInAccount } from "@/react-query/queries";

export function AuthForm({
  formType,
}: {
  formType: typeof signUpInput | typeof signInInput;
}) {
  const {mutate: signUp  , isPending: isSigningUp } = useCreateUserAccount()
  const {mutate: signIn  , isPending: isSigningIn} = useSignInAccount()
  const form = useForm<z.infer<typeof formType>>({
    resolver: zodResolver(formType),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const isLoading = formType === signUpInput? isSigningUp : isSigningIn
  async function onSubmit(values: z.infer<typeof formType>) {
    if (formType === signUpInput) {
      try {
        signUp(values)
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        toast("Email already registered!", {
          style: {
            border: "2px solid pink",
          },
        });
      }
    } else {
      try {
        signIn(values)
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        toast("Invalid Username or Password", {
          style: {
            border: "2px solid pink",
          },
        });
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
                  <Input
                    type="password"
                    placeholder="enter your password"
                    {...field}
                  />
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
          
          <Button type="submit" className="w-full h-10 cursor-pointer" disabled={isLoading}>
            {isLoading? <Spinner/> : (formType === signUpInput ? "Signup" : "Signin")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
