const express = require('express')
const Authjwt = require('../middleware/Authjwt')
const {getall,addProgramme,deleteprogramme,updateprogramme,deleteCondition,getProgrammes} = require('../controllers/Programme.controller')
const router = express.Router()
router.post('/',addProgramme)

router.get('/search',getProgrammes)
router.get('/',getall)

router.put('/:id',updateprogramme)

router.delete('/:id',deleteprogramme)
router.delete('/condition/:id',deleteCondition)

module.exports = router;