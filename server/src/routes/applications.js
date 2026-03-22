// Applications routes and validation
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/applicationController');

router.post('/', [body('job').isMongoId(), body('applicant').isMongoId()], controller.createApplication);
router.get('/', controller.getApplications);
router.get('/:id', [param('id').isMongoId()], controller.getApplication);
router.put('/:id', [param('id').isMongoId()], controller.updateApplication);
router.delete('/:id', [param('id').isMongoId()], controller.deleteApplication);

module.exports = router;
