import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';
import * as XLSX from 'xlsx';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const EMPLOYEE_ROLE_ID = 2;

const CSV_TEMPLATE = 'fullName,email,password\nAhmed Benali,ahmed@esi.dz,Pass@1234\nSara Meziane,sara@esi.dz,Pass@1234';

const parseFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file.name.endsWith('.csv')) {
      reader.onload = e => {
        const lines = e.target.result.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const rows = lines.slice(1).map(line => {
          const vals = line.split(',').map(v => v.trim().replace(/"/g, ''));
          return headers.reduce((obj, h, i) => ({ ...obj, [h]: vals[i] || '' }), {});
        }).filter(r => r.fullName || r.email);
        resolve(rows);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    } else {
      reader.onload = e => {
        const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
        resolve(rows.filter(r => r.fullName || r.email));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    }
  });

const downloadTemplate = () => {
  const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'employees_template.csv'; a.click();
  URL.revokeObjectURL(url);
};

const EmployeList = () => {
  const { User } = AuthData();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Create popup state
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ fullName: '', email: '', password: '' });
  const [createError, setCreateError] = useState('');
  const [creating, setCreating] = useState(false);

  // Import popup state
  const [showImport, setShowImport] = useState(false);
  const [importRows, setImportRows] = useState([]);
  const [importError, setImportError] = useState('');
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');

  // View detail state
  const [viewUser, setViewUser] = useState(null);

  // Edit state
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', email: '' });
  const [editError, setEditError] = useState('');
  const [editing, setEditing] = useState(false);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/users/employes`, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  }, [User?.token]);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  const filtered = employees.filter(e =>
    e.User?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    e.User?.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Create user ──
  const handleCreate = async e => {
    e.preventDefault();
    setCreateError('');
    setCreating(true);
    try {
      await axios.post(`${API}/users`, { ...createForm, roleId: EMPLOYEE_ROLE_ID }, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      setCreateForm({ fullName: '', email: '', password: '' });
      setShowCreate(false);
      fetchEmployees();
    } catch (err) {
      setCreateError(err.response?.data?.error || 'Failed to create user.');
    } finally {
      setCreating(false);
    }
  };

  // ── Import file ──
  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setImportError('');
    setImportRows([]);
    try {
      const rows = await parseFile(file);
      if (rows.length === 0) { setImportError('No valid rows found. Check the format.'); return; }
      setImportRows(rows);
    } catch {
      setImportError('Failed to parse file. Use CSV or XLSX format.');
    }
    e.target.value = '';
  };

  const handleImport = async () => {
    setImporting(true);
    setImportError('');
    let success = 0, failed = 0;
    for (let i = 0; i < importRows.length; i++) {
      const row = importRows[i];
      setImportProgress(`Importing ${i + 1} of ${importRows.length}...`);
      try {
        await axios.post(`${API}/users`, {
          fullName: row.fullName || row['Full Name'] || '',
          email: row.email || row['Email'] || '',
          password: row.password || row['Password'] || 'Pass@1234',
          roleId: EMPLOYEE_ROLE_ID,
        }, { headers: { Authorization: `Bearer ${User?.token}` } });
        success++;
      } catch {
        failed++;
      }
    }
    setImportProgress(`Done: ${success} imported, ${failed} failed.`);
    setImporting(false);
    setImportRows([]);
    await fetchEmployees();
  };

  // ── Edit user ──
  const openEdit = emp => {
    setEditUser(emp);
    setEditForm({ fullName: emp.User?.fullName || '', email: emp.User?.email || '' });
    setEditError('');
  };

  const handleEdit = async e => {
    e.preventDefault();
    setEditError('');
    setEditing(true);
    try {
      await axios.put(`${API}/users/${editUser.User?.id}`, editForm, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      setEditUser(null);
      fetchEmployees();
    } catch (err) {
      setEditError(err.response?.data?.error || 'Failed to update user.');
    } finally {
      setEditing(false);
    }
  };

  // ── Delete account ──
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API}/users/${deleteTarget.id}`, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      setDeleteTarget(null);
      fetchEmployees();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(false);
    }
  };

  const Avatar = ({ name }) => (
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pblue font-bold text-sm flex-shrink-0">
      {name?.[0]?.toUpperCase() || '?'}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full">
      {/* Page header */}
      <div className="w-full flex flex-row py-4 justify-between pl-6 pr-6 items-center shadow-sm bg-white">
        <div className="text-xl font-bold text-dblue">Employees</div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowImport(true); setImportRows([]); setImportError(''); setImportProgress(''); }}
            className="flex items-center gap-1.5 px-4 py-2 border-2 border-dblue text-dblue rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Import CSV / XL
          </button>
          <button
            onClick={() => { setShowCreate(true); setCreateError(''); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-dblue text-white rounded-lg text-sm font-medium hover:bg-pblue transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Employee
          </button>
        </div>
      </div>

      <div className="bg-secondary w-full flex-1 overflow-y-auto px-6 py-6">
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
          {/* Search */}
          <div className="relative w-72">
            <div className="absolute top-2.5 left-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full py-2 pl-9 pr-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
              placeholder="Search by name or email..."
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pblue/10 text-dblue text-left">
                  <th className="px-4 py-3 rounded-l-xl font-semibold w-8">#</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 rounded-r-xl font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-10 text-gray-400">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-10 text-gray-400">No employees found.</td></tr>
                ) : filtered.map((emp, i) => (
                  <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={emp.User?.fullName} />
                        <span className="font-medium text-gray-700">{emp.User?.fullName || '—'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{emp.User?.email || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-pblue text-xs px-2 py-0.5 rounded-full font-medium">
                        {emp.UserRole?.roleName || 'Employee'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {/* View */}
                        <button
                          onClick={() => setViewUser(emp)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
                          title="View details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => openEdit(emp)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors"
                          title="Edit user"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(emp)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete user"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">{filtered.length} employee{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      {/* ── Create Employee Modal ── */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-md mx-4 rounded-2xl p-6 flex flex-col gap-4 relative">
            <button onClick={() => setShowCreate(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-lg font-bold text-dblue">Create Employee</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              {[
                { label: 'Full Name', key: 'fullName', type: 'text', placeholder: 'e.g. Ahmed Benali' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'user@esi-sba.dz' },
                { label: 'Password', key: 'password', type: 'password', placeholder: 'Min. 8 characters' },
              ].map(f => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">{f.label}</label>
                  <input
                    type={f.type}
                    value={createForm[f.key]}
                    onChange={e => setCreateForm({ ...createForm, [f.key]: e.target.value })}
                    required
                    placeholder={f.placeholder}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
                  />
                </div>
              ))}
              {createError && <p className="text-red-500 text-sm">{createError}</p>}
              <button type="submit" disabled={creating} className="bg-pblue hover:bg-dblue text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60 mt-1">
                {creating ? 'Creating...' : 'Create Employee'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Import CSV/XL Modal ── */}
      {showImport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-xl mx-4 rounded-2xl p-6 flex flex-col gap-4 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowImport(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-lg font-bold text-dblue">Import Employees</h2>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-dblue flex flex-col gap-1">
              <p className="font-semibold">Required columns:</p>
              <code className="text-xs bg-white rounded px-2 py-1 font-mono">fullName, email, password</code>
              <button onClick={downloadTemplate} className="text-pblue text-xs hover:underline text-left mt-1 font-medium">
                ↓ Download CSV template
              </button>
            </div>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-pblue mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm text-gray-500">Click to upload CSV or XLSX file</p>
              <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileChange} />
            </label>
            {importError && <p className="text-red-500 text-sm">{importError}</p>}
            {importRows.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-dblue">{importRows.length} user{importRows.length !== 1 ? 's' : ''} found — preview:</p>
                <div className="border border-gray-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-gray-500 font-semibold">Name</th>
                        <th className="px-3 py-2 text-left text-gray-500 font-semibold">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importRows.map((r, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-3 py-2 text-gray-700">{r.fullName || r['Full Name'] || '—'}</td>
                          <td className="px-3 py-2 text-gray-500">{r.email || r['Email'] || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {importProgress && <p className="text-sm text-gray-500">{importProgress}</p>}
                <button
                  onClick={handleImport}
                  disabled={importing}
                  className="bg-pblue hover:bg-dblue text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60"
                >
                  {importing ? importProgress : `Import ${importRows.length} Employee${importRows.length !== 1 ? 's' : ''}`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── View Detail Modal ── */}
      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-sm mx-4 rounded-2xl p-6 flex flex-col gap-4 relative">
            <button onClick={() => setViewUser(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-pblue font-bold text-2xl">
                {viewUser.User?.fullName?.[0]?.toUpperCase() || '?'}
              </div>
              <h2 className="text-lg font-bold text-dblue">{viewUser.User?.fullName}</h2>
              <span className="bg-blue-50 text-pblue text-xs px-3 py-1 rounded-full font-medium">{viewUser.UserRole?.roleName || 'Employee'}</span>
            </div>
            <div className="flex flex-col gap-2 text-sm bg-gray-50 rounded-xl p-4">
              <div className="flex gap-2"><span className="font-semibold text-gray-500 w-20">Email:</span><span className="text-gray-700">{viewUser.User?.email}</span></div>
              <div className="flex gap-2"><span className="font-semibold text-gray-500 w-20">Account ID:</span><span className="text-gray-700">{viewUser.id}</span></div>
              <div className="flex gap-2"><span className="font-semibold text-gray-500 w-20">User ID:</span><span className="text-gray-700">{viewUser.User?.id}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-md mx-4 rounded-2xl p-6 flex flex-col gap-4 relative">
            <button onClick={() => setEditUser(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-lg font-bold text-dblue">Edit Employee</h2>
            <form onSubmit={handleEdit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <input type="text" value={editForm.fullName} onChange={e => setEditForm({ ...editForm, fullName: e.target.value })} required className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} required className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30" />
              </div>
              {editError && <p className="text-red-500 text-sm">{editError}</p>}
              <button type="submit" disabled={editing} className="bg-pblue hover:bg-dblue text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60">
                {editing ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-sm mx-4 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-dblue">Delete Employee</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong>{deleteTarget.User?.fullName}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold disabled:opacity-60 transition-colors">
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeList;
