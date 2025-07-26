import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Base de datos conectada exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
    process.exit(1);
  }
};

// Función para desconectar la base de datos
const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('🔌 Base de datos desconectada');
  } catch (error) {
    console.error('❌ Error al desconectar la base de datos:', error);
  }
};

export {
  prisma,
  connectDB,
  disconnectDB
};