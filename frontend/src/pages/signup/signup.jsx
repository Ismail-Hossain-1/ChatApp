import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

function SignUp() {



    const [userInfo, setUserInfo] = useState({
        name: "",
        username: "",
        password: "",
        confirmpassword: "",
        gender: ""
    })

    const { loading, signup } = useSignup();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userInfo);
        await signup(userInfo);
    }


    return (
        <div className='flex flex-col items-center justify-center min-w-96 max-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-500 bg-clip-padding backdrop-filter
            backdrop-blur-lg bg-opacity-0'>


                <h1 className='text-3xl font-semibold text-center text-gray-200'>Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2' >
                            <span className='text-base font-bold text-gray-200 label-text'>Name</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} />

                        <label className='label p-2' >
                            <span className='text-base font-bold text-gray-200 label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' value={userInfo.username} onChange={e => setUserInfo({ ...userInfo, username: e.target.value })} />

                        <label className='label p-2' >
                            <span className='text-base font-bold text-gray-200 label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' value={userInfo.password} onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} />

                        <label className='label p-2' >
                            <span className='text-base font-bold text-gray-200 label-text'>Confirm Password</span>
                        </label>
                        <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' value={userInfo.confirmpassword} onChange={e => setUserInfo({ ...userInfo, confirmpassword: e.target.value })} />

                        <div>
                            <label className='label p-2' >
                                <span className='text-base font-bold text-gray-200 label-text'>Gender</span>
                            </label>
                            {/* <input type="password" placeholder='Enter Gender' className='w-full input input-bordered h-10' />
                             */}
                            <select name="gender" id="" className="select select-success w-full max-w-xs text-gray-800" value={userInfo.gender} onChange={e => setUserInfo({ ...userInfo, gender: e.target.value })}>
                                <option >Select One</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>





                        <Link to="/login" className="text-sm text-gray-600 hover:underline hover:text-blue-500 mt-4 inline-block">
                            Already have an account?
                        </Link>
                    </div>

                    <div>
                        <button className="btn btn-block btn-circle mt-3" disabled={loading}>
                           {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}

                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp