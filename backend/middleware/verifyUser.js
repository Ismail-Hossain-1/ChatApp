const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyUser= async (req, res, next)=>{
    try {
        const token= req.body.token;
        
        if(!token) return res.status(500).json({error: "Unauthorized no token"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) if(!token) return res.status(401).json({error: "Unauthorized invalid token"});

        const user= await User.findById(decoded.userId).select('-password');

        if(!user) return res.status(500).json({error: "User not found"});

        req.user= user;

        next(); 
    } catch (error) {
        console.log(error);
    }
}

module.exports= verifyUser;