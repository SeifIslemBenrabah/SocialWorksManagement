const express = require('express')
const router =express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  
  const upload = multer({ storage: storage });

const { createMeetingPv,updatePv,deletePv,getPv} = require('../controllers/MeetingPv.controller')
//add
router.post('/',upload.single('file'),createMeetingPv)
//get
router.get('/:id',getPv)
//update
router.put('/:id',updatePv)
//delete
router.delete('/:id',deletePv)  

module.exports = router