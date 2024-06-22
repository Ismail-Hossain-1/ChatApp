import React, { useEffect, useState } from 'react'
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversation';


function Conversations() {

	const { loading, conversations } = useGetConversations();

	const [searchTerm, setSearchTerm] = useState('');

	// Filter conversations based on name matching search term
	const filteredConversations = conversations.filter(conversation =>
		conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
	);



	return (
		<div className='py-2 flex flex-col overflow-auto'>

			<input
				type='text'
				placeholder='Search by name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className='input input-bordered rounded-full mb-3'
			/>


			{filteredConversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === filteredConversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
}

export default Conversations;