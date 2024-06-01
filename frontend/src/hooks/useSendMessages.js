import {useState} from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessages = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    //console.log(selectedConversation._id);

    const sendMessage = async (message) => {
        setLoading(true);

        const token= localStorage.getItem('token');

        try {
            const res = await fetch(`http://localhost:3000/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({message, token})
            });
           
            console.log(res);

            const data = await res.json();
            setMessages([...messages, data]);
            if (data.error) throw new Error(data.error);

            
        } catch (error) {
            toast.error(error.message);
        } finally { setLoading(false); }
    }
    return {loading, sendMessage}
}

export default useSendMessages