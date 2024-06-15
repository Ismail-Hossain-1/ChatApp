import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import Picker from 'emoji-picker-react'; // Import the emoji picker from emoji-picker-react
import useSendMessages from '../../hooks/useSendMessages';
import { MdOutlineEmojiEmotions } from "react-icons/md";


function MessageInput() {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { loading, sendMessage } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  }

  const handleEmojiSelect = (emojiObject) => {
    console.log(emojiObject); // Log the emojiObject
    setMessage((prev)=>prev + emojiObject.emoji); // Use the emoji object provided by emoji-picker-react
  }

  return (
    <form className='px-4 my-3 mr-2 sticky fixed bottom-0' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input 
          type="text" 
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' 
          placeholder='Send message...' 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
        />

        <button 
          type='button' 
          onClick={() => setShowPicker(!showPicker)} 
          className='absolute inset-y-0 end-0 flex items-center pe-3'
        >
          {loading ? <span className='loading loading-spinner mx-auto'></span> : <MdOutlineEmojiEmotions />}
        </button>

        {showPicker && (
          <Picker  onEmojiClick={handleEmojiSelect} />
        )}
      </div>
    </form>
  )
}

export default MessageInput;
