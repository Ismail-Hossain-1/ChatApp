const express = require('express');
const { app, io , http} = require('./socket/socket');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
}))


const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("running");
});

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);

    console.log("Request received:", req.method, req.url);

    next();
});




const authRoute = require('./routes/authRouter');
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/userRouter');
const connectDB = require('./db/mongodbConnect');

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter);

connectDB();

http.listen(PORT, () => {

    console.log(`running on ${PORT}`)
});