import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} from '../controllers/userController.js';

// Rutas de usuarios
router.get('/', getAllUsers);
router.get('/buscar/:nombre', searchUsers); // Debe ir ANTES de /:id
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;