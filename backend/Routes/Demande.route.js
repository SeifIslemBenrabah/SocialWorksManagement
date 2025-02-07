const express = require('express')
const {addDemand} = require('../controllers/Demand.controller')
const router = express.Router();
const fileRoute = require('./File.route')
router.post('/',addDemand)
router.use('/file',fileRoute)
module.exports = router;