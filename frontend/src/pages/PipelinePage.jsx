import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLeadsStart, fetchLeadsSuccess, fetchLeadsFailure, updateLead } from '../redux/slices/leadsSlice'
import apiClient from '../services/apiClient'

const columns = [
  { key: 'new', title: 'New' },
  { key: 'active', title: 'In Progress' },
  { key: 'closed', title: 'Closed' }
]

export default function PipelinePage() {
  const dispatch = useDispatch()
  const { leads, loading } = useSelector((s) => s.leads)

  useEffect(() => {
    const run = async () => {
      dispatch(fetchLeadsStart())
      try {
        const res = await apiClient.get('/leads')
        dispatch(fetchLeadsSuccess(res.data.data || []))
      } catch (e) {
        dispatch(fetchLeadsFailure(e.message))
      }
    }
    run()
  }, [dispatch])

  const grouped = useMemo(() => {
    const g = { new: [], active: [], closed: [] }
    for (const l of leads) {
      const k = (l.status || 'new')
      if (g[k]) g[k].push(l)
      else g.new.push(l)
    }
    return g
  }, [leads])

  const moveStatus = async (lead, next) => {
    try {
      const res = await apiClient.put(`/leads/${lead.id}`, { status: next })
      dispatch(updateLead(res.data.data || { ...lead, status: next }))
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Pipeline</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.key} className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold text-slate-900 dark:text-white">{col.title}</div>
                <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300">{grouped[col.key]?.length || 0}</div>
              </div>
              {loading ? (
                <div className="p-4 text-slate-500 dark:text-slate-300">Loading...</div>
              ) : grouped[col.key]?.length ? (
                <div className="space-y-3">
                  {grouped[col.key].map((lead) => (
                    <div key={lead.id} className="rounded-xl border border-white/30 bg-white/70 dark:bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">{lead.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">{lead.email}</div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">#{lead.id}</div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        {col.key !== 'new' && (
                          <button onClick={() => moveStatus(lead, col.key === 'active' ? 'new' : 'active')} className="px-3 py-1 text-xs rounded-lg bg-white/20 hover:bg-white/30 text-slate-900 dark:text-white">Back</button>
                        )}
                        {col.key !== 'closed' && (
                          <button onClick={() => moveStatus(lead, col.key === 'new' ? 'active' : 'closed')} className="px-3 py-1 text-xs rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white">Advance</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-slate-500 dark:text-slate-300">No items</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}