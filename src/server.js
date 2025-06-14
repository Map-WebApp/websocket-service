
import { WebSocketServer } from 'ws';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();
const redis = new Redis(process.env.REDIS_URL);
const wss = new WebSocketServer({ port: process.env.PORT || 3002 });

wss.on('connection', socket => {
  socket.on('message', data => {
    // broadcast message
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(data.toString());
    });
  });
});

console.log(`WebSocket service listening on ${process.env.PORT || 3002}`);
