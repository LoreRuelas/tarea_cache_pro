// routes/pacientes.js
import express from 'express';
import db from '../db/mysql.js';
import redis from '../cache/redis.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const cacheKey = `paciente:${id}`;

  try {
    // Buscar en Redis
    const cacheData = await redis.get(cacheKey);

    if (cacheData) {
      console.log('Cache HIT');
      return res.json(JSON.parse(cacheData));
    }

    // Buscar en MySQL
    const [rows] = await db.query('SELECT * FROM pacientes WHERE id = ?', [id]);

    if (rows.length === 0) return res.status(404).json({ mensaje: 'Paciente no encontrado' });

    // Guardar en Redis
    await redis.setEx(cacheKey, 60, JSON.stringify(rows[0])); // 60 segundos

    console.log('Cache MISS - Guardado en Redis');
    res.json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
