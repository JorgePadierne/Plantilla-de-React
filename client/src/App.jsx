import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({ nombre: '', email: '' })
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const API_URL = 'http://localhost:3000/api'

  // Cargar usuarios
  const cargarUsuarios = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/usuarios`)
      setUsuarios(response.data.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar usuarios')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Crear usuario
  const crearUsuario = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/usuarios`, formData)
      setUsuarios([response.data.data, ...usuarios])
      setFormData({ nombre: '', email: '' })
      setError(null)
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al crear usuario')
      console.error(err)
    }
  }

  // Actualizar usuario
  const actualizarUsuario = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${API_URL}/usuarios/${editingId}`, formData)
      setUsuarios(usuarios.map(user => 
        user.id === editingId ? response.data.data : user
      ))
      setFormData({ nombre: '', email: '' })
      setEditingId(null)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al actualizar usuario')
      console.error(err)
    }
  }

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return
    
    try {
      await axios.delete(`${API_URL}/usuarios/${id}`)
      setUsuarios(usuarios.filter(user => user.id !== id))
      setError(null)
    } catch (err) {
      setError('Error al eliminar usuario')
      console.error(err)
    }
  }

  // Buscar usuarios
  const buscarUsuarios = async () => {
    if (!searchTerm.trim()) {
      cargarUsuarios()
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      
      // Codificar el término de búsqueda para URLs
      const searchTermEncoded = encodeURIComponent(searchTerm.trim())
      const response = await axios.get(`${API_URL}/usuarios/buscar/${searchTermEncoded}`)
      
      if (response.data.success) {
        setUsuarios(response.data.data)
      } else {
        setError('No se encontraron resultados')
      }
    } catch (err) {
      console.error('Error en búsqueda:', err)
      if (err.response?.status === 404) {
        setError('No se encontraron usuarios con ese nombre')
      } else {
        setError('Error al buscar usuarios. Intenta de nuevo.')
      }
      // En caso de error, mostrar todos los usuarios
      cargarUsuarios()
    } finally {
      setLoading(false)
    }
  }

  // Manejar cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Editar usuario
  const editarUsuario = (usuario) => {
    setFormData({ nombre: usuario.nombre, email: usuario.email })
    setEditingId(usuario.id)
  }

  // Cancelar edición
  const cancelarEdicion = () => {
    setFormData({ nombre: '', email: '' })
    setEditingId(null)
  }

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>🏢 Gestión de Usuarios</h1>
        <p>API con React + Express + SQLite + Prisma</p>
      </header>

      <main className="main">
        {/* Formulario */}
        <section className="form-section">
          <h2>{editingId ? '✏️ Editar Usuario' : '➕ Crear Usuario'}</h2>
          <form onSubmit={editingId ? actualizarUsuario : crearUsuario} className="form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                placeholder="Ingresa el nombre"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Ingresa el email"
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelarEdicion} className="btn btn-secondary">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Búsqueda */}
        <section className="search-section">
          <h2>🔍 Buscar Usuarios</h2>
          <div className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre..."
              className="search-input"
            />
            <button onClick={buscarUsuarios} className="btn btn-search">
              Buscar
            </button>
            <button onClick={cargarUsuarios} className="btn btn-secondary">
              Ver Todos
            </button>
            {searchTerm && (
              <button 
                onClick={() => {
                  setSearchTerm('')
                  cargarUsuarios()
                }} 
                className="btn btn-secondary"
              >
                Limpiar
              </button>
            )}
          </div>
        </section>

        {/* Mensaje de error */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Lista de usuarios */}
        <section className="users-section">
          <h2>👥 Usuarios ({usuarios.length})</h2>
          
          {loading ? (
            <div className="loading">⏳ Cargando usuarios...</div>
          ) : usuarios.length === 0 ? (
            <div className="empty-state">📝 No hay usuarios registrados</div>
          ) : (
            <div className="users-grid">
              {usuarios.map(usuario => (
                <div key={usuario.id} className="user-card">
                  <div className="user-info">
                    <h3>{usuario.nombre}</h3>
                    <p className="user-email">{usuario.email}</p>
                    <p className="user-date">
                      Creado: {new Date(usuario.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="user-actions">
                    <button 
                      onClick={() => editarUsuario(usuario)}
                      className="btn btn-edit"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => eliminarUsuario(usuario.id)}
                      className="btn btn-delete"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
