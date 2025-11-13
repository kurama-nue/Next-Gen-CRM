import User from './User.js';
import Lead from './Lead.js';
import Activity from './Activity.js';

// Define associations after all models are loaded
Lead.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Lead.hasMany(Activity, { as: 'activities', foreignKey: 'leadId' });
Activity.belongsTo(Lead, { foreignKey: 'leadId' });
Activity.belongsTo(User, { foreignKey: 'userId' });

export { User, Lead, Activity };
