const express = require('express');
const classController = require('../Controllers/classController');
const authController = require('../Controllers/authController');

const router = express.Router();

// Protect routes
router.use(authController.protect);

// Get all movies
router
    .route('/classes/all')
    .get(classController.getAllClasses);


// Get a movie by name
router
    .route('/classes/search/:batchname')
    .get(classController.getClassByName);

// You can add more routes here as needed

module.exports = router;
