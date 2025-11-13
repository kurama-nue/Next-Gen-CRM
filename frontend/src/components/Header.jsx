import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { LogOut, Sun, Moon, LayoutGrid, Users, GitBranch } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enableDark = saved ? saved === 'dark' : prefersDark;
    if (enableDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      setDark(false);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">CRM</div>
            <div>
              <div className="text-xl font-bold">Next‑Gen CRM</div>
              <div className="text-white/70 text-sm">{user?.name || 'User'}{user?.role ? ` · ${user.role}` : ''}</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
              <LayoutGrid size={18} />
              Dashboard
            </button>
            <button onClick={() => navigate('/leads')} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
              <Users size={18} />
              Leads
            </button>
            <button onClick={() => navigate('/pipeline')} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
              <GitBranch size={18} />
              Pipeline
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={toggleDark} className="px-3 py-2 rounded-lg hover:bg-white/10">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
