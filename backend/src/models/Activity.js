// Activity model for timeline
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Lead from './Lead.js';
import User from './User.js';

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('note', 'call', 'meeting', 'status_change'),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  leadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Lead,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Activity.belongsTo(Lead, { foreignKey: 'leadId' });
Activity.belongsTo(User, { foreignKey: 'userId' });

export default Activity;
