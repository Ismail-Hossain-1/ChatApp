import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./authContext";
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext =()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:3000', {
                query:{
                    userId: authUser._id
                }
            });

            socket.on('getOnlineUsers',(users)=>{
                setOnlineUsers(users);
            })

            setSocket(socket);

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}