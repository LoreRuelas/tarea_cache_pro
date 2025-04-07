// cache/redis.js
import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL, // Ej: redis://default:pass@host:6379
});

redis.on('error', err => console.error('Redis error', err));

await redis.connect();

export default redis;
