const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/admin/paymentController');
const auth = require('../../middleWares/authMiddleware');
const checkRole = require('../../middleWares/roleMiddleware');

router.get('/', auth, checkRole(['admin']), paymentController.viewPayments);

module.exports = router;