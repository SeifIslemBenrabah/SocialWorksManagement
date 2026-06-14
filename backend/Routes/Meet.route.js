const express = require('express');
const router = express.Router();
const Authjwt = require('../middleware/Authjwt');
const { createMeet, getMeets, getMembers, getById, getByName } = require('../controllers/Meet.controller');

router.post('/', Authjwt(['Admin', 'Committee']), createMeet);
router.get('/', Authjwt(['Admin', 'Committee']), getMeets);
router.get('/meetmembers', Authjwt(['Admin', 'Committee']), getMembers);
router.get('/search', Authjwt(['Admin', 'Committee']), getByName);
router.get('/:id', Authjwt(['Admin', 'Committee']), getById);

module.exports = router;
