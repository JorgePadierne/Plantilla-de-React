const http = require('http');

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testValidation() {
  console.log('🧪 Probando validación de email único...\n');

  try {
    // 1. Crear primer usuario
    console.log('1. Creando primer usuario...');
    const user1 = await makeRequest('POST', '/api/usuarios', {
      nombre: 'Ana',
      email: 'ana@test.com'
    });
    console.log(`Status: ${user1.status} - ${user1.data.mensaje}`);

    // 2. Intentar crear usuario con mismo email
    console.log('\n2. Intentando crear usuario con email duplicado...');
    const user2 = await makeRequest('POST', '/api/usuarios', {
      nombre: 'Ana2',
      email: 'ana@test.com'
    });
    console.log(`Status: ${user2.status} - ${user2.data.mensaje}`);

    // 3. Verificar usuarios existentes
    console.log('\n3. Verificando usuarios en la base de datos...');
    const allUsers = await makeRequest('GET', '/api/usuarios');
    console.log(`Total usuarios: ${allUsers.data.total}`);
    console.log('Usuarios:', allUsers.data.data.map(u => `${u.nombre} (${u.email})`));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testValidation(); 