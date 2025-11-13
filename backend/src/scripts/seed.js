import dotenv from 'dotenv'
import sequelize from '../config/database.js'
import User from '../models/User.js'
import Lead from '../models/Lead.js'
import Activity from '../models/Activity.js'

dotenv.config()

const run = async () => {
  await sequelize.sync({ alter: true })
  const [admin] = await User.findOrCreate({ where: { email: 'admin@crmsystem.com' }, defaults: { name: 'Admin', password: 'Admin@123456', role: 'admin' } })
  const [manager] = await User.findOrCreate({ where: { email: 'manager@crmsystem.com' }, defaults: { name: 'Manager', password: 'Manager@123456', role: 'manager' } })
  const [sales] = await User.findOrCreate({ where: { email: 'sales@crmsystem.com' }, defaults: { name: 'Sales Exec', password: 'Sales@123456', role: 'sales' } })

  const leadA = await Lead.create({ name: 'Acme Corp', email: 'contact@acme.com', status: 'active', ownerId: sales.id })
  const leadB = await Lead.create({ name: 'Globex', email: 'info@globex.com', status: 'new', ownerId: sales.id })
  const leadC = await Lead.create({ name: 'Initech', email: 'hello@initech.com', status: 'closed', ownerId: manager.id })

  await Activity.create({ type: 'note', content: 'Initial outreach', leadId: leadA.id, userId: sales.id })
  await Activity.create({ type: 'call', content: 'Discovery call scheduled', leadId: leadA.id, userId: sales.id })
  await Activity.create({ type: 'meeting', content: 'Demo completed', leadId: leadA.id, userId: sales.id })
  await Activity.create({ type: 'status_change', content: 'Moved to active', leadId: leadA.id, userId: sales.id })

  console.log('Seed complete')
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })