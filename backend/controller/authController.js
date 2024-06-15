const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/jwtToken");


const login = async (req, res) => {
    const { username, password } = req.body;
   // console.log(req.body);
    try {

        if (!username || ! password) return res.status(400).json({ error: "All credentials required" });
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ error: "User not found" });

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) return res.status(400).json({ error: "Password does not match" });

       const token= generateToken(user._id);
      // console.log(user);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic,
            token:token
        });


    } catch (error) {
        console.log(error);
    }

}
const signup = async (req, res) => {
    const { name, username, password, confirmpassword, gender } = req.body;
    //res.json(username);

    try {



        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password don't match" });
        }

        const user = await User.findOne({ username });

        if (user) return res.status(400).json({ error: "user already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`



        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            gender: gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });
        await newUser.save();
       generateToken(newUser._id, res);

       console.log('in login', token);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
        console.log(error)
    }


}
const logout = async (req, res) => {

    try {
        res.cookie('token', "", {maxAge:0});
        res.status(201).json({message:"logged out successfully"});      
    } catch (error) {
        console.log(error);
    }

}

module.exports = { login, signup, logout };