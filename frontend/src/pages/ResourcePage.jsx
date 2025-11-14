import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import GenericTable from '../components/GenericTable'

const samples = {
  crm: {
    companies: {
      columns: [ { key: 'name', label: 'Company' }, { key: 'domain', label: 'Domain' }, { key: 'size', label: 'Size' } ],
      rows: [ { name: 'Acme Corp', domain: 'acme.com', size: '200' }, { name: 'Globex', domain: 'globex.com', size: '120' }, { name: 'Initech', domain: 'initech.com', size: '80' } ]
    },
    deals: {
      columns: [ { key: 'name', label: 'Deal' }, { key: 'stage', label: 'Stage' }, { key: 'value', label: 'Value' } ],
      rows: [ { name: 'SaaS Subscription', stage: 'Negotiation', value: '$12,000' }, { name: 'Pilot Project', stage: 'Proposal', value: '$5,000' } ]
    },
    contacts: {
      columns: [ { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'company', label: 'Company' } ],
      rows: [ { name: 'Jane Doe', email: 'jane@acme.com', company: 'Acme Corp' }, { name: 'John Smith', email: 'john@globex.com', company: 'Globex' } ]
    },
    tasks: {
      columns: [ { key: 'title', label: 'Task' }, { key: 'assignee', label: 'Assignee' }, { key: 'due', label: 'Due' } ],
      rows: [ { title: 'Qualify lead', assignee: 'Sales', due: '2025-11-20' }, { title: 'Demo schedule', assignee: 'CS', due: '2025-11-18' } ]
    }
  },
  settings: {
    sources: { columns: [ { key: 'name', label: 'Source' }, { key: 'active', label: 'Active' } ], rows: [ { name: 'Website', active: 'Yes' }, { name: 'Referral', active: 'Yes' } ] },
    'lost-reasons': { columns: [ { key: 'reason', label: 'Reason' }, { key: 'count', label: 'Count' } ], rows: [ { reason: 'Budget', count: '12' }, { reason: 'Timing', count: '4' } ] },
    industries: { columns: [ { key: 'name', label: 'Industry' }, { key: 'leads', label: 'Leads' } ], rows: [ { name: 'SaaS', leads: '53' }, { name: 'Healthcare', leads: '21' } ] },
    calls: { columns: [ { key: 'type', label: 'Type' }, { key: 'duration', label: 'Duration' } ], rows: [ { type: 'Discovery', duration: '30m' }, { type: 'Follow-up', duration: '15m' } ] },
    'email-templates': { columns: [ { key: 'name', label: 'Template' }, { key: 'subject', label: 'Subject' } ], rows: [ { name: 'Welcome', subject: 'Thanks for your interest' }, { name: 'Follow-up', subject: 'Quick check-in' } ] },
    'sms-templates': { columns: [ { key: 'name', label: 'Template' }, { key: 'content', label: 'Content' } ], rows: [ { name: 'Reminder', content: 'Call at 3 PM' } ] },
    'contact-stages': { columns: [ { key: 'stage', label: 'Stage' }, { key: 'order', label: 'Order' } ], rows: [ { stage: 'New', order: '1' }, { stage: 'Qualified', order: '2' } ] },
    'call-stages': { columns: [ { key: 'stage', label: 'Stage' }, { key: 'desc', label: 'Description' } ], rows: [ { stage: 'Scheduled', desc: 'On calendar' }, { stage: 'Completed', desc: 'Call done' } ] },
    labels: { columns: [ { key: 'label', label: 'Label' }, { key: 'color', label: 'Color' } ], rows: [ { label: 'Priority', color: 'Red' }, { label: 'VIP', color: 'Gold' } ] }
  },
  reports: {
    sales: { columns: [ { key: 'metric', label: 'Metric' }, { key: 'value', label: 'Value' } ], rows: [ { metric: 'MRR', value: '$18,500' }, { metric: 'ARR', value: '$220,000' } ] },
    deals: { columns: [ { key: 'stage', label: 'Stage' }, { key: 'count', label: 'Count' } ], rows: [ { stage: 'New', count: '32' }, { stage: 'Negotiation', count: '8' } ] },
    leads: { columns: [ { key: 'source', label: 'Source' }, { key: 'count', label: 'Count' } ], rows: [ { source: 'Website', count: '43' }, { source: 'Referral', count: '17' } ] },
    activities: { columns: [ { key: 'type', label: 'Type' }, { key: 'count', label: 'Count' } ], rows: [ { type: 'Calls', count: '20' }, { type: 'Meetings', count: '6' } ] },
    email: { columns: [ { key: 'template', label: 'Template' }, { key: 'sends', label: 'Sends' } ], rows: [ { template: 'Welcome', sends: '120' } ] },
    calls: { columns: [ { key: 'type', label: 'Type' }, { key: 'count', label: 'Count' } ], rows: [ { type: 'Discovery', count: '14' } ] }
  },
  projects: {
    projects: { columns: [ { key: 'name', label: 'Project' }, { key: 'status', label: 'Status' } ], rows: [ { name: 'CRM Revamp', status: 'Active' } ] },
    tasks: { columns: [ { key: 'task', label: 'Task' }, { key: 'owner', label: 'Owner' } ], rows: [ { task: 'UI Polish', owner: 'Alice' } ] },
    timesheet: { columns: [ { key: 'member', label: 'Member' }, { key: 'hours', label: 'Hours' } ], rows: [ { member: 'Bob', hours: '6.5' } ] },
    'team-members': { columns: [ { key: 'name', label: 'Name' }, { key: 'role', label: 'Role' } ], rows: [ { name: 'Eve', role: 'Engineer' } ] }
  },
  sales: {
    products: { columns: [ { key: 'product', label: 'Product' }, { key: 'price', label: 'Price' } ], rows: [ { product: 'CRM Pro', price: '$49' } ] },
    orders: { columns: [ { key: 'order', label: 'Order' }, { key: 'amount', label: 'Amount' } ], rows: [ { order: 'ORD-1001', amount: '$149' } ] },
    invoices: { columns: [ { key: 'invoice', label: 'Invoice' }, { key: 'amount', label: 'Amount' } ], rows: [ { invoice: 'INV-2001', amount: '$149' } ] },
    payments: { columns: [ { key: 'txn', label: 'Txn' }, { key: 'amount', label: 'Amount' } ], rows: [ { txn: 'TX-901', amount: '$149' } ] },
    expenses: { columns: [ { key: 'item', label: 'Item' }, { key: 'cost', label: 'Cost' } ], rows: [ { item: 'Hosting', cost: '$39' } ] },
    quotations: { columns: [ { key: 'quote', label: 'Quote' }, { key: 'value', label: 'Value' } ], rows: [ { quote: 'Q-3003', value: '$990' } ] }
  },
  apps: {
    chat: { columns: [ { key: 'user', label: 'User' }, { key: 'last', label: 'Last Message' } ], rows: [ { user: 'Jane', last: 'See you' } ] },
    calendar: { columns: [ { key: 'event', label: 'Event' }, { key: 'date', label: 'Date' } ], rows: [ { event: 'Demo', date: '2025-11-20' } ] },
    email: { columns: [ { key: 'subject', label: 'Subject' }, { key: 'to', label: 'To' } ], rows: [ { subject: 'Welcome', to: 'Jane' } ] },
    files: { columns: [ { key: 'file', label: 'File' }, { key: 'size', label: 'Size' } ], rows: [ { file: 'proposal.pdf', size: '1.2MB' } ] },
    notes: { columns: [ { key: 'note', label: 'Note' }, { key: 'updated', label: 'Updated' } ], rows: [ { note: 'Call summary', updated: 'Today' } ] },
    kanban: { columns: [ { key: 'card', label: 'Card' }, { key: 'status', label: 'Status' } ], rows: [ { card: 'Setup onboarding', status: 'Doing' } ] }
  },
  hrm: {
    employees: { columns: [ { key: 'name', label: 'Name' }, { key: 'dept', label: 'Dept' } ], rows: [ { name: 'Alice', dept: 'Sales' } ] },
    holidays: { columns: [ { key: 'holiday', label: 'Holiday' }, { key: 'date', label: 'Date' } ], rows: [ { holiday: 'New Year', date: '2026-01-01' } ] },
    attendance: { columns: [ { key: 'name', label: 'Name' }, { key: 'status', label: 'Status' } ], rows: [ { name: 'Bob', status: 'Present' } ] },
    leaves: { columns: [ { key: 'name', label: 'Name' }, { key: 'days', label: 'Days' } ], rows: [ { name: 'Eve', days: '2' } ] },
    payroll: { columns: [ { key: 'name', label: 'Name' }, { key: 'amount', label: 'Amount' } ], rows: [ { name: 'Alice', amount: '$4,000' } ] },
    departments: { columns: [ { key: 'dept', label: 'Dept' }, { key: 'head', label: 'Head' } ], rows: [ { dept: 'Engineering', head: 'Eve' } ] },
    designations: { columns: [ { key: 'title', label: 'Title' }, { key: 'level', label: 'Level' } ], rows: [ { title: 'Manager', level: 'L4' } ] }
  },
  finance: {
    estimates: { columns: [ { key: 'id', label: 'Estimate' }, { key: 'value', label: 'Value' } ], rows: [ { id: 'EST-100', value: '$800' } ] },
    expenses: { columns: [ { key: 'item', label: 'Item' }, { key: 'cost', label: 'Cost' } ], rows: [ { item: 'SaaS', cost: '$99' } ] },
    payments: { columns: [ { key: 'txn', label: 'Txn' }, { key: 'amount', label: 'Amount' } ], rows: [ { txn: 'TX-200', amount: '$250' } ] },
    accounts: { columns: [ { key: 'account', label: 'Account' }, { key: 'balance', label: 'Balance' } ], rows: [ { account: 'Operating', balance: '$12,000' } ] },
    taxes: { columns: [ { key: 'name', label: 'Tax' }, { key: 'rate', label: 'Rate' } ], rows: [ { name: 'GST', rate: '5%' } ] }
  },
  system: {
    general: { columns: [ { key: 'setting', label: 'Setting' }, { key: 'value', label: 'Value' } ], rows: [ { setting: 'Timezone', value: 'UTC' } ] },
    company: { columns: [ { key: 'field', label: 'Field' }, { key: 'value', label: 'Value' } ], rows: [ { field: 'Name', value: 'CRM System' } ] },
    localization: { columns: [ { key: 'key', label: 'Key' }, { key: 'value', label: 'Value' } ], rows: [ { key: 'en-US', value: 'English' } ] },
    roles: { columns: [ { key: 'role', label: 'Role' }, { key: 'users', label: 'Users' } ], rows: [ { role: 'Admin', users: '2' } ] },
    currency: { columns: [ { key: 'code', label: 'Code' }, { key: 'symbol', label: 'Symbol' } ], rows: [ { code: 'USD', symbol: '$' } ] },
    email: { columns: [ { key: 'smtp', label: 'SMTP' }, { key: 'status', label: 'Status' } ], rows: [ { smtp: 'smtp.gmail.com', status: 'Configured' } ] },
    integrations: { columns: [ { key: 'name', label: 'Integration' }, { key: 'status', label: 'Status' } ], rows: [ { name: 'Slack', status: 'Enabled' } ] },
    appearance: { columns: [ { key: 'theme', label: 'Theme' }, { key: 'mode', label: 'Mode' } ], rows: [ { theme: 'Aurora', mode: 'Dark' } ] },
    notifications: { columns: [ { key: 'channel', label: 'Channel' }, { key: 'enabled', label: 'Enabled' } ], rows: [ { channel: 'Email', enabled: 'Yes' } ] },
    security: { columns: [ { key: 'rule', label: 'Rule' }, { key: 'status', label: 'Status' } ], rows: [ { rule: '2FA', status: 'Optional' } ] }
  },
  users: {
    users: { columns: [ { key: 'name', label: 'Name' }, { key: 'role', label: 'Role' } ], rows: [ { name: 'Admin', role: 'admin' }, { name: 'Sales', role: 'sales' } ] },
    admins: { columns: [ { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' } ], rows: [ { name: 'Super', email: 'super@crm' } ] },
    roles: { columns: [ { key: 'role', label: 'Role' }, { key: 'permissions', label: 'Permissions' } ], rows: [ { role: 'Manager', permissions: 'edit,view' } ] },
    permissions: { columns: [ { key: 'perm', label: 'Permission' }, { key: 'scope', label: 'Scope' } ], rows: [ { perm: 'leads.write', scope: 'own' } ] },
    'login-history': { columns: [ { key: 'user', label: 'User' }, { key: 'time', label: 'Time' } ], rows: [ { user: 'Admin', time: 'Just now' } ] }
  },
  support: {
    help: { columns: [ { key: 'topic', label: 'Topic' }, { key: 'status', label: 'Status' } ], rows: [ { topic: 'Getting Started', status: 'Available' } ] },
    faq: { columns: [ { key: 'q', label: 'Question' }, { key: 'a', label: 'Answer' } ], rows: [ { q: 'How to add lead?', a: 'Use Leads page' } ] },
    feedback: { columns: [ { key: 'user', label: 'User' }, { key: 'message', label: 'Message' } ], rows: [ { user: 'Jane', message: 'Love the new UI' } ] }
  }
}

export default function ResourcePage() {
  const { group, name } = useParams()
  const conf = useMemo(() => {
    const g = samples[group] || {}
    const s = g[name] || { columns: [ { key: 'key', label: 'Key' }, { key: 'value', label: 'Value' } ], rows: [ { key: 'info', value: 'No sample available' } ] }
    return s
  }, [group, name])
  const title = `${group?.toUpperCase() || ''} · ${name?.replace(/-/g,' ') || ''}`
  const [rows, setRows] = useState([])
  useEffect(() => {
    const base = conf.rows || []
    const more = Array.from({ length: Math.max(5 - base.length, 0) }).map((_,i)=>{
      const obj = {}
      conf.columns.forEach((c,idx)=>{ obj[c.key] = `${c.label} ${i+1}` })
      return obj
    })
    setRows([...base, ...more])
  }, [conf])
  const onEdit = (r, idx) => {
    const next = prompt('Edit as JSON', JSON.stringify(r))
    if (!next) return
    try {
      const obj = JSON.parse(next)
      setRows(prev => prev.map((x,i)=> i===idx ? obj : x))
    } catch {}
  }
  const onDelete = (r, idx) => {
    setRows(prev => prev.filter((_,i)=> i!==idx))
  }
  const onCreate = () => {
    const obj = {}
    conf.columns.forEach(c=>{ obj[c.key] = '' })
    setRows(prev => [obj, ...prev])
  }
  return <GenericTable title={title} columns={conf.columns} rows={rows} actions onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />
}
