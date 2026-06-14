import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';
import MonthlyMoneyChart from './MonthlyMoneyChart';
import SpendingPieChart from './SpendingPieChart';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const StatCard = ({ label, value, color, loading }) => (
  <div className="flex flex-col items-center justify-center gap-1 py-5">
    <p className={`text-3xl font-bold ${color}`}>{loading ? '—' : value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const DashboardC = () => {
  const { User } = AuthData();
  const [demands, setDemands] = useState([]);
  const [stats, setStats] = useState({ total: 0, waiting: 0, accepted: 0, complete: 0, incomplete: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/Demand`, {
          headers: { Authorization: `Bearer ${User?.token}` },
        });
        const demands = Array.isArray(res.data) ? res.data : [];
        setDemands(demands);
        setStats({
          total: demands.length,
          waiting: demands.filter(d => d.status === 'Waiting').length,
          accepted: demands.filter(d => d.status === 'Accepted').length,
          complete: demands.filter(d => d.status === 'Complet').length,
          incomplete: demands.filter(d => d.status === 'Incomplet').length,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [User?.token]);

  return (
    <div className="w-full h-full overflow-y-auto bg-secondary px-4 md:px-10 pt-6 pb-6 flex flex-col gap-5 font-poppins">

      {/* Stats overview */}
      <div className="w-full border border-gray-100 rounded-2xl bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 pt-4 pb-2">
          <p className="font-bold text-dblue">Demand Overview</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100 border-t border-gray-100">
          <StatCard label="Total" value={stats.total} color="text-dblue" loading={loading} />
          <StatCard label="Waiting" value={stats.waiting} color="text-orange-500" loading={loading} />
          <StatCard label="Accepted" value={stats.accepted} color="text-green-500" loading={loading} />
          <StatCard label="Complete" value={stats.complete} color="text-pblue" loading={loading} />
          <StatCard label="Incomplete" value={stats.incomplete} color="text-red-500" loading={loading} />
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="border border-gray-100 bg-white rounded-2xl px-6 py-4 md:w-7/12 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-dblue">Monthly Requests</p>
          </div>
          <MonthlyMoneyChart demands={demands} />
        </div>
        <div className="flex flex-col items-center border border-gray-100 bg-white rounded-2xl px-6 py-4 md:w-5/12 shadow-sm">
          <p className="text-lg font-bold text-dblue self-start mb-2">Demands by Category</p>
          <SpendingPieChart demands={demands} />
        </div>
      </div>
    </div>
  );
};

export default DashboardC;
