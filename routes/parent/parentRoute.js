const express = require('express');
const router = express.Router();
const { viewChildReports, monitorRisks, manageChildAccount } = require('../../controllers/parent/parentActionsController');
const auth = require('../../middleWares/authMiddleware');
const checkRole = require('../../middleWares/roleMiddleware');

router.get('/reports', auth, checkRole(['parent']), viewChildReports);
router.get('/risks', auth,checkRole(['parent']), monitorRisks);
router.post('/manage-child', auth, checkRole(['parent']), manageChildAccount);

module.exports = router; // auth 
