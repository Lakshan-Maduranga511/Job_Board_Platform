const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJobType,allJobsType } = require('../controllers/jobTypeController');
const router = express.Router();


// job type route

//api/type/allusers
router.post('/type/create',isAuthenticated,isAdmin, createJobType)
//api/type/jobs
router.get('/type/jobs', allJobsType)
//api/type/update/type_id
router.put('/type/update/:type_id',isAuthenticated,isAdmin, updateJobsType)
//api/type/delete/type_id
router.delete('/type/delete/:type_id',isAuthenticated,isAdmin, deleteJobsType)
module.exports = router;