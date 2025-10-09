const express = require('express');
const router = express.Router();
const podcastController = require('../../controllers/admin/podcastController');
const auth = require('../../middleWares/authMiddleware');
const checkRole = require('../../middleWares/roleMiddleware');

router.post('/', auth, checkRole(['admin']), podcastController.addPodcast);
router.delete('/:id', auth,  checkRole(['admin']), podcastController.removePodcast);

router.get('/', podcastController.getAllPodcasts);
router.get('/:id', podcastController.getPodcast);

module.exports = router;
