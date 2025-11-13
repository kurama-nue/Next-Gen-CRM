import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbType = process.env.DB_TYPE || 'sqlite';

let sequelize;

if (dbType === 'postgres') {
  const useSSL = process.env.DB_SSL === 'true';
  const commonOptions = {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    ...(useSSL ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } } : {})
  };

  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, commonOptions);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME || 'crm_system',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || 'postgres',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        ...commonOptions
      }
    );
  }
} else {
  // SQLite for development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../crm_system.db'),
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  });
}

export { sequelize };
export default sequelize;
