import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function DealsByYear() {
  const [data, setData] = useState([])

  useEffect(() => {
    const run = async () => {
      const res = await apiClient.get('/leads')
      const list = res.data.data || []
      const map = new Map()
      for (const l of list) {
        const dt = new Date(l.createdAt)
        const key = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`
        map.set(key, (map.get(key)||0)+1)
      }
      const sorted = Array.from(map.entries()).sort((a,b)=>a[0].localeCompare(b[0])).map(([k,v])=>({ name:k, value:v }))
      setData(sorted)
    }
    run()
  }, [])

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-slate-900 dark:text-white">Deals by Year</div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
