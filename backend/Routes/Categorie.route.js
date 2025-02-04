const express = require('express')
const Authjwt = require('../middleware/Authjwt')
const {addCat,deleteCat,updatecat,getall} = require('../controllers/Categorie.controller')
const router = express.Router()
router.post('/',addCat)
router.get('/',getall)
router.delete('/:id',deleteCat)
router.put('/:id',updatecat)
module.exports = router;
