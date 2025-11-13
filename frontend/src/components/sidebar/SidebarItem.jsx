import { NavLink } from 'react-router-dom'

export default function SidebarItem({ to, icon: Icon, children }) {
  return (
    <NavLink to={to} className={({isActive}) => `flex items-center gap-2 px-6 py-2 text-sm ${isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}>
      {Icon ? <Icon size={18} /> : null}
      {children}
    </NavLink>
  )
}
