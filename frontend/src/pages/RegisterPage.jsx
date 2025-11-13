import { useState } from 'react';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'sales' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await apiClient.post('/auth/register', form);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>}
          <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <select name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="sales">Sales Executive</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold">Register</button>
        </form>
      </div>
    </div>
  );
}
