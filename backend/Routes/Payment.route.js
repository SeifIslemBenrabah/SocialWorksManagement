const express = require('express');
const router = express.Router();
const { addpayment, getPayment, getall, updatepayment, deletePayment } = require('../controllers/Payment.controller');
const Authjwt = require('../middleware/Authjwt');

router.post('/', Authjwt(['Admin', 'Committee']), addpayment);
router.get('/', Authjwt(['Admin', 'Committee']), getall);
router.get('/search', Authjwt(['Admin', 'Committee']), getPayment);
router.put('/:id', Authjwt(['Admin', 'Committee']), updatepayment);
router.delete('/:id', Authjwt(['Admin', 'Committee']), deletePayment);

module.exports = router;
