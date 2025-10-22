const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/userController');
const auth = require('../middleWares/authMiddleware');
const checkRole = require('../middleWares/roleMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/therapist_docs');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/register', upload.single('verificationDocument'), userscontroller.Register);

router.post('/login', userscontroller.Login);

router.get('/', auth, checkRole(['admin']), userscontroller.getAllUsers);
router.get('/:userId', auth, checkRole(['admin']), userscontroller.getUser);

router.patch('/:userId', auth, userscontroller.UpdateUser);
router.delete('/:userId', auth, userscontroller.deleteUser);

router.patch('/approve/:userId', auth, checkRole(['admin']), userscontroller.approveTherapist);

module.exports = router;
