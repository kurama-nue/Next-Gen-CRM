
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import './models/index.js';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { setupSocket } from './sockets/socketManager.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import logger from './utils/logger.js';
import integrationRoutes from './routes/integrationRoutes.js';

console.log('All imports completed in server.js');

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

dotenv.config();

const app = express();
const server = http.createServer(app);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/integrations', integrationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling
app.use(errorHandler);

// Setup WebSocket
setupSocket(server);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Try to connect to database, but don't fail if it's not available
    try {
      await sequelize.authenticate();
      logger.info('✓ Database connected');
      
  await sequelize.sync({ alter: true });
  logger.info('✓ Database synced');

      const defaults = [
        { name: 'Admin', email: 'admin@crmsystem.com', password: 'Admin@123456', role: 'admin' },
        { name: 'Manager', email: 'manager@crmsystem.com', password: 'Manager@123456', role: 'manager' },
        { name: 'Sales Exec', email: 'sales@crmsystem.com', password: 'Sales@123456', role: 'sales' }
      ];
      for (const d of defaults) {
        const existing = await User.findOne({ where: { email: d.email } });
        const hashed = await bcrypt.hash(d.password, 10);
        if (!existing) {
          await User.create({ name: d.name, email: d.email, password: hashed, role: d.role });
        } else {
          if (!existing.password || !String(existing.password).startsWith('$2')) {
            existing.password = hashed;
            await existing.save();
          }
        }
      }
    } catch (dbError) {
      logger.warn('⚠ Database connection failed:', dbError.message);
      logger.warn('⚠ Server will start without database. Database features will be unavailable.');
    }
    
    server.listen(PORT, () => {
      logger.info(`✓ Server running on port ${PORT}`);
      console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api/v1/auth`);
    });
  } catch (error) {
    logger.error('Server startup error:', error);
    process.exit(1);
  }
};


startServer().catch((err) => {
  console.error('Fatal error during server startup:', err);
  process.exit(1);
});

export default app;
