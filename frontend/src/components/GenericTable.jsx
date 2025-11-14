import { useState } from 'react'

export default function GenericTable({ title, columns = [], rows = [], actions = false, onEdit, onDelete, onCreate }) {
  const [q, setQ] = useState('')
  const visible = rows.filter(r => q.trim() ? Object.values(r).some(v => String(v||'').toLowerCase().includes(q.trim().toLowerCase())) : true)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
          <div className="flex items-center gap-2">
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search" className="px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-white/30 text-slate-900 dark:text-white" />
            {onCreate && (<button onClick={onCreate} className="px-4 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white">New</button>)}
          </div>
        </div>
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/40 dark:bg-white/5">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200">{c.label}</th>
                  ))}
                  {actions && (<th className="text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200">Actions</th>)}
                </tr>
              </thead>
              <tbody>
                {visible.map((r, idx) => (
                  <tr key={idx} className="border-t">
                    {columns.map((c) => (
                      <td key={c.key} className="px-3 py-2 text-slate-900 dark:text-slate-100">{r[c.key]}</td>
                    ))}
                    {actions && (
                      <td className="px-3 py-2 space-x-2">
                        {onEdit && (<button onClick={()=>onEdit(r, idx)} className="px-3 py-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white">Edit</button>)}
                        {onDelete && (<button onClick={()=>onDelete(r, idx)} className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white">Delete</button>)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visible.length === 0 && (
            <div className="p-4 text-slate-500 dark:text-slate-300">No data</div>
          )}
        </div>
      </div>
    </div>
  )
}
