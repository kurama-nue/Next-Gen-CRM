
import { Server } from 'socket.io';
import logger from '../utils/logger.js';

let ioInstance = null;
export const setupSocket = (server) => {
  const allowedOriginsEnv = process.env.CORS_ORIGINS || process.env.FRONTEND_URL || '';
  const allowedOrigins = allowedOriginsEnv
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowedOrigins.length === 0) {
    allowedOrigins.push('http://localhost:5173', 'https://next-gen-crm-r27k.onrender.com');
  }

  ioInstance = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  ioInstance.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });

    socket.on('error', (error) => {
      logger.error(`Socket error for ${socket.id}:`, error);
    });
  });

  return ioInstance;
};

export const getIO = () => ioInstance;
