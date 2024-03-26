const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require("../middleware/verifyJWT")

router.use((req, res, next) => {
    if (req.path === '/' && req.method === 'POST') {
        // Exclude verifyJWT for createNewUser
        return next();
    }
    // Apply verifyJWT middleware to all other routes
    verifyJWT(req, res, next);
})

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;    