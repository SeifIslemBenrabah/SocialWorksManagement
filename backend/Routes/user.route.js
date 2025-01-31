const express = require('express');
const Authjwt = require('../middleware/Authjwt');
const { createUser} = require('../controllers/User.controller');
const router = express.Router()
router.post('/',createUser)
module.exports = router;