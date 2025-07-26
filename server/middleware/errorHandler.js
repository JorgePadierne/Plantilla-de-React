// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error no manejado:', err);

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      mensaje: 'Error de validación',
      errors: err.errors
    });
  }

  // Error de Prisma
  if (err.code === 'P2002') {
    return res.status(400).json({
      success: false,
      mensaje: 'El registro ya existe'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      mensaje: 'Registro no encontrado'
    });
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    mensaje: 'Error interno del servidor'
  });
};

module.exports = errorHandler; 