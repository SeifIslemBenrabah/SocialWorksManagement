const express = require('express');
const multer = require('multer');
const {
  addDemand,
  getall,
  deletedemand,
  updatedemand,
  getDemands
} = require('../controllers/Demand.controller');

const router = express.Router();

// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Ensure this folder exists!
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ Apply `upload.array('files', 5)` in the route
router.post('/', upload.any(), addDemand);
router.get('/', getall);
router.get('/search', getDemands);
router.put('/:id', updatedemand);
router.delete('/:id', deletedemand);

// Include file-related routes
const fileRoute = require('./File.route');
router.use('/file', fileRoute);

module.exports = router;
