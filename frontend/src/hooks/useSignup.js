import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext';
import axios from 'axios';

function useSignup() {
    const[loading, setLoading]= useState(false);
    const { setAuthUser}= useAuthContext();

    const signup= async({name, username, password, confirmpassword, gender})=>{
        const success= handleError({name, username, password, confirmpassword, gender});
        if(!success ) return;

        setLoading(true);
        try {
            const response= await axios.post('/auth/signup', {name, username, password, confirmpassword, gender});

            //const data = await response.json();
            const data= response.data;

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem('auth-user', JSON.stringify(data));

            setAuthUser(data);

            // console.log(data);
        } catch (error) {
          toast.error(error.message);   
        } finally{
            setLoading(false);
        }
    }

    return {loading, signup};
};

export default useSignup;

const handleError= ({name, username, password, confirmpassword, gender})=>{
    if(!name|| !username|| !password|| !confirmpassword|| !gender){
        toast.error("Please fill in all fields")
        return false;
    }
    if(password !== confirmpassword){
        toast.error("Password does not match");
        return false;
    }
    if(password.length < 6){
        toast.error("Password must have at least 6 characters");
        return false;
    }
    return true;

}