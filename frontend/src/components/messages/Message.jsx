import React from 'react'
import { useAuthContext } from '../../context/authContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message=({message})=> {
 
 
  
  const {authUser}= useAuthContext();

   const {selectedConversation}=useConversation();

   const fromMe=message.senderId=== authUser._id;
   const chatClassName=   fromMe? 'chat-end':'chat-start';
   const profilePic= fromMe ? authUser.profilePic:selectedConversation.profilePic;
   const formattedTime= extractTime(message.createdAt);
   const bubbleBgColor= fromMe? 'bg-blue-500':"";



 
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="Tailwind"  />
            </div>
        </div>

        <div className={`chat-bubble text-white bg-black-300 ${bubbleBgColor} `}> {message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 text-white'>{formattedTime}</div>
    </div>
  )
}

export default Message  