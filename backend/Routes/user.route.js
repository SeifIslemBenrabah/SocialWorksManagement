const express = require('express');
const Authjwt = require('../middleware/Authjwt');
const {
  createUser,
  getAllUsers,
  getEmployes,
  getCommite,
  getByEmailOrName,
  updateProfile,
  updateUser,
  deleteAccount,
} = require('../controllers/User.controller');

const router = express.Router();

router.post('/', Authjwt(['Admin']), createUser);
router.get('/', Authjwt(['Admin']), getAllUsers);
router.get('/search', Authjwt(['Admin']), getByEmailOrName);
router.get('/employes', Authjwt(['Admin', 'Committee']), getEmployes);
router.get('/commite', Authjwt(['Admin', 'Committee']), getCommite);
router.put('/profile', Authjwt(['Admin', 'Employee', 'Committee']), updateProfile);
router.put('/:id', Authjwt(['Admin']), updateUser);
router.delete('/:id', Authjwt(['Admin']), deleteAccount);

module.exports = router;
