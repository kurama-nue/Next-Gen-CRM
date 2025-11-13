import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function LostDeals() {
  const [data, setData] = useState([])

  useEffect(() => {
    const run = async () => {
      const res = await apiClient.get('/dashboard/leads-by-status')
      const d = res.data.data || {}
      const lost = (d.new || 0) + (d.active || 0)
      setData([
        { name: 'Lost', value: lost }
      ])
    }
    run()
  }, [])

  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-slate-900 dark:text-white">Lost Deals Stage</div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
