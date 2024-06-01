import { useEffect } from 'react';
import useConversation from '../../zustand/useConversation';
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from "react-icons/ti";

function MessageContainer() {

    const {selectedConversation, setSelectedConversation}=useConversation();

    useEffect(()=>{

        return setSelectedConversation(null);

    },[setSelectedConversation])
    

    return (
        <div className='md:min-w-[450px] flex flex-col overflow-y-auto'>

            {!selectedConversation ? (<NoChat />) : (
                <div>
                    <div className='bg-slate-400 px-4 py-2 mb-2 absolute top-0'>
                        <span className='font-bold '>{selectedConversation.name}</span>
                    </div>

                    <Messages />
                    <MessageInput />
                </div>
            )}


        </div>
    )
}

export default MessageContainer;


const NoChat = () => {

    return (
        <div className='flex items-center justify-center w-full h-full'>
            <p>Welcome! Start Chatting</p>
            <div>
                <TiMessages className='text-3x1 md:text-6x1 text-center'/>
            </div>
        </div>
    );
}