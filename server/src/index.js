const { PORT } = require('./config/env');
const express  = require('express');
const cors     = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Logger
app.use((req, res, next) => {
  const t = Date.now();
  res.on('finish', () => {
    console.log(`[${req.method}] ${req.originalUrl} — ${res.statusCode} (${Date.now()-t}ms)`);
  });
  next();
});

// Rutas
app.use('/api/v1/tasks', taskRoutes);
app.get('/', (req, res) => res.json({ mensaje: 'TaskFlow API ✅', version: 'v1' }));

// Manejador de errores
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado.' });
  }
  console.error('Error interno:', err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log(`📋 API en http://localhost:${PORT}/api/v1/tasks`);
});