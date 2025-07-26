const { searchUsers } = require('./controllers/userController');

// Simular request y response
const mockReq = {
  params: {
    nombre: 'Jorge'
  }
};

const mockRes = {
  json: (data) => {
    console.log('Response:', JSON.stringify(data, null, 2));
  },
  status: (code) => {
    console.log('Status:', code);
    return {
      json: (data) => {
        console.log('Error Response:', JSON.stringify(data, null, 2));
      }
    };
  }
};

async function testController() {
  console.log('🧪 Probando controlador directamente...\n');
  
  try {
    await searchUsers(mockReq, mockRes);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testController(); 