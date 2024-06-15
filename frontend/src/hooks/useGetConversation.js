import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversations (){
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	const token = localStorage.getItem('token');
	const [hasBeenCalled, setHasBeenCalled] = useState(false);

	
	useEffect(() => {
		//console.log("usegetConversation Called");
		if(hasBeenCalled) return;
		const getConversations = async () => {
			setLoading(true);
			try {
				const token = localStorage.getItem('token');
				const res = await axios.post("/users", {token});
				const data = res.data;
				if(res.error)	throw new Error(data.error);
				console.log("GET Conversation",res);
				
				setConversations(data);

			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (token) {
			getConversations();
			setHasBeenCalled(true);
		}
	}, [token, hasBeenCalled]);

	return { loading, conversations };
};
export default useGetConversations;