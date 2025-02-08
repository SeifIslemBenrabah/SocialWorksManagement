const express = require('express');
const Authjwt = require('../middleware/Authjwt');
const { createUser,getAll,deleteAccount,getByUserRole,getByEmailOrName} = require('../controllers/User.controller');
const router = express.Router()
router.post('/',createUser)
router.get('/',getAll)
router.get('/search', getByEmailOrName);
router.get('/:id',getByUserRole)
router.delete('/:id',deleteAccount)
module.exports = router;