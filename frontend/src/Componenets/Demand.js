import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const STATUS_COLORS = {
  Waiting: 'bg-orange-100 text-orange-700',
  Accepted: 'bg-green-100 text-green-700',
  Complet: 'bg-blue-100 text-blue-700',
  Incomplet: 'bg-red-100 text-red-700',
};

const STATUSES = ['Waiting', 'Accepted', 'Complet', 'Incomplet'];

const Demand = () => {
  const { User } = AuthData();
  const [demands, setDemands] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        const res = await axios.get(`${API}/Demand`, {
          headers: { Authorization: `Bearer ${User?.token}` },
        });
        setDemands(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch demands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDemands();
  }, [User?.token]);

  const updateStatus = async (id, status) => {
    setUpdating(true);
    try {
      await axios.put(`${API}/Demand/${id}`, { status }, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      setDemands(prev => prev.map(d => d.id === id ? { ...d, status } : d));
      setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const filtered = demands.filter(d => {
    const name = d.User?.fullName?.toLowerCase() || '';
    const title = d.Programme?.title?.toLowerCase() || '';
    const matchSearch = name.includes(search.toLowerCase()) || title.includes(search.toLowerCase());
    const matchFilter = filter === 'All' || d.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex flex-row py-4 pl-6 pr-6 items-center shadow-sm bg-white">
        <div className="text-xl font-bold text-dblue">Demands</div>
      </div>
      <div className="bg-secondary w-full flex-1 overflow-hidden flex gap-4 px-6 py-6">

        {/* List panel */}
        <div className={`bg-white rounded-2xl flex flex-col gap-3 p-5 overflow-hidden transition-all ${selected ? 'w-1/2' : 'w-full'}`}>
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-3 justify-between">
            <div className="relative">
              <div className="absolute top-2.5 left-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="py-2 pl-9 pr-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
                placeholder="Search by employee or programme..."
              />
            </div>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden text-sm">
              {['All', ...STATUSES].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-2 font-medium transition-colors ${filter === s ? 'bg-dblue text-white' : 'bg-white text-dblue hover:bg-blue-50'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Header row */}
          <div className="flex flex-row py-2 px-4 bg-pblue/10 rounded-xl text-sm font-medium text-dblue">
            <p className="w-3/12">Employee</p>
            <p className="w-3/12">Programme</p>
            <p className="w-2/12">Date</p>
            <p className="w-3/12">Status</p>
            <p className="w-1/12"></p>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-1 overflow-y-auto flex-1">
            {loading ? (
              <p className="text-gray-400 text-center py-10">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-400 text-center py-10">No demands found.</p>
            ) : filtered.map(d => (
              <div
                key={d.id}
                onClick={() => setSelected(selected?.id === d.id ? null : d)}
                className={`flex flex-row items-center py-3 px-4 rounded-xl cursor-pointer transition-colors ${selected?.id === d.id ? 'bg-blue-50 border border-pblue/20' : 'hover:bg-gray-50 border border-transparent'}`}
              >
                <p className="w-3/12 text-sm font-medium text-gray-700 truncate">{d.User?.fullName || '—'}</p>
                <p className="w-3/12 text-sm text-gray-500 truncate">{d.Programme?.title || '—'}</p>
                <p className="w-2/12 text-sm text-gray-400">{new Date(d.createdAt).toLocaleDateString()}</p>
                <span className={`w-3/12 text-xs font-semibold px-2 py-1 rounded-full inline-block ${STATUS_COLORS[d.status] || 'bg-gray-100 text-gray-500'}`}>
                  {d.status || '—'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-300 w-1/12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-1/2 bg-white rounded-2xl p-6 flex flex-col gap-4 overflow-y-auto">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-dblue">{selected.Programme?.title || 'Demand Detail'}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-500 w-28">Employee:</span>
                <span className="text-gray-700">{selected.User?.fullName || '—'}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-500 w-28">Email:</span>
                <span className="text-gray-600">{selected.User?.email || '—'}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-500 w-28">Submitted:</span>
                <span className="text-gray-600">{new Date(selected.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-gray-500 w-28">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[selected.status] || 'bg-gray-100'}`}>
                  {selected.status}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100" />
            <p className="text-sm font-semibold text-dblue">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map(s => (
                <button
                  key={s}
                  disabled={updating || selected.status === s}
                  onClick={() => updateStatus(selected.id, s)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selected.status === s
                      ? 'bg-dblue text-white cursor-default'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Demand;
