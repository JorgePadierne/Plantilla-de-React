const http = require('http');

function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method
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

    req.end();
  });
}

async function testSimple() {
  console.log('🔍 Test simple de búsqueda...\n');

  try {
    // 1. Obtener todos los usuarios primero
    console.log('1. Obteniendo todos los usuarios...');
    const allUsers = await makeRequest('GET', '/api/usuarios');
    console.log(`Status: ${allUsers.status}`);
    console.log('Usuarios disponibles:', allUsers.data.data.map(u => u.nombre));

    // 2. Buscar "Jorge"
    console.log('\n2. Buscando "Jorge"...');
    const search1 = await makeRequest('GET', '/api/usuarios/buscar/Jorge');
    console.log(`Status: ${search1.status}`);
    console.log('Response:', JSON.stringify(search1.data, null, 2));

    // 3. Buscar "Diana"
    console.log('\n3. Buscando "Diana"...');
    const search2 = await makeRequest('GET', '/api/usuarios/buscar/Diana');
    console.log(`Status: ${search2.status}`);
    console.log('Response:', JSON.stringify(search2.data, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSimple(); 