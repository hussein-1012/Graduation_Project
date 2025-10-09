const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/userController');
const auth = require('../middleWares/authMiddleware');
const checkRole = require('../middleWares/roleMiddleware');

router.post('/register', userscontroller.Register);
router.post('/login', userscontroller.Login);

router.get('/', auth, checkRole(['admin']), userscontroller.getAllUsers);
router.get('/:userId', auth, checkRole(['admin']), userscontroller.getUser);

router.patch('/:userId', auth, userscontroller.UpdateUser);
router.delete('/:userId', auth, userscontroller.deleteUser);

module.exports = router;
