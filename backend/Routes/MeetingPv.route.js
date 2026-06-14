const express = require('express');
const multer = require('multer');
const path = require('path');
const Authjwt = require('../middleware/Authjwt');
const { createMeetingPv, updatePv, deletePv, getPv } = require('../controllers/MeetingPv.controller');

const router = express.Router();

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${path.basename(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
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

router.post('/', Authjwt(['Committee']), upload.single('file'), handleMulterError, createMeetingPv);
router.get('/:id', Authjwt(['Admin', 'Committee']), getPv);
router.put('/:id', Authjwt(['Committee']), updatePv);
router.delete('/:id', Authjwt(['Committee']), deletePv);

module.exports = router;
