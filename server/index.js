import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import db from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => res.json({ msg: 'API funcionando' }));
app.use('/api', routes);

// Conexion a db
const PORT = 4000;

try {
await db.authenticate();
console.log('✅ Conexión a MySQL establecida');

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
} catch (err) {
console.error('❌ Error al conectar DB:', err);
}

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});
