const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  console.log('🔍 Probando conexión a la base de datos...\n');

  try {
    // 1. Verificar conexión
    console.log('1. Verificando conexión...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa');

    // 2. Contar usuarios existentes
    console.log('\n2. Contando usuarios en la base de datos...');
    const count = await prisma.usuario.count();
    console.log(`📊 Total de usuarios: ${count}`);

    // 3. Obtener todos los usuarios
    console.log('\n3. Listando usuarios:');
    const usuarios = await prisma.usuario.findMany();
    if (usuarios.length === 0) {
      console.log('📝 No hay usuarios en la base de datos');
    } else {
      usuarios.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.nombre} (${user.email}) - ID: ${user.id}`);
      });
    }

    // 4. Verificar estructura de la tabla
    console.log('\n4. Verificando estructura de la tabla...');
    const sampleUser = await prisma.usuario.findFirst();
    if (sampleUser) {
      console.log('✅ Estructura de tabla correcta');
      console.log('   Campos disponibles:', Object.keys(sampleUser));
    } else {
      console.log('ℹ️  Tabla vacía, pero estructura correcta');
    }

  } catch (error) {
    console.error('❌ Error en la base de datos:', error.message);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Conexión cerrada');
  }
}

testDatabase(); 