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

const { createfile,updatefile,deletefile,getfile} = require('../controllers/File.controller')
//add
router.post('/',upload.single('avatar'),createfile)
//get
router.get('/:id',getfile)
//update
router.put('/:id',updatefile)
//delete
router.delete('/:id',deletefile)  

module.exports = router