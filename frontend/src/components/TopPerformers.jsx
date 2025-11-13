import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'

export default function TopPerformers() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get('/dashboard/leads-by-owner')
        const data = res.data.data || []
        setItems(data.slice().sort((a,b)=>b.count-a.count).slice(0,5))
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Top Performers</div>
      {loading ? (
        <div className="p-4 text-slate-500 dark:text-slate-300">Loading...</div>
      ) : items.length ? (
        <ul className="space-y-2">
          {items.map((it, idx) => (
            <li key={it.owner} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/40 dark:bg-white/5 flex items-center justify-center text-xs">{idx+1}</div>
                <div className="text-sm text-slate-900 dark:text-slate-100">{it.owner}</div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">{it.count} leads</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-slate-500 dark:text-slate-300">No data</div>
      )}
    </div>
  )
}
