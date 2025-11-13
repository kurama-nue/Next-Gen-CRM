import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'

export default function RecentLeadsWidget() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get('/leads')
        const data = res.data.data || []
        setItems(data.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6))
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Recent Leads</div>
      {loading ? (
        <div className="p-4 text-slate-500 dark:text-slate-300">Loading...</div>
      ) : items.length ? (
        <ul className="space-y-2">
          {items.map((l) => (
            <li key={l.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-900 dark:text-slate-100">{l.name}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{l.email}</div>
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-white/20 text-slate-700 dark:text-slate-300">{l.status}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-slate-500 dark:text-slate-300">No recent leads</div>
      )}
    </div>
  )
}
