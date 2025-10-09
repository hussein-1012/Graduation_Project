const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/admin/bookController');
const auth = require('../../middleWares/authMiddleware');
const checkRole = require('../../middleWares/roleMiddleware');

router.post('/', auth, checkRole(['admin']), bookController.addBook);
router.delete('/:id', auth, checkRole(['admin']), bookController.removeBook);

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);

module.exports = router;
