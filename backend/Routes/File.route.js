const express = require('express');
const multer = require('multer');
const path = require('path');
const Authjwt = require('../middleware/Authjwt');
const { createfile, updatefile, deletefile, getfile } = require('../controllers/File.controller');

const router = express.Router();

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${path.basename(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, JPEG and PNG files are allowed'));
    }
  },
});

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

router.post('/', Authjwt(['Employee', 'Committee']), upload.single('file'), handleMulterError, createfile);
router.get('/:id', Authjwt(['Admin', 'Committee', 'Employee']), getfile);
router.put('/:id', Authjwt(['Employee', 'Committee']), updatefile);
router.delete('/:id', Authjwt(['Employee', 'Committee']), deletefile);

module.exports = router;
