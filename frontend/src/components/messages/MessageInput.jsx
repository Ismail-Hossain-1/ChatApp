import { useState } from 'react';
import { BsSend } from 'react-icons/bs'
import useSendMessages from '../../hooks/useSendMessages';

function MessageInput() {

  const [message, setMessage] = useState('');

  const { loading, sendMessage } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  }

  return (
    <form className='px-4 my-3 mr-2 sticky fixed bottom-0' onSubmit={handleSubmit} >
      <div className='w-full relative'>
        <input type="text" className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
          placeholder='Send message...' value={message} onChange={e => setMessage(e.target.value)} />


        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>

          {loading ? <span className='loading loading-spinner mx-auto'></span> : <BsSend />}
        </button>
      </div>

    </form>
  )
}

export default MessageInput