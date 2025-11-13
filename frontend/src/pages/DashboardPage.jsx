import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeadsSuccess, fetchLeadsStart, fetchLeadsFailure } from '../redux/slices/leadsSlice';
import apiClient from '../services/apiClient';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DealsTable from '../components/DealsTable';
import DealsByStage from '../components/DealsByStage';
import WonDeals from '../components/WonDeals';
import LostDeals from '../components/LostDeals';
import DealsByYear from '../components/DealsByYear';
import AnalyticsCharts from './AnalyticsCharts';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { leads, loading } = useSelector((state) => state.leads);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchLeadsStart());
      try {
        const response = await apiClient.get('/dashboard/stats');
        setStats(response.data.data);
        dispatch(fetchLeadsSuccess([]));
      } catch (error) {
        dispatch(fetchLeadsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const chartData = [
    { name: 'Total Leads', value: stats?.totalLeads || 0 },
    { name: 'Active Leads', value: stats?.activeLeads || 0 },
    { name: 'Closed Deals', value: stats?.closedDeals || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-6">
            <h3 className="text-slate-500 dark:text-slate-300 text-sm font-medium">Total Leads</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalLeads || 0}</p>
          </div>
          <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-6">
            <h3 className="text-slate-500 dark:text-slate-300 text-sm font-medium">Active Leads</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.activeLeads || 0}</p>
          </div>
          <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-6">
            <h3 className="text-slate-500 dark:text-slate-300 text-sm font-medium">Closed Deals</h3>
            <p className="text-3xl font-bold text-orange-600">{stats?.closedDeals || 0}</p>
          </div>
          <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-6">
            <h3 className="text-slate-500 dark:text-slate-300 text-sm font-medium">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">${stats?.revenue || 0}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Performance Overview</h2>
          {loading ? (
            <p className="text-center text-slate-500 dark:text-slate-300">Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        {/* Advanced Analytics */}
        <AnalyticsCharts />

        {/* Deals widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <DealsTable />
          <DealsByStage />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <LostDeals />
          <WonDeals />
        </div>
        <div className="mt-8">
          <DealsByYear />
        </div>
      </div>
    </div>
  );
}
