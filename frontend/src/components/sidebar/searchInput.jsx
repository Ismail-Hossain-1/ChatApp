import { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';

function SearchInput() {

    const [search, setSearch]= useState('');
    const {setSelectedConversation}= useConversation();
    const {conversations}= useGetConversations();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!search) return;
        const conversation= conversations.find((c)=>c.name.toLowerCase().includes(search.toLowerCase()));
        
        if(conversation){
             setSelectedConversation(conversation);
             setSearch('');
        }else toast.error("No user found");
        
    }



    return (
        <div>
           
           <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                <input type="text" placeholder='Search..' value={search} 
                className='input input-bordered rounded-full' onChange={e=>setSearch(e.target.value)} />
                <button type='submit' className='btn btn-circle bg-blue-300 text-white'>
                    <IoSearchSharp className='w-6 h-6 outline-none'/>
                </button>
           </form>
        </div>
    )
}

export default SearchInput