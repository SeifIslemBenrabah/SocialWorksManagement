import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UProgrammes = () => {
  const { User } = AuthData();
  const navigate = useNavigate();
  const [programmes, setProgrammes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, catRes] = await Promise.all([
          axios.get(`${API}/Programme`, { headers: { Authorization: `Bearer ${User?.token}` } }),
          axios.get(`${API}/Categorie`, { headers: { Authorization: `Bearer ${User?.token}` } }),
        ]);
        setProgrammes(Array.isArray(progRes.data) ? progRes.data : []);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
      } catch (err) {
        console.error('Failed to fetch programmes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [User?.token]);

  const filtered = programmes.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter ? p.categorieId === Number(catFilter) : true;
    return matchSearch && matchCat && p.status === 'active';
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex flex-row py-4 justify-between pl-6 pr-6 items-center shadow-sm bg-white">
        <div className="text-xl font-bold text-dblue">Programmes</div>
      </div>
      <div className="bg-secondary w-full flex-1 overflow-y-auto px-8 py-6">
        <div className="bg-white rounded-2xl px-7 pt-6 pb-6 flex flex-col gap-5 min-h-full">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <div className="absolute top-2.5 left-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type="search"
                className="py-2 pl-9 pr-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30 w-60"
                placeholder="Search programmes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.CategorieName}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <p className="text-gray-400 text-center py-12">Loading programmes...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No active programmes available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`programme/${p.id}`, { state: p })}
                  className="cursor-pointer border border-blue-100 rounded-xl p-5 bg-white hover:shadow-md hover:border-pblue/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-dblue text-sm leading-snug">{p.title}</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium ml-2 flex-shrink-0">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-3">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {p.Categorie?.CategorieName || 'General'}
                    </span>
                    {p.Pconditions?.length > 0 && (
                      <span className="text-xs text-pblue">{p.Pconditions.length} condition{p.Pconditions.length !== 1 ? 's' : ''}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UProgrammes;
