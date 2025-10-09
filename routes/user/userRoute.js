const express = require('express');
const router = express.Router();
const { trackMood, bookSession } = require('../../controllers/user/userActionsController');
const authMiddleware = require('../../middleWares/authMiddleware');
const checkRole = require('../../middleWares/roleMiddleware');

router.post('/mood', authMiddleware,checkRole(['child','adult']), trackMood);
router.post('/schedule', authMiddleware,checkRole(['child','adult']), bookSession);
//router.post('/ai', authMiddleware, allowedTo(UserRoles.CHILD, UserRoles.ADULT), interactWithAI);

module.exports = router;