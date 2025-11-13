
import { Server } from 'socket.io';
import logger from '../utils/logger.js';

let ioInstance = null;
export const setupSocket = (server) => {
  ioInstance = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true
    }
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
