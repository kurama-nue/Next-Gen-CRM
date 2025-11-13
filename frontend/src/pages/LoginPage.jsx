import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/slices/authSlice';
import apiClient from '../services/apiClient';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@crmsystem.com');
  const [password, setPassword] = useState('Admin@123456');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-md text-white">
        <div className="text-3xl font-bold text-center mb-8">Next‑Gen CRM</div>
        
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-white/30 bg-white/10 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-white/70 text-sm mt-6">
          Demo credentials available on login form
        </p>
      </div>
    </div>
  );
}
