const express = require('express');
const Authjwt = require('../middleware/Authjwt');
const { createUser,getAll,deleteAccount} = require('../controllers/User.controller');
const router = express.Router()
router.post('/',createUser)
router.get('/',getAll)
router.delete('/:id',deleteAccount)
module.exports = router;