import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000;

// Middleware
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean)
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : '*' }))
app.use(express.json())

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan credenciales de Supabase en .env')
}

const supabase = createClient(supabaseUrl, supabaseKey)
console.log('✅ Cliente de Supabase inicializado')

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente con Supabase',
    timestamp: new Date().toISOString()
  })
})

// GET - Obtener todas las reseñas
app.get('/api/reviews', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    res.json(data)
  } catch (error) {
    console.error('Error al obtener reseñas:', error)
    res.status(500).json({ 
      error: 'Error al obtener reseñas',
      message: error.message 
    })
  }
})

// GET - Obtener una reseña específica
app.get('/api/reviews/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', req.params.id)
      .single()
    
    if (error) throw error
    
    if (!data) {
      return res.status(404).json({ error: 'Reseña no encontrada' })
    }
    
    res.json(data)
  } catch (error) {
    console.error('Error al obtener reseña:', error)
    res.status(500).json({ 
      error: 'Error al obtener reseña',
      message: error.message 
    })
  }
})

// POST - Crear nueva reseña
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body
    
    // Validación básica
    if (!name || !message) {
      return res.status(400).json({ 
        error: 'Nombre y mensaje son requeridos' 
      })
    }
    
    // Validar rating
    const validRating = rating && rating >= 1 && rating <= 5 ? rating : 5
    
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        { name, email: email || null, message, rating: validRating }
      ])
      .select()
    
    if (error) throw error
    
    res.status(201).json({
      message: 'Reseña creada exitosamente',
      data: data[0]
    })
  } catch (error) {
    console.error('Error al crear reseña:', error)
    res.status(500).json({ 
      error: 'Error al crear reseña',
      message: error.message 
    })
  }
})

// DELETE - Eliminar reseña
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', req.params.id)
    
    if (error) throw error
    
    res.json({ message: 'Reseña eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar reseña:', error)
    res.status(500).json({ 
      error: 'Error al eliminar reseña',
      message: error.message 
    })
  }
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})
