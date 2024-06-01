import React, { useEffect } from 'react'
import { useSocketContext } from '../context/socketContext'
import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
  
    const {socket}= useSocketContext();

    const {messages, setMessages} = useConversation();

    useEffect(()=>{

        socket?.on("newMessage", (newMessage)=>{
            setMessages([messages, newMessage])
        })

    },[socket, messages, setMessages]);

    return ()=>{
        socket?.off('newMessage');
    }
}

export default useListenMessages