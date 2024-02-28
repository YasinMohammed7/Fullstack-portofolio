const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(messagesController.getAllMessages)
    .post(messagesController.createNewMessage)
    .patch(messagesController.updateMessage)
    .delete(messagesController.deleteMessage);

module.exports = router;   