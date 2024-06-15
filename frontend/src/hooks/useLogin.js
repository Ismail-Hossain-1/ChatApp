import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/authContext";
import axios from "axios";




const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();



    const login = async (username, password) => {
        setLoading(true);

        try {
            const res = await axios.post('/auth/login', { username, password });
           
           
            console.log(res);

            if (res.data.error){
                console.log(res);
                 throw new Error(data.error);
            }
            const data= res.data;

            localStorage.setItem('auth-user', JSON.stringify(data));

            localStorage.setItem('token', data.token);
            setAuthUser(data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally { setLoading(false); }
    }

    return { loading, login };
}

export default useLogin;