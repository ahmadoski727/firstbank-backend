const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { validateApplication } = require('../middleware/validation');
const {
  submitApplication,
  getApplication,
  getAllApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');

// Submit new application
router.post('/', upload.single('passport'), validateApplication, submitApplication);

// Get application by reference number
router.get('/:referenceNumber', getApplication);

// Get all applications (admin only)
router.get('/', getAllApplications);

// Update application status (admin only)
router.patch('/:id/status', updateApplicationStatus);

module.exports = router;