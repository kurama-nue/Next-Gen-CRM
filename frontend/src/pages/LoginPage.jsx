import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/slices/authSlice';
import apiClient from '../services/apiClient';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@crmsystem.com');
  const [password, setPassword] = useState('Admin@123456');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      dispatch(loginSuccess({ token, user }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700" />
      <div className="absolute -z-10 blur-3xl opacity-60 w-96 h-96 rounded-full bg-indigo-400/40 top-10 left-10" />
      <div className="absolute -z-10 blur-3xl opacity-60 w-96 h-96 rounded-full bg-purple-400/40 bottom-10 right-10" />
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-md text-white shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-white text-xl font-bold">NC</div>
        </div>
        <div className="text-3xl font-bold text-center mb-2">Next‑Gen CRM</div>
        <div className="text-center text-white/70 mb-8">Sign in to continue</div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-600/20 border border-red-400 text-red-100 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-white/30 bg-white/10 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <input
              type={show ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-white/30 bg-white/10 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-white/80 text-sm">
                <input type="checkbox" checked={show} onChange={(e)=>setShow(e.target.checked)} />
                Show password
              </label>
              <a href="#" className="text-sm text-white/80 hover:text-white">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-white/80 text-sm">Demo: admin@crmsystem.com / Admin@123456</div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30">Google</button>
          <button className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30">GitHub</button>
        </div>
      </div>
    </div>
  );
}
