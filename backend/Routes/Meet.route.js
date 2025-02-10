const express = require('express');
const router = express.Router();
const {createMeet,getMeets,getMembers,getById,getByName} = require('../controllers/Meet.controller');
router.post('/',createMeet);
router.get('/',getMeets);
router.get('/meetmembers',getMembers)
router.get('/search',getByName)
router.get('/:id',getById)
module.exports = router