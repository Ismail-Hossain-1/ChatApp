const { Server } = require('socket.io');
const express = require('express');
const multer = require('multer'); // For handling multipart/form-data (file uploads)
const cloudinary = require('cloudinary').v2; // Cloudinary for image storage
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Multer storage adapter for Cloudinary
const dotenv = require('dotenv');
const app = express();
const http = require('http').createServer(app);
const io = new Server(http, {
    cors: {
        origin: "http://localhost:5173", // Adjust as per your frontend origin
        methods: ["GET", "POST"],
    }
});

const userSocketMap = {}; // {userId: socketId}

dotenv.config(); // Load environment variables from .env file

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chat_app', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => `${Date.now()}-${file.originalname}` // Unique filename
    }
});

const upload = multer({ storage: storage });

io.on('connection', (socket) => {
    console.log(socket.id, "connected");

    const userId = socket.handshake.query.userId;

    if (userId !== 'undefined') userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log(socket.id, "Disconnected");
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });

    // Handle receiving and broadcasting messages with image
    // socket.on('sendMessage', async (formData) => {
    //     console.log(formData);
    //     const { message, image } = formData;
        
    //     try {
    //         let imageUrl = null;
    //         if (image) {
    //             // Upload image to Cloudinary
    //             const result = await cloudinary.uploader.upload(image.path);
    //             imageUrl = result.secure_url;
    //         }

    //         // Emit message and image URL to sender and receiver
    //         const senderSocketId = userSocketMap[userId];
    //         const receiverSocketId = userSocketMap[receiverId];

    //         io.to(senderSocketId).emit('messageSent', { message, image: imageUrl });
    //         if (receiverSocketId) {
    //             io.to(receiverSocketId).emit('messageReceived', { message, image: imageUrl });
    //         }
    //     } catch (error) {
    //         console.error('Error saving message or uploading image:', error);
    //     }
    // });
});

module.exports = { app, io, http, getReceiverSocketId };