const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  assignComplaint,
  updateStatus,
  addMessage
} = require('../controllers/complaintController');

router.post('/', auth, createComplaint);
router.get('/mine', auth, getMyComplaints);
router.get('/', auth, getAllComplaints);
router.put('/:id/assign', auth, assignComplaint);
router.put('/:id/status', auth, updateStatus);
router.post('/:id/message', auth, addMessage);

module.exports = router;
