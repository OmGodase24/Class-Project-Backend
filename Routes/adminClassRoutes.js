const express = require('express');
const classController = require('../Controllers/classController');
const authController = require('../Controllers/authController');

const router = express.Router();

// Protect all routes and restrict to admins
router.use(authController.protect);  // Ensure token is valid
router.use(authController.restrictTo('admin'));  // Ensure user is admin

router
    .route('/classes')
    .post(classController.createClass)
    .get(classController.getAllClasses);


router
    .route('/classes/:id')
    .get(classController.getClass)
    .patch(classController.updateClass)
    .delete(classController.deleteClass);

// router
//     .route('/movies/search/:moviename')
//     .get(movieController.getMovieByName);

module.exports = router;
