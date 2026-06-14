import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Programmes = () => {
  const { User } = AuthData();
  const [programmes, setProgrammes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [popupProg, setPopupProg] = useState(false);
  const [popupCat, setPopupCat] = useState(false);
  const [catName, setCatName] = useState('');
  const [progForm, setProgForm] = useState({
    title: '', description: '', categorieId: '', status: 'active', conditions: [''],
  });

  const fetchAll = useCallback(async () => {
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
  }, [User?.token]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const saveProgramme = async () => {
    if (!progForm.title || !progForm.categorieId) return;
    setSaving(true);
    try {
      await axios.post(`${API}/Programme`, {
        title: progForm.title,
        description: progForm.description,
        categorieId: progForm.categorieId,
        status: progForm.status,
        conditions: progForm.conditions.filter(c => c.trim()),
      }, { headers: { Authorization: `Bearer ${User?.token}` } });
      await fetchAll();
      setProgForm({ title: '', description: '', categorieId: '', status: 'active', conditions: [''] });
      setPopupProg(false);
    } catch (err) {
      console.error('Failed to save programme:', err);
    } finally {
      setSaving(false);
    }
  };

  const saveCategory = async () => {
    if (!catName.trim()) return;
    setSaving(true);
    try {
      await axios.post(`${API}/Categorie`, { CategorieName: catName }, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      await fetchAll();
      setCatName('');
      setPopupCat(false);
    } catch (err) {
      console.error('Failed to save category:', err);
    } finally {
      setSaving(false);
    }
  };

  const filtered = programmes.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter ? p.categorieId === Number(catFilter) : true;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter.toLowerCase();
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex flex-row py-4 pl-6 pr-6 items-center shadow-sm bg-white">
        <div className="text-xl font-bold text-dblue">Programmes</div>
      </div>
      <div className="bg-secondary w-full flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex gap-3 flex-wrap items-center">
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
                placeholder="Search..."
                className="py-2 pl-9 pr-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
              />
            </div>
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.CategorieName}</option>)}
            </select>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden text-sm">
              {['All', 'Active', 'Expired'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 font-medium transition-colors ${statusFilter === s ? 'bg-dblue text-white' : 'bg-white text-dblue hover:bg-blue-50'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPopupCat(true)}
              className="flex items-center gap-1 py-2 px-4 border-2 border-dblue text-dblue rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Category
            </button>
            <button
              onClick={() => setPopupProg(true)}
              className="flex items-center gap-1 py-2 px-4 bg-dblue text-white rounded-lg text-sm font-medium hover:bg-pblue transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Programme
            </button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No programmes found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-5 border border-blue-50 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-dblue text-sm">{p.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 flex-shrink-0 ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{p.description}</p>
                <p className="text-xs text-gray-400 bg-gray-50 inline-block px-2 py-0.5 rounded-full">
                  {p.Categorie?.CategorieName || 'No category'}
                </p>
                {p.Pconditions?.length > 0 && (
                  <ul className="mt-2 text-xs text-gray-500 list-disc list-inside space-y-0.5">
                    {p.Pconditions.slice(0, 2).map((c, i) => <li key={i}>{c.Condition}</li>)}
                    {p.Pconditions.length > 2 && <li className="text-pblue">+{p.Pconditions.length - 2} more...</li>}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Programme Modal */}
      {popupProg && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-md mx-4 rounded-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setPopupProg(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-dblue">Add Programme</h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Title</label>
              <input
                value={progForm.title}
                onChange={e => setProgForm({ ...progForm, title: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
                placeholder="e.g. Housing Loan"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Category</label>
              <select
                value={progForm.categorieId}
                onChange={e => setProgForm({ ...progForm, categorieId: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.CategorieName}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="flex gap-2">
                {['active', 'expired'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setProgForm({ ...progForm, status: s })}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize ${progForm.status === s ? 'bg-dblue text-white border-dblue' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Description</label>
              <textarea
                value={progForm.description}
                onChange={e => setProgForm({ ...progForm, description: e.target.value })}
                rows={3}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
                placeholder="Describe the programme..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Conditions</label>
              {progForm.conditions.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={c}
                    onChange={e => {
                      const conds = [...progForm.conditions];
                      conds[i] = e.target.value;
                      setProgForm({ ...progForm, conditions: conds });
                    }}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                    placeholder={`Condition ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => setProgForm({ ...progForm, conditions: progForm.conditions.filter((_, j) => j !== i) })}
                    className="text-red-400 hover:text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setProgForm({ ...progForm, conditions: [...progForm.conditions, ''] })}
                className="text-pblue text-sm font-medium hover:underline text-left"
              >
                + Add condition
              </button>
            </div>

            <button
              onClick={saveProgramme}
              disabled={saving || !progForm.title || !progForm.categorieId}
              className="bg-pblue hover:bg-dblue text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60 mt-1"
            >
              {saving ? 'Saving...' : 'Save Programme'}
            </button>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {popupCat && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-sm mx-4 rounded-2xl p-6 flex flex-col gap-4 relative">
            <button onClick={() => setPopupCat(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-dblue">Add Category</h2>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Category Name</label>
              <input
                value={catName}
                onChange={e => setCatName(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
                placeholder="e.g. Loans, Grants, Social..."
              />
            </div>
            <p className="text-xs text-gray-400">Existing: {categories.map(c => c.CategorieName).join(', ') || 'None'}</p>
            <button
              onClick={saveCategory}
              disabled={saving || !catName.trim()}
              className="bg-pblue hover:bg-dblue text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programmes;
