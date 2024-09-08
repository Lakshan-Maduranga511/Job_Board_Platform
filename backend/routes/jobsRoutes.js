const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJob, singlejob, updatejob, showjobs } = require('../controllers/jobsController');
const router = express.Router();


// job  route

//api/type/create
router.post('/job/create',isAuthenticated,isAdmin, createJob)
//api/type/id
router.get('/job/:id', singlejob)
//api/type/update/job_id
router.put('/job/update/:job_id', isAuthenticated,isAdmin,updatejob)
//api/type/update/job_id
router.get('/jobs/show' ,showjobs);
module.exports = router;