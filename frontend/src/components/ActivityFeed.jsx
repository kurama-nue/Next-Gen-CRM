import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'

export default function ActivityFeed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get('/activities')
        const list = (res.data.data || []).slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,8)
        setItems(list)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Notifications</div>
      {loading ? (
        <div className="p-4 text-slate-500 dark:text-slate-300">Loading...</div>
      ) : items.length ? (
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.id} className="flex items-start gap-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-blue-600"></div>
              <div>
                <div className="text-sm text-slate-900 dark:text-slate-100">[{it.type}] {it.content || 'Updated'}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{new Date(it.createdAt).toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-slate-500 dark:text-slate-300">No recent activity</div>
      )}
    </div>
  )
}
