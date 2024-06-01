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
				const res = await fetch("http://localhost:3000/api/users", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token })
				});
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
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