import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { Settings, LogOut } from 'lucide-react'

export default function SidebarFooter() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogout = () => { dispatch(logout()); navigate('/login') }
  return (
    <div className="mt-auto px-6 py-4 border-t border-white/20 text-white/80 space-x-2">
      <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"><Settings size={18}/>Settings</button>
      <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-red-200"><LogOut size={18}/>Logout</button>
    </div>
  )
}
