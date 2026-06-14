const express = require('express');
const Authjwt = require('../middleware/Authjwt');
const { getNotifications, markAllRead } = require('../controllers/Notification.controller');

const router = express.Router();

router.get('/', Authjwt(['Admin', 'Employee', 'Committee']), getNotifications);
router.put('/read-all', Authjwt(['Admin', 'Employee', 'Committee']), markAllRead);

module.exports = router;
