const { sendMessage, getMessages } = require('../controller/messageController');
const verifyUser = require('../middleware/verifyUser');

const router = require('express').Router();

router.post('/:id', verifyUser, getMessages);
router.post('/send/:id', verifyUser, sendMessage);


module.exports = router;