import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e42', '#ef4444'];

export default function AnalyticsCharts() {
  const [leadsByStatus, setLeadsByStatus] = useState(null);
  const [activitiesByType, setActivitiesByType] = useState(null);
  const [leadsByOwner, setLeadsByOwner] = useState(null);

  useEffect(() => {
    apiClient.get('/dashboard/leads-by-status').then(res => setLeadsByStatus(res.data.data));
    apiClient.get('/dashboard/activities-by-type').then(res => setActivitiesByType(res.data.data));
    apiClient.get('/dashboard/leads-by-owner').then(res => setLeadsByOwner(res.data.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* Leads by Status Pie Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-2">Leads by Status</h3>
        {leadsByStatus ? (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={Object.entries(leadsByStatus).map(([name, value]) => ({ name, value }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {Object.entries(leadsByStatus).map((entry, idx) => <Cell key={entry[0]} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : <p>Loading...</p>}
      </div>
      {/* Activities by Type Bar Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-2">Activities by Type</h3>
        {activitiesByType ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={Object.entries(activitiesByType).map(([name, value]) => ({ name, value }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>Loading...</p>}
      </div>
      {/* Leads by Owner Bar Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-2">Leads by Owner</h3>
        {leadsByOwner ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leadsByOwner}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="owner" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f59e42" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>Loading...</p>}
      </div>
    </div>
  );
}
