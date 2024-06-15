import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetMessages = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(()=>{

        const getMessages= async ()=>{
            setLoading(true);
            try {

                const token= localStorage.getItem('token');

                const res= await axios.post(`/messages/${selectedConversation._id}`,{token})
               // const data = await res.json();
               
				if (res.error) {
					throw new Error(data.error);
				}
                const data= res.data;
                setMessages(data);
            } catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
        }

        if(selectedConversation?._id ) {getMessages();}

    },[selectedConversation?._id]); 

    return {  messages, loading}
  
}

export default useGetMessages