const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");


const getMessages = async (req, res) => {

    try {
        const { id: userToChatId } = req.params;
        const senderId= req.user._id;


        const conversation= await Conversation.findOne({
            participants:{$all:[senderId, userToChatId]},
        }).populate('messages')

        res.status(200).json(conversation);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}

const sendMessage = async (req, res) => {

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;


    console.log(message, "receiver: ", receiverId, " senderId :", senderId);

    
    try {

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        };


        await  conversation.save();
        await newMessage.save();

        const receiverSocketId= getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = { sendMessage, getMessages };