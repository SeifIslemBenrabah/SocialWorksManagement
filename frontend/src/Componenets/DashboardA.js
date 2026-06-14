import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const StatCard = ({ label, value, sub, color, icon, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl py-2 px-3 border border-gray-100 shadow-sm flex items-center gap-3 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-dblue">{value ?? '—'}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const STATUS_COLORS = {
  Waiting: 'bg-orange-100 text-orange-700',
  Accepted: 'bg-green-100 text-green-700',
  Complet: 'bg-blue-100 text-blue-700',
  Incomplet: 'bg-red-100 text-red-700',
};

const DashboardA = () => {
  const { User } = AuthData();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [empRes, comRes, demRes] = await Promise.all([
          axios.get(`${API}/users/employes`, { headers: { Authorization: `Bearer ${User?.token}` } }),
          axios.get(`${API}/users/commite`, { headers: { Authorization: `Bearer ${User?.token}` } }),
          axios.get(`${API}/Demand`, { headers: { Authorization: `Bearer ${User?.token}` } }),
        ]);
        setEmployees(Array.isArray(empRes.data) ? empRes.data : []);
        setCommittee(Array.isArray(comRes.data) ? comRes.data : []);
        setDemands(Array.isArray(demRes.data) ? demRes.data : []);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [User?.token]);

  const waiting = demands.filter(d => d.status === 'Waiting').length;
  const accepted = demands.filter(d => d.status === 'Accepted').length;
  const complet = demands.filter(d => d.status === 'Complet').length;
  const incomplet = demands.filter(d => d.status === 'Incomplet').length;

  const recentEmployees = employees.slice(0, 5);
  const recentDemands = demands.slice(0, 6);

  return (
    <div className="w-full h-full overflow-y-auto bg-secondary px-6 py-6 flex flex-col gap-2 font-poppins">

      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-dblue">Welcome back, {User?.fullName}!</h1>
        <p className="text-sm text-gray-500">Here's an overview of the platform.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
        <StatCard
          label="Employees"
          value={loading ? null : employees.length}
          sub="Registered employees"
          color="bg-blue-100"
          onClick={() => navigate('employees')}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#3b82f6" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          }
        />
        <StatCard
          label="Committee Members"
          value={loading ? null : committee.length}
          sub="Active committee"
          color="bg-purple-100"
          onClick={() => navigate('committees')}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7c3aed" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          }
        />
        <StatCard
          label="Total Demands"
          value={loading ? null : demands.length}
          sub={`${waiting} waiting review`}
          color="bg-orange-100"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f97316" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          }
        />
        <StatCard
          label="Completed Demands"
          value={loading ? null : complet}
          sub={`${accepted} accepted, ${incomplet} incomplete`}
          color="bg-green-100"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#16a34a" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
        />
      </div>

      {/* Demand status breakdown */}
      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
        <p className="font-bold text-dblue mb-2">Demand Status Breakdown</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Waiting', count: waiting, color: 'border-orange-300 bg-orange-50 text-orange-700' },
            { label: 'Accepted', count: accepted, color: 'border-green-300 bg-green-50 text-green-700' },
            { label: 'Complet', count: complet, color: 'border-blue-300 bg-blue-50 text-blue-700' },
            { label: 'Incomplet', count: incomplet, color: 'border-red-300 bg-red-50 text-red-700' },
          ].map(s => (
            <div key={s.label} className={`border rounded-xl p-1 text-center ${s.color}`}>
              <p className="text-2xl font-bold">{loading ? '—' : s.count}</p>
              <p className="text-sm font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Recent employees */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-dblue">Recent Employees</p>
            <button onClick={() => navigate('employees')} className="text-pblue text-xs hover:underline">View all</button>
          </div>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : recentEmployees.length === 0 ? (
            <p className="text-gray-400 text-sm">No employees yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentEmployees.map(e => (
                <div key={e.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pblue font-bold text-sm flex-shrink-0">
                    {e.User?.fullName?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{e.User?.fullName}</p>
                    <p className="text-xs text-gray-400 truncate">{e.User?.email}</p>
                  </div>
                  <span className="text-xs bg-blue-50 text-pblue px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    Employee
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent demands */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-dblue">Recent Demands</p>
          </div>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : recentDemands.length === 0 ? (
            <p className="text-gray-400 text-sm">No demands yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentDemands.map(d => (
                <div key={d.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{d.User?.fullName || '—'}</p>
                    <p className="text-xs text-gray-400 truncate">{d.Programme?.title || '—'}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_COLORS[d.status] || 'bg-gray-100 text-gray-500'}`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p className="font-bold text-dblue mb-4">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('employees')}
            className="flex items-center gap-2 bg-dblue text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-pblue transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Employee
          </button>
          <button
            onClick={() => navigate('committees')}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Committee Member
          </button>
          <button
            onClick={() => navigate('employees')}
            className="flex items-center gap-2 border border-dblue text-dblue px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Import CSV / Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardA;
