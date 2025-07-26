#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Configurando nuevo proyecto...\n');

// Función para crear directorios
function createDirectories() {
  const dirs = [
    'controllers',
    'routes', 
    'middleware',
    'config',
    'utils',
    'scripts'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado directorio: ${dir}`);
    }
  });
}

// Función para crear archivo .env
function createEnvFile() {
  const envContent = `PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d`;

  if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', envContent);
    console.log('✅ Creado archivo .env');
  }
}

// Función para inicializar base de datos
function initDatabase() {
  try {
    console.log('🗄️ Inicializando base de datos...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Base de datos inicializada');
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error.message);
  }
}

// Función principal
async function setup() {
  try {
    createDirectories();
    createEnvFile();
    initDatabase();
    
    console.log('\n🎉 ¡Proyecto configurado exitosamente!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. npm run dev - Iniciar servidor');
    console.log('2. cd ../client && npm run dev - Iniciar frontend');
    console.log('3. Personalizar esquema en prisma/schema.prisma');
    console.log('4. Agregar nuevos controladores y rutas');
    
  } catch (error) {
    console.error('❌ Error en la configuración:', error);
  }
}

setup();