const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ 
      success: true, 
      data: usuarios,
      total: usuarios.length 
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      success: false, 
      mensaje: 'Error interno del servidor' 
    });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await prisma.usuario.findUnique({
      where: { id }
    });
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false, 
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.json({ success: true, data: usuario });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ 
      success: false, 
      mensaje: 'Error interno del servidor' 
    });
  }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    
    // Validación básica
    if (!nombre || !email) {
      return res.status(400).json({ 
        success: false, 
        mensaje: 'Nombre y email son requeridos' 
      });
    }
    
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email
      }
    });
    
    res.status(201).json({ 
      success: true, 
      data: nuevoUsuario,
      mensaje: 'Usuario creado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    
    // Manejar error de email duplicado
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false, 
        mensaje: 'El email ya está registrado' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      mensaje: 'Error interno del servidor' 
    });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, email } = req.body;
    
    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nombre: nombre || undefined,
        email: email || undefined
      }
    });
    
    res.json({ 
      success: true, 
      data: usuarioActualizado,
      mensaje: 'Usuario actualizado exitosamente' 
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false, 
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false, 
        mensaje: 'El email ya está registrado' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      mensaje: 'Error interno del servidor' 
    });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarioEliminado = await prisma.usuario.delete({
      where: { id }
    });
    
    res.json({ 
      success: true, 
      data: usuarioEliminado,
      mensaje: 'Usuario eliminado exitosamente' 
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false, 
        mensaje: 'Usuario no encontrado' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      mensaje: 'Error interno del servidor' 
    });
  }
};

// Buscar usuarios por nombre
const searchUsers = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const usuariosFiltrados = await prisma.usuario.findMany({
      where: {
        nombre: {
          contains: nombre
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ 
      success: true, 
      data: usuariosFiltrados,
      total: usuariosFiltrados.length 
    });
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ 
      success: false, 
      mensaje: 'Error interno del servidor' 
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
}; 