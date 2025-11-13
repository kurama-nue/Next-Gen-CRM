import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'

export default function DealsTable() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get('/leads')
        const data = res.data.data || []
        setRows(data.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,8))
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-slate-900 dark:text-white">Recently Created Deals</div>
        <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300">Last 30 days</div>
      </div>
      {loading ? (
        <div className="p-4 text-slate-500 dark:text-slate-300">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/40 dark:bg-white/5">
              <tr>
                <th className="text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200">Deal Name</th>
                <th className="text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200">Stage</th>
                <th className="text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200">Deal Value</th>
                <th className="text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{r.name}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{r.company || '—'}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{r.value ? `$${r.value}` : '—'}</td>
                  <td className="px-3 py-2"><span className="text-xs px-2 py-1 rounded-full bg-white/20 text-slate-700 dark:text-slate-300">{r.status || 'new'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
