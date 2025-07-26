const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} = require('../controllers/userController');

// Rutas de usuarios
router.get('/', getAllUsers);
router.get('/buscar/:nombre', searchUsers); // Debe ir ANTES de /:id
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router; 