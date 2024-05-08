"use client"

import React, { useState, useTransition } from 'react';
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import InputBox from "@/app/custom_components/InputBox";
import Link from 'next/link';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from '@/supabase/actions';
import { CircularProgress } from '@mui/material';
import LoggedOutOnly from '@/app/layouts/LoggedOutOnly'
import { useRouter } from 'next/navigation';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [isPending, startTransition] = useTransition();

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Form functions 
  const onInputHandleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const result = await signInWithEmailAndPassword(formData.email, formData.password)
    const { data, error } = JSON.parse(result)

    if (!error) {
    router.push('/')
    } else {
      console.log(error)
    }
  }

  return (
    <>
      <div className="relative *:flex flex-col justify-center max-w-sm mx-auto gap-1 mt-20 sm:px-0 px-4">
        <h1 className="font-bold text-3xl">Login</h1>
        <p className="font-medium text-s">Hi, Welcome back &nbsp; <WavingHandIcon className="w-[18px]"/></p>
        {/* <div className="flex flex-col items-center w-full gap-4 my-4 mb-8">
          <button className="flex justify-center items-center gap-4 font-semibold border-solid border rounded-sm border-buttonColor py-2 text-s mt-3 w-full">
            <Image
              src="/assets/google_icon.svg"
              width={15}
              height={15}
              alt="Google Logo"
            />
            <span>Login with Google</span>
          </button>
          <div className="relative mt-3 w-full">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-[1px] bg-gray-400"></div>
            <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 max-w-[80%] truncate text-sm text-gray-400">
              or Login with Email
            </p>
          </div>
        </div> */}
        <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
          <div>
            <p className="font-bold">Email</p>
            <InputBox type="text" name="email" onInputHandleChange={onInputHandleChange}/>
          </div>
          <div className="relative">
            <p className="font-bold">Password</p>
            <div className="relative flex items-center">
            <InputBox type={showPassword ? "text" : "password"}
              name="password"
              onInputHandleChange={onInputHandleChange}
            />
              <button
                type="button"
                className="absolute max-h-full inset-y-0 right-0 flex items-center justify-center w-10 h-full text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={handleTogglePassword}                
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}                
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <p className="font-bold">Remember Me</p>
            </div>
            <Link href="/pages/forgot_password
            ">
              <p className="text-forgotPassword font-semibold">Forgot Password?</p>        
            </Link>
          </div>
          <button type="submit"className="flex justify-center items-center gap-4 font-semibold border-solid border rounded-sm border-buttonColor py-2 text-s mt-3 w-full text-white bg-forgotPassword">
            Login 
            {/* <CircularProgress className={isPending ? "animate-spin" : "hidden"}/> */}
          </button>
          <div className="flex justify-center mt-4">
            Not registered yet?&nbsp;<Link href="/pages/signup" className="flex justify-center items-center text-forgotPassword"><p className="text-forgotPassword font-semibold">Create an account</p><ArrowUpRight /></Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
