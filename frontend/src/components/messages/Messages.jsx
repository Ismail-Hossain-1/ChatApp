import React, { useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {

  const { loading, messages } = useGetMessages();

  //const allmessages = messages.messages||[];
  // console.log(allmessages.length);
  useListenMessages();
  
 // console.log(messages);


  if (messages.length === 0 || !messages) {
    return (
      <div className='px-4 flex-1 overflow-auto'>
        {[...Array(3)].map((_, idx) => (
          <MessageSkeleton key={idx} />
        ))}
      </div>
    );
  }
  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!messages && <p>No message</p>}


      {!loading &&
        messages?.length > 0 &&
        messages.map((message) => (
          <div key={message._id} >
            <Message message={message} />

          </div>
        ))}


      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}





    </div>
  )
}

export default Messages