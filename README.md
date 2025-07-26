# 🚀 Plantilla Full-Stack React + Express + Prisma

Una plantilla completa y moderna para desarrollar aplicaciones full-stack con React, Express, Prisma y SQLite.

## ✨ Características

- **Frontend**: React 19 + Vite + Axios
- **Backend**: Express.js + Prisma ORM + SQLite
- **Arquitectura**: Modular y escalable
- **Base de datos**: SQLite (fácil migrar a PostgreSQL)
- **Validación**: Manejo de errores robusto
- **CORS**: Configurado para desarrollo
- **Estructura**: Separación clara de responsabilidades

## 🏗️ Estructura del Proyecto

```
📁 proyecto/
├── 📁 client/                 # Frontend React
│   ├── 📁 src/
│   │   ├── App.jsx           # Componente principal
│   │   └── App.css           # Estilos
│   ├── package.json
│   └── vite.config.js
├── 📁 server/                 # Backend Express
│   ├── 📁 controllers/        # Lógica de negocio
│   ├── 📁 routes/            # Definición de rutas
│   ├── 📁 middleware/        # Middlewares personalizados
│   ├── 📁 config/            # Configuraciones
│   ├── 📁 prisma/            # Esquema de base de datos
│   ├── index.js              # Punto de entrada
│   └── package.json
└── README.md
```

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd <nombre-del-proyecto>
```

### 2. Configurar Backend
```bash
cd server
npm install
npm run setup          # Configuración inicial
npm run dev            # Iniciar servidor
```

### 3. Configurar Frontend
```bash
cd client
npm install
npm run dev            # Iniciar aplicación React
```

## 📋 Scripts Disponibles

### Backend (`server/`)
```bash
npm run dev            # Iniciar servidor de desarrollo
npm run setup          # Configuración inicial
npm run db:generate    # Regenerar cliente Prisma
npm run db:push        # Actualizar esquema de BD
npm run db:studio      # Abrir Prisma Studio
npm run db:reset       # Resetear base de datos
```

### Frontend (`client/`)
```bash
npm run dev            # Iniciar servidor de desarrollo
npm run build          # Construir para producción
npm run preview        # Previsualizar build
```

## 🗄️ Base de Datos

### Esquema Actual
```prisma
model Usuario {
  id        Int      @id @default(autoincrement())
  nombre    String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("usuarios")
}
```

### Comandos Útiles
```bash
# Ver base de datos en navegador
npm run db:studio

# Actualizar esquema
npm run db:push

# Resetear base de datos
npm run db:reset
```

## 🔌 APIs Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/:id` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |
| GET | `/api/usuarios/buscar/:nombre` | Buscar usuarios por nombre |

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en `server/`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

## 📝 Personalización

### 1. Agregar Nuevo Modelo
1. Editar `server/prisma/schema.prisma`
2. Ejecutar `npm run db:push`
3. Crear controlador en `server/controllers/`
4. Crear rutas en `server/routes/`

### 2. Agregar Nuevo Endpoint
```javascript
// En server/controllers/nuevoController.js
const createNuevo = async (req, res) => {
  // Tu lógica aquí
};

// En server/routes/nuevoRoutes.js
router.post('/', createNuevo);
```

### 3. Migrar a PostgreSQL
1. Cambiar `provider` en `schema.prisma` a `postgresql`
2. Actualizar `DATABASE_URL` en `.env`
3. Ejecutar `npm run db:push`

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
# Configurar variables de entorno
DATABASE_URL=postgresql://...
NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Construir
npm run build

# Deploy
vercel --prod
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](docs/)
2. Busca en [issues](../../issues)
3. Crea un nuevo issue

---

**¡Disfruta desarrollando! 🎉** 