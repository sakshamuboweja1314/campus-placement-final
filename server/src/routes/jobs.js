// Jobs routes and validation
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/jobController');

router.post('/', [body('title').notEmpty(), body('company').notEmpty(), body('recruiter').isMongoId()], controller.createJob);
router.get('/', controller.getJobs);
router.get('/:id', [param('id').isMongoId()], controller.getJob);
router.put('/:id', [param('id').isMongoId()], controller.updateJob);
router.delete('/:id', [param('id').isMongoId()], controller.deleteJob);

module.exports = router;
