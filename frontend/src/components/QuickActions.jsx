import { useNavigate } from 'react-router-dom'

export default function QuickActions() {
  const navigate = useNavigate()
  return (
    <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-4">
      <div className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigate('/leads')} className="px-4 py-3 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white">Create Lead</button>
        <button onClick={() => navigate('/pipeline')} className="px-4 py-3 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white">Open Pipeline</button>
        <button onClick={() => navigate('/dashboard')} className="px-4 py-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white">View Analytics</button>
        <a href="https://next-gen-crm-backend.onrender.com/health" target="_blank" rel="noreferrer" className="px-4 py-3 rounded-xl bg-gray-600/80 hover:bg-gray-600 text-white text-center">API Health</a>
      </div>
    </div>
  )
}
