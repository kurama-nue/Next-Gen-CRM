import { useState } from 'react'

export default function SidebarDropdown({ icon: Icon, title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="text-white/80">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-2 px-6 py-2 text-left hover:bg-white/10">
        {Icon ? <Icon size={18} /> : null}
        <span className="flex-1">{title}</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pl-4">
          {children}
        </div>
      )}
    </div>
  )
}
