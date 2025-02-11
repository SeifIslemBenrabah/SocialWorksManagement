const express = require('express')
const router = express.Router();
const {addpayment,getPayment,getall,updatepayment,deletePayment} = require('../controllers/Payment.controller')
router.post('/',addpayment)
router.get('/',getall)
router.get('/search',getPayment)
router.put('/',updatepayment)
router.delete('/',deletePayment)
module.exports = router