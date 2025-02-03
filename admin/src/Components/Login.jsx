import React, { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(backendUrl + "/api/user/admin", {email, password})

            if (response.data.success) {
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    

    return (
        <form className='w-full min-h-screen flex items-center justify-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col justify-center items-center w-[50%] lg:w-[35%] max-sm:w-[80%] p-5 bg-gray-100 rounded-sm'>
                <div className='flex gap-1 items-center'>
                    <h2 className='text-3xl font-semibold'>Admin Panel</h2>
                </div>

                <div className='w-full flex flex-col gap-5 mt-5'>
                    <div>
                        <h2 className='pb-1'>Email Address</h2>
                        <input onChange={ (e)=> setEmail(e.target.value) } value={email} className='border border-gray-500 rounded-md outline-none py-1 px-2 w-full' type="email" placeholder='Enter your email' required />
                    </div>

                    <div>
                        <h2 className='pb-1'>Password</h2>
                        <input onChange={ (e)=> setPassword(e.target.value) } value={password} className='border border-gray-500 rounded-md outline-none py-1 px-2 w-full' type="password" placeholder='Enter your password' required />
                    </div>
                </div>

                <div className='pt-8 w-full flex justify-center'>
                    <button type='submit' className='bg-orange-400 active:bg-orange-600 py-1 px-8 text-xl font-medium shadow-lg rounded-md w-[50%]'>Login</button>
                </div>

            </div>
        </form>
    )
}

export default Login