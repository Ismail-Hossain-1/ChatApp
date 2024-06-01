import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

function Login() {

    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');

    const {loading, login}= useLogin();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        await login(username, password);
        
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 max-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-500 bg-clip-padding backdrop-filter
            backdrop-blur-lg bg-opacity-0'>

                <h1 className='text-3xl font-semibold text-center text-gray-200'>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2' >
                            <span className='text-base font-bold text-gray-200 label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' onChange={e=>setUsername(e.target.value)}/>
                        
                        <label className='label p-2' >
                            <span className='text-base font-bold text-gray-200 label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' onChange={e=>setPassword(e.target.value)}/>
                    </div>

                    <Link to='/signup'  className='text-sm text-gray-500 hover:underline hover:text-blue-400 mt-2 inline-block'> Don't have account</Link>

                   <div>
                    <button className="btn btn-block btn-circle mt-3" disabled={loading}>
                    {loading ? <span className='loading loading-spinner'></span> : 'Login'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login