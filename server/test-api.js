import http from 'http';

// Función para hacer peticiones HTTP
async function makeRequest(method, path, data = null) {
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

// Función para mostrar resultados de forma legible
function logResult(testName, result) {
  console.log(`\n🔹 ${testName}:`);
  console.log(`Status: ${result.status}`);
  console.log('Response:', JSON.stringify(result.data, null, 2));
}

// Ejecutar pruebas
async function runTests() {
  console.log('🚀 Iniciando pruebas de la API...\n');

  try {
    // 1. GET - Obtener todos los usuarios
    const usuarios = await makeRequest('GET', '/api/usuarios');
    logResult('GET /api/usuarios - Obtener todos los usuarios', usuarios);

    // 2. POST - Crear un nuevo usuario
    const nuevoUsuario = await makeRequest('POST', '/api/usuarios', {
      nombre: 'Pedro',
      email: 'pedro@email.com'
    });
    logResult('POST /api/usuarios - Crear nuevo usuario', nuevoUsuario);

    // 3. GET - Obtener usuario por ID
    const usuarioPorId = await makeRequest('GET', '/api/usuarios/1');
    logResult('GET /api/usuarios/1 - Obtener usuario por ID', usuarioPorId);

    // 4. PUT - Actualizar usuario
    const usuarioActualizado = await makeRequest('PUT', '/api/usuarios/1', {
      nombre: 'Juan Carlos'
    });
    logResult('PUT /api/usuarios/1 - Actualizar usuario', usuarioActualizado);

    // 5. GET - Buscar usuarios por nombre
    const busqueda = await makeRequest('GET', '/api/usuarios/buscar/juan');
    logResult('GET /api/usuarios/buscar/juan - Buscar usuarios', busqueda);

    // 6. POST - Intentar crear usuario con email duplicado (debe fallar)
    const emailDuplicado = await makeRequest('POST', '/api/usuarios', {
      nombre: 'Otro Juan',
      email: 'juan@email.com'
    });
    logResult('POST /api/usuarios - Email duplicado (debe fallar)', emailDuplicado);

    // 7. GET - Obtener todos los usuarios después de los cambios
    const usuariosFinal = await makeRequest('GET', '/api/usuarios');
    logResult('GET /api/usuarios - Estado final', usuariosFinal);

    console.log('\n✅ Todas las pruebas completadas!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
  }
}

// Ejecutar las pruebas
runTests();