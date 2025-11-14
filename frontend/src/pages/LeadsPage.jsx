import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeadsSuccess, fetchLeadsStart, fetchLeadsFailure, addLead, deleteLead } from '../redux/slices/leadsSlice';
import apiClient from '../services/apiClient';
import { Plus, Trash2 } from 'lucide-react';

import ActivityTimeline from './ActivityTimeline';

export default function LeadsPage() {
  const dispatch = useDispatch();
  const { leads, loading } = useSelector((state) => state.leads);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' });
  const [editingId, setEditingId] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      dispatch(fetchLeadsStart());
      try {
        const response = await apiClient.get('/leads');
        dispatch(fetchLeadsSuccess(response.data.data || []));
      } catch (error) {
        dispatch(fetchLeadsFailure(error.message));
      }
    };

    fetchLeads();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await apiClient.put(`/leads/${editingId}`, formData);
        dispatch(fetchLeadsStart());
        const refreshed = await apiClient.get('/leads');
        dispatch(fetchLeadsSuccess(refreshed.data.data || []));
        setEditingId(null);
      } else {
        const response = await apiClient.post('/leads', formData);
        dispatch(addLead(response.data.data || formData));
      }
      setFormData({ name: '', email: '', phone: '', company: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/leads/${id}`);
      dispatch(deleteLead(id));
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Leads Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"
          >
            <Plus size={20} />
            New Lead
          </button>
        </div>

        {showForm && (
          <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Create New Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 border border-white/40 bg-white/70 dark:bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-2 border border-white/40 bg-white/70 dark:bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-2 border border-white/40 bg-white/70 dark:bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="px-4 py-2 border border-white/40 bg-white/70 dark:bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-2 rounded-xl shadow"
                >
                  Create Lead
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Leads Table */}
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-center text-slate-500 dark:text-slate-300">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="p-6 text-center text-slate-500 dark:text-slate-300">No leads found. Create one to get started.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-white/40">
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-200 cursor-pointer underline" onClick={() => setSelectedLeadId(lead.id)}>{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-200">{lead.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-200">{lead.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-200">{lead.company || '-'}</td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => { setShowForm(true); setEditingId(lead.id); setFormData({ name: lead.name || '', email: lead.email || '', phone: lead.phone || '', company: lead.company || '' }) }}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-xl"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Activity Timeline for selected lead */}
      {selectedLeadId && <ActivityTimeline leadId={selectedLeadId} />}
    </div>
  );
}
