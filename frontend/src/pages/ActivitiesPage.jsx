import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from '../services/apiClient'

const types = ['note', 'call', 'meeting', 'status_change']

export default function ActivitiesPage() {
  const { user } = useSelector(s => s.auth)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ id: null, type: 'note', content: '', leadId: '' })

  const canDelete = user?.role === 'admin' || user?.role === 'manager'
  const canEdit = true

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await apiClient.get('/activities')
        setItems(res.data.data || [])
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(i => (i.type || '').toLowerCase().includes(q) || (i.content || '').toLowerCase().includes(q) || String(i.leadId || '').includes(q))
  }, [query, items])

  const openNew = () => {
    setForm({ id: null, type: 'note', content: '', leadId: '' })
    setModalOpen(true)
  }
  const openEdit = (it) => {
    setForm({ id: it.id, type: it.type || 'note', content: it.content || '', leadId: it.leadId || '' })
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
    setForm({ id: null, type: 'note', content: '', leadId: '' })
  }
  const save = async () => {
    if (!form.type || !form.leadId) return
    if (form.id) {
      const res = await apiClient.put(`/activities/${form.id}`, { type: form.type, content: form.content })
      setItems(prev => prev.map(x => x.id === form.id ? res.data.data : x))
    } else {
      const res = await apiClient.post('/activities', { type: form.type, content: form.content, leadId: form.leadId })
      setItems(prev => [res.data.data, ...prev])
    }
    closeModal()
  }
  const remove = async (id) => {
    await apiClient.delete(`/activities/${id}`)
    setItems(prev => prev.filter(x => x.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">Activities</div>
        <div className="flex items-center gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search" className="px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-white/30 text-slate-900 dark:text-white" />
          <button onClick={openNew} className="px-4 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white">New</button>
        </div>
      </div>

      {loading ? (
        <div className="p-4 text-slate-500 dark:text-slate-300">Loading...</div>
      ) : error ? (
        <div className="p-4 text-red-600">{error}</div>
      ) : (
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it.id} className="border-t border-white/20">
                  <td className="px-4 py-3">{it.type}</td>
                  <td className="px-4 py-3">{it.content}</td>
                  <td className="px-4 py-3">{it.leadId}</td>
                  <td className="px-4 py-3">{it.userId}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{new Date(it.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 space-x-2">
                    {canEdit && (<button onClick={()=>openEdit(it)} className="px-3 py-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white">Edit</button>)}
                    {canDelete && (<button onClick={()=>remove(it.id)} className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white">Delete</button>)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan="6">No activities</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-full max-w-md backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
            <div className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{form.id ? 'Edit Activity' : 'New Activity'}</div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Type</label>
                <select value={form.type} onChange={(e)=>setForm(prev=>({ ...prev, type: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-white/30">
                  {types.map(t => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
              {!form.id && (
                <div>
                  <label className="block text-sm mb-1">Lead ID</label>
                  <input value={form.leadId} onChange={(e)=>setForm(prev=>({ ...prev, leadId: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-white/30" placeholder="e.g., 1" />
                </div>
              )}
              <div>
                <label className="block text-sm mb-1">Content</label>
                <textarea value={form.content} onChange={(e)=>setForm(prev=>({ ...prev, content: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-white/30" rows="3" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button onClick={closeModal} className="px-4 py-2 rounded-xl bg-gray-600/80 hover:bg-gray-600 text-white">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
