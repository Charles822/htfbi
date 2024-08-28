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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from '../components/Header'
import logo from '../assets/noteless-logo.png';

export function LoginForm() {
  
  const {loginUser, user} = useContext(AuthContext)
  const [redirect, setRedirect] = useState(false);
  console.log("Before submit: ", redirect);

  const handleSubmit = async (e) => {
    await loginUser(e);
    if (user) {
      setRedirect(true);
      console.log("on submit: ", redirect);
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Button
      size="icon"
      className="overflow-hidden rounded-full mx-4 my-4"
      >
        <Link to="/">
          <img
            src={logo}
            width={24}
            height={24}
            alt="Noteless Logo"
            className="overflow-hidden rounded-full"
          />
        </Link>
      </Button>
      <Card className="mx-auto my-10 max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} >
          <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
