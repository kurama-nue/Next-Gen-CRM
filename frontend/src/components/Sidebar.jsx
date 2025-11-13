import { useState, useMemo } from 'react'
import SidebarLogo from './sidebar/SidebarLogo'
import SidebarSearch from './sidebar/SidebarSearch'
import SidebarSection from './sidebar/SidebarSection'
import SidebarHeading from './sidebar/SidebarHeading'
import SidebarItem from './sidebar/SidebarItem'
import SidebarFooter from './sidebar/SidebarFooter'
import { LayoutGrid, Building2, Medal, Users, GitBranch, Activity, UserCircle, ListChecks, Settings, Cog, PhoneCall, Mail, CalendarDays, FolderClosed, StickyNote, Kanban, Briefcase, ShoppingCart, FileText, CreditCard, Wallet, Receipt, Boxes, DollarSign, UserCog, BarChart3 } from 'lucide-react'

export default function Sidebar() {
  const [query, setQuery] = useState('')
  const sections = useMemo(() => ([
    { heading: 'CRM', items: [
      { to: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
      { to: '/crm/companies', icon: Building2, label: 'Companies' },
      { to: '/crm/deals', icon: Medal, label: 'Deals' },
      { to: '/leads', icon: BarChart3, label: 'Leads' },
      { to: '/pipeline', icon: GitBranch, label: 'Pipeline' },
      { to: '/activities', icon: Activity, label: 'Activities' },
      { to: '/crm/contacts', icon: UserCircle, label: 'Contacts' },
      { to: '/crm/tasks', icon: ListChecks, label: 'Tasks' },
    ]},
    { heading: 'CRM Settings', items: [
      { to: '/settings/sources', icon: Cog, label: 'Sources' },
      { to: '/settings/lost-reasons', icon: Cog, label: 'Lost Reasons' },
      { to: '/settings/industries', icon: Cog, label: 'Industries' },
      { to: '/settings/calls', icon: PhoneCall, label: 'Calls' },
      { to: '/settings/email-templates', icon: Mail, label: 'Email Templates' },
      { to: '/settings/sms-templates', icon: PhoneCall, label: 'SMS Templates' },
      { to: '/settings/contact-stages', icon: Cog, label: 'Contact Stages' },
      { to: '/settings/call-stages', icon: PhoneCall, label: 'Call Stages' },
      { to: '/settings/labels', icon: Cog, label: 'Labels' },
    ]},
    { heading: 'Reports', items: [
      { to: '/reports/sales', icon: BarChart3, label: 'Sales Report' },
      { to: '/reports/deals', icon: BarChart3, label: 'Deals Report' },
      { to: '/reports/leads', icon: BarChart3, label: 'Leads Report' },
      { to: '/reports/activities', icon: BarChart3, label: 'Activities Report' },
      { to: '/reports/email', icon: Mail, label: 'Email Report' },
      { to: '/reports/calls', icon: PhoneCall, label: 'Calls Report' },
    ]},
    { heading: 'Projects', items: [
      { to: '/projects/projects', icon: Briefcase, label: 'Projects' },
      { to: '/projects/tasks', icon: ListChecks, label: 'Tasks' },
      { to: '/projects/timesheet', icon: CalendarDays, label: 'Timesheet' },
      { to: '/projects/team-members', icon: Users, label: 'Team Members' },
    ]},
    { heading: 'Sales', items: [
      { to: '/sales/products', icon: Boxes, label: 'Products' },
      { to: '/sales/orders', icon: ShoppingCart, label: 'Orders' },
      { to: '/sales/invoices', icon: FileText, label: 'Invoices' },
      { to: '/sales/payments', icon: CreditCard, label: 'Payments' },
      { to: '/sales/expenses', icon: Receipt, label: 'Expenses' },
      { to: '/sales/quotations', icon: FileText, label: 'Quotations' },
    ]},
    { heading: 'Applications', items: [
      { to: '/apps/chat', icon: Mail, label: 'Chat' },
      { to: '/apps/calendar', icon: CalendarDays, label: 'Calendar' },
      { to: '/apps/email', icon: Mail, label: 'Email' },
      { to: '/apps/files', icon: FolderClosed, label: 'File Manager' },
      { to: '/apps/notes', icon: StickyNote, label: 'Notes' },
      { to: '/apps/kanban', icon: Kanban, label: 'Kanban' },
    ]},
    { heading: 'HRM', items: [
      { to: '/hrm/employees', icon: Users, label: 'Employees' },
      { to: '/hrm/holidays', icon: CalendarDays, label: 'Holidays' },
      { to: '/hrm/attendance', icon: CalendarDays, label: 'Attendance' },
      { to: '/hrm/leaves', icon: CalendarDays, label: 'Leaves' },
      { to: '/hrm/payroll', icon: DollarSign, label: 'Payroll' },
      { to: '/hrm/departments', icon: Users, label: 'Departments' },
      { to: '/hrm/designations', icon: Users, label: 'Designations' },
    ]},
    { heading: 'Finance & Accounting', items: [
      { to: '/finance/estimates', icon: FileText, label: 'Estimates' },
      { to: '/finance/expenses', icon: Receipt, label: 'Expenses' },
      { to: '/finance/payments', icon: CreditCard, label: 'Payments' },
      { to: '/finance/accounts', icon: Wallet, label: 'Accounts' },
      { to: '/finance/taxes', icon: DollarSign, label: 'Taxes' },
    ]},
    { heading: 'System Settings', items: [
      { to: '/system/general', icon: Settings, label: 'General Settings' },
      { to: '/system/company', icon: Settings, label: 'Company Settings' },
      { to: '/system/localization', icon: Settings, label: 'Localization' },
      { to: '/system/roles', icon: UserCog, label: 'Roles & Permissions' },
      { to: '/system/currency', icon: DollarSign, label: 'Currency' },
      { to: '/system/email', icon: Mail, label: 'Email Settings' },
      { to: '/system/integrations', icon: Cog, label: 'Integrations' },
      { to: '/system/appearance', icon: Settings, label: 'Appearance / Themes' },
      { to: '/system/notifications', icon: Settings, label: 'Notification Settings' },
      { to: '/system/security', icon: Settings, label: 'Security' },
    ]},
    { heading: 'User Management', items: [
      { to: '/users/users', icon: Users, label: 'Users' },
      { to: '/users/admins', icon: Users, label: 'Admins' },
      { to: '/users/roles', icon: UserCog, label: 'Roles' },
      { to: '/users/permissions', icon: UserCog, label: 'Permissions' },
      { to: '/users/login-history', icon: Activity, label: 'Login History' },
    ]},
    { heading: 'Support & Misc', items: [
      { to: '/support/help', icon: Activity, label: 'Help Center' },
      { to: '/support/faq', icon: Activity, label: 'FAQ' },
      { to: '/support/feedback', icon: Activity, label: 'Feedback' },
    ]},
  ]), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    return sections.map(sec => ({
      heading: sec.heading,
      items: sec.items.filter(i => i.label.toLowerCase().includes(q))
    })).filter(sec => sec.items.length > 0)
  }, [query, sections])

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 backdrop-blur-md bg-white/60 dark:bg-white/10 border-r border-white/20 text-slate-900 dark:text-white hidden md:flex flex-col">
      <SidebarLogo />
      <SidebarSearch value={query} onChange={setQuery} />
      <div className="overflow-y-auto">
        {filtered.map((sec) => (
          <SidebarSection key={sec.heading}>
            <SidebarHeading>{sec.heading}</SidebarHeading>
            {sec.items.map((it) => (
              <SidebarItem key={it.to} to={it.to} icon={it.icon}>{it.label}</SidebarItem>
            ))}
          </SidebarSection>
        ))}
      </div>
      <SidebarFooter />
    </aside>
  )
}
