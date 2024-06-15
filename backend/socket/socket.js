const {Server} = require('socket.io');

const express= require('express');
const app= express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173", // Allow connection from React app origin
        methods: ["GET", "POST"],
    }
});

const userSocketMap= {};  //{userId: socketId}

const getReceiverSocketId= (receiverId)=>{
    return userSocketMap[receiverId];
}

io.on('connection', (socket)=>{
    console.log(socket.id, "connected");

    const userId= socket.handshake.query.userId;

    if(userId!='undefined') userSocketMap[userId]= socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        console.log(socket.id,"Disconnected");
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})



module.exports ={app, io, http, getReceiverSocketId};