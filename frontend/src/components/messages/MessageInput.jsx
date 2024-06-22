import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoAttachOutline } from 'react-icons/io5';
import useSendMessages from '../../hooks/useSendMessages';
import toast from 'react-hot-toast';

function MessageInput() {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const { loading, sendMessage } = useSendMessages();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() && !image) return;

        try {
            const formData = new FormData();
            formData.append('message', message);
            if (image) {
                formData.append('image', image);
            }
            const token = localStorage.getItem('token');
            formData.append('token', token);

            await sendMessage(formData); // Send formData with both message and image

            setMessage('');
            setImage(null);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Error sending message');
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleEmojiSelect = (emojiObject) => {
        setMessage(prev => prev + emojiObject.emoji);
    }

    return (
        <form className='px-4 my-3 mr-2 sticky fixed bottom-0' onSubmit={handleSubmit}>
            <div className='w-full relative '>

                <div className='flex items-center w-full relative'>
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
                    <Picker onEmojiClick={handleEmojiSelect} />
                )}

                </div>

                <div className='flex  items-center w-full relative'>

                    <label htmlFor="fileInput" className="flex items-center space-x-2 cursor-pointer">
                        <IoAttachOutline className="text-gray-400 text-xl hover:text-gray-200" />

                        {!image ? <span className="text-sm text-gray-400">Attach file</span> : <span className="text-sm text-gray-400">{image.name}</span>}

                        <input
                            type="file"
                            id='fileInput'
                            onChange={handleFileChange}
                            className='hidden' // Hide the actual file input
                        />
                    </label>







                    <div className='bg-blue-400 text-wrap rounded hover:bg-blue-200'> <button type="submit" ><BsSend /></button> </div>
                </div>
            </div>
        </form>
    )
}

export default MessageInput;
