const { sendMessage, getMessages } = require('../controller/messageController');
const verifyUser = require('../middleware/verifyUser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = require('express').Router();

router.post('/:id', verifyUser, getMessages);
router.post('/send/:id',upload.single('image'), verifyUser, sendMessage);


module.exports = router;