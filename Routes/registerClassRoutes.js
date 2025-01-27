const express = require('express');
const registerClassController = require('../Controllers/registerClassController');
const authController = require('../Controllers/authController');

const router = express.Router();

// Middleware to protect routes
router.use(authController.protect);

// Route to register for a batch
router
    .route('/register/:Batch_Code')
    .post(registerClassController.registerForBatch);


// Route to get all registrations for a batch
router
    .route('/:Batch_Code/registrations')
    .get(registerClassController.getRegistrationsByBatch);

module.exports = router;
