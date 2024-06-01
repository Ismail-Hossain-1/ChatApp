import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/authContext";




const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();



    const login = async (username, password) => {
        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
             });
            //.then(response => 
            //     .then(token => {
            //         // Store the token in local storage or a secure storage
            //         localStorage.setItem('token', token);
            //     });
    
            const data = await res.json();
            console.log(data.token);
            if (data.error) throw new Error(data.error);

            localStorage.setItem('auth-user', JSON.stringify(data));

            localStorage.setItem('token', data.token);
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally { setLoading(false); }
    }

    return { loading, login };
}

export default useLogin;