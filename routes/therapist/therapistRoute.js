const express = require('express');
const router = express.Router();
const { accessPatientHistory, manageAvailability, viewAssignedPatients} = require('../../controllers/therapist/therapistActionsController');
const auth = require('../../middleWares/authMiddleware');
const checkRole = require('../../middleWares/roleMiddleware');

router.get('/patients', auth,checkRole(['therapist']), viewAssignedPatients);
router.post('/availability', auth, checkRole(['therapist']), manageAvailability);
router.get('/patients/:patientId/history', auth, checkRole(['therapist']), accessPatientHistory);


module.exports = router;
