const http = require('http');

function makeRequest(method, path) {
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

    req.end();
  });
}

async function testSearch() {
  console.log('🔍 Probando endpoint de búsqueda...\n');

  try {
    // 1. Buscar "Ana"
    console.log('1. Buscando usuarios con "Ana"...');
    const search1 = await makeRequest('GET', '/api/usuarios/buscar/Ana');
    console.log(`Status: ${search1.status}`);
    console.log('Response:', JSON.stringify(search1.data, null, 2));

    // 2. Buscar "Jorge"
    console.log('\n2. Buscando usuarios con "Jorge"...');
    const search2 = await makeRequest('GET', '/api/usuarios/buscar/Jorge');
    console.log(`Status: ${search2.status}`);
    console.log('Response:', JSON.stringify(search2.data, null, 2));

    // 3. Buscar algo que no existe
    console.log('\n3. Buscando usuarios con "XYZ" (no existe)...');
    const search3 = await makeRequest('GET', '/api/usuarios/buscar/XYZ');
    console.log(`Status: ${search3.status}`);
    console.log('Response:', JSON.stringify(search3.data, null, 2));

    // 4. Obtener todos los usuarios para comparar
    console.log('\n4. Obteniendo todos los usuarios...');
    const allUsers = await makeRequest('GET', '/api/usuarios');
    console.log(`Status: ${allUsers.status}`);
    console.log('Total usuarios:', allUsers.data.total);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSearch(); 