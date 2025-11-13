import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DealsByStage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get('/dashboard/leads-by-status')
        const d = res.data.data || {}
        setData([
          { name: 'New', value: d.new || 0 },
          { name: 'In Progress', value: d.active || 0 },
          { name: 'Closed', value: d.closed || 0 }
        ])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-slate-900 dark:text-white">Deals By Stage</div>
        <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300">Last 30 days</div>
      </div>
      {loading ? (
        <div className="p-4 text-slate-500 dark:text-slate-300">Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
