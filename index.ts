import express from 'express';
import rateLimit from 'express-rate-limit';
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

const app = express();

// Create a `node-redis` client
const client = createClient({
  url: 'redis://localhost:6379'
});
// Then connect to the Redis server
client.connect();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 2, // Limit each IP to 2 requests per `window` (here, per 1 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// Redis store configuration
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args),
  }),
})

app.get('/', limiter, (req, res) => {
  res.send('hello world');
});

app.listen(3000, () => console.log('App running port 3000'));
