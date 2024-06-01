const { getAllUsers } = require('../controller/userController');
const verifyUser = require('../middleware/verifyUser');

const router= require('express').Router();


router.post('/', verifyUser, getAllUsers);


module.exports= router;