const express = require('express');
const router = express.Router();
const {createMeet,getMeets} = require('../controllers/Meet.controller');
router.post('/',createMeet);
router.get('/',getMeets);
module.exports = router