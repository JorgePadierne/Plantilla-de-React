import express from 'express';
import cors from 'cors';
import { connectDB, disconnectDB } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/usuarios', userRoutes);

// Ruta de prueba
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada'
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
      console.log('📋 APIs disponibles:');
      console.log('- GET /api/usuarios - Obtener todos los usuarios');
      console.log('- GET /api/usuarios/:id - Obtener usuario por ID');
      console.log('- POST /api/usuarios - Crear nuevo usuario');
      console.log('- PUT /api/usuarios/:id - Actualizar usuario');
      console.log('- DELETE /api/usuarios/:id - Eliminar usuario');
      console.log('- GET /api/usuarios/buscar/:nombre - Buscar usuarios');
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejar cierre graceful del servidor
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await disconnectDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await disconnectDB();
  process.exit(0);
});

// Iniciar el servidor
startServer();