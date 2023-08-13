const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/', participantController.createParticipant);
router.put('/:id', participantController.updateParticipant);
router.delete('/:id', participantController.deleteParticipant);
router.get('/:id', participantController.getParticipant);
module.exports = router;