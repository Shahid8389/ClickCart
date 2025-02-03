import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState("Login")

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign in') {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        }
        else {
          toast.error(response.data.message)
        }

      }
      else {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password });

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        }
        else {
          toast.error(response.data.message)
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token])
  

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex flex-col justify-center items-center my-5 min-h-[50dvh]'>
        <div className='flex gap-1 items-center'>
          <h1 className='text-3xl'>{currentState}</h1>
          <p className='lg:w-8 w-6 h-[0.15rem] bg-gray-800 mt-1.5'></p>
        </div>

        <div className='w-full flex flex-col gap-3 items-center justify-center mt-5'>
          {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-500 rounded-md outline-none py-1 px-2 w-[50%] lg:w-[35%] xl:w-[30%] max-sm:w-[70%]' type="text" placeholder='Name' required />}

          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-500 rounded-md outline-none py-1 px-2 w-[50%] lg:w-[35%] xl:w-[30%] max-sm:w-[70%]' type="email" placeholder='Email' required />

          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-500 rounded-md outline-none py-1 px-2 w-[50%] lg:w-[35%] xl:w-[30%] max-sm:w-[70%]' type="password" placeholder='Password' required />
        </div>

        <div className='flex justify-end w-[50%] lg:w-[35%] xl:w-[30%] max-sm:w-[70%] pt-2 text-sm'>
          {/* {currentState === 'Login'
            ? <p className='cursor-pointer'>Forgot password?</p>
            : ''
          } */}
          {
            currentState === 'Login'
              ? <p onClick={() => setCurrentState('Sign in')} className='cursor-pointer'>Create account</p>
              : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-end w-full'>Login here</p>
          }
        </div>

        <div className='pt-10'>
          <button className='bg-orange-400 active:bg-orange-600 py-1 px-8 text-lg font-medium shadow-lg rounded-md'>
            {
              currentState === 'Login' ? 'Login' : 'Sign in'
            }
          </button>
        </div>

      </div>
    </form>
  )
}

export default Login