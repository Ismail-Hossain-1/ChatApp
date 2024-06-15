import {useState} from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

const useSendMessages = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    //console.log(selectedConversation._id);

    const sendMessage = async (message) => {
        setLoading(true);

        const token= localStorage.getItem('token');

        try {
            
            const res= await axios.post(`/messages/send/${selectedConversation._id}`, {message, token});
            const data= await res.data;
            setMessages([...messages, data]);

            if (data.error) throw new Error(data.error);

            
        } catch (error) {
            toast.error(error.message);
        } finally { setLoading(false); }
    }
    return {loading, sendMessage}
}

export default useSendMessages