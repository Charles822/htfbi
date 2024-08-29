import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from '../components/Header'
import Logo from '../components/Logo';
import useUsers from '../hooks/useUsers';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const registerUserSchema = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
  username: z.string().min(10, {
    message: "Your list description must be at least 10 characters.",
  }),
  password: z.string().min(8,  {
    message: "Your list description must be at least 10 characters.",
  }),
  confirmPassword: z.string(),
})


// Validate strong password format
const refinedRegisterUserSchema = 
  registerUserSchema.superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch) => /[A-Z]/.test(ch);
    const containsLowercase = (ch) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    let errObj = {
      upperCase: { pass: true, message: "add upper case." },
      lowerCase: { pass: true, message: "add lower case." },
      specialCh: { pass: true, message: "add special ch." },
      totalNumber: { pass: true, message: "add number." },
    };

    if (countOfLowerCase < 1) {
      errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } };
    }
    if (countOfNumbers < 1) {
      errObj = {
        ...errObj,
        totalNumber: { ...errObj.totalNumber, pass: false },
      };
    }
    if (countOfUpperCase < 1) {
      errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } };
    }
    if (countOfSpecialChar < 1) {
      errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } };
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        message: errObj,
      });
    }
  });

// Confirm that password and confirmation matche
const finalRegisterUserSchema = 
  refinedRegisterUserSchema.refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

  
type FormData = z.infer<typeof finalRegisterUserSchema>;

export default function SignUpForm() {
  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(finalRegisterUserSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control, handleSubmit, formState, reset } = form;
  const [redirect, setRedirect] = useState(false);
  const { errors, isSubmitting, isDirty, isValid } = formState;
  const { toast } = useToast();


  // Call useLists at the top level
  const { execute, data, error, isLoading } = useUsers('post');


  // 2. Define a submit handler.
  const onSubmit = async (values: FormData) => {
    const user_data = {
      email: values.email, 
      username: values.username, 
      password: values.password, 
    };

    // Call the API request here
    await execute(user_data);

    if (error) {
      console.error('Error creating new user:', error);
    } else {
      console.log('New user created successfully:', data);
      toast({variant: "success", description: "Your account has been created successfully!"});
      reset();
      setRedirect(true);
  
    }
  };

  if (redirect) {
    return <Navigate to="/login/new" replace />;
  }

  return (
    <>
      <Logo />
      <Card className="mx-auto my-10 max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new account</CardTitle>
          <CardDescription>
            Create a new account to start creating your own lists and notes! 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will appear in your comments, lists and notes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password confirmation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
            <Button type="Create Account" disabled={isSubmitting || !isDirty || !isValid}>Submit</Button>
            <Toaster />
          </form>
        </Form>
        </CardContent>
      </Card>
    </>
  )
}
