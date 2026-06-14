import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Meeting = () => {
  const { User } = AuthData();
  const [meetings, setMeetings] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [popupAdd, setPopupAdd] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', time: '', meetmembers: [] });

  const fetchAll = useCallback(async () => {
    try {
      const [meetRes, membRes] = await Promise.all([
        axios.get(`${API}/Meet`, { headers: { Authorization: `Bearer ${User?.token}` } }),
        axios.get(`${API}/users/commite`, { headers: { Authorization: `Bearer ${User?.token}` } }),
      ]);
      setMeetings(Array.isArray(meetRes.data) ? meetRes.data : []);
      setMembers(Array.isArray(membRes.data) ? membRes.data : []);
    } catch (err) {
      console.error('Failed to fetch meetings:', err);
    } finally {
      setLoading(false);
    }
  }, [User?.token]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleMember = id => {
    setForm(f => ({
      ...f,
      meetmembers: f.meetmembers.includes(id)
        ? f.meetmembers.filter(x => x !== id)
        : [...f.meetmembers, id],
    }));
  };

  const saveMeeting = async () => {
    if (!form.name || !form.date || !form.time) return;
    setSaving(true);
    try {
      await axios.post(`${API}/Meet`, form, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      await fetchAll();
      setForm({ name: '', date: '', time: '', meetmembers: [] });
      setPopupAdd(false);
    } catch (err) {
      console.error('Failed to create meeting:', err);
    } finally {
      setSaving(false);
    }
  };

  const now = new Date();
  const upcoming = meetings.filter(m => new Date(`${m.date}T${m.time}`) >= now);
  const past = meetings.filter(m => new Date(`${m.date}T${m.time}`) < now);

  const MeetingRow = ({ m, badge, color }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-semibold text-dblue text-sm">{m.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {new Date(m.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          {' '}at {m.time}
        </p>
      </div>
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${color}`}>{badge}</span>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex flex-row py-4 pl-6 pr-6 items-center shadow-sm bg-white">
        <div className="text-xl font-bold text-dblue">Meetings</div>
      </div>
      <div className="bg-secondary w-full flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">

        {/* Toolbar */}
        <div className="flex justify-end">
          <button
            onClick={() => setPopupAdd(true)}
            className="flex items-center gap-2 bg-dblue text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-pblue transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Meeting
          </button>
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-2xl p-5">
          <p className="font-bold text-dblue mb-3">
            Upcoming Meetings
            {upcoming.length > 0 && (
              <span className="ml-2 bg-blue-100 text-pblue text-xs px-2 py-0.5 rounded-full">{upcoming.length}</span>
            )}
          </p>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : upcoming.length === 0 ? (
            <p className="text-gray-400 text-sm py-2">No upcoming meetings scheduled.</p>
          ) : upcoming.map(m => (
            <MeetingRow key={m.id} m={m} badge="Upcoming" color="bg-blue-100 text-blue-700" />
          ))}
        </div>

        {/* Past */}
        <div className="bg-white rounded-2xl p-5">
          <p className="font-bold text-dblue mb-3">Past Meetings</p>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : past.length === 0 ? (
            <p className="text-gray-400 text-sm py-2">No past meetings.</p>
          ) : past.map(m => (
            <MeetingRow key={m.id} m={m} badge="Completed" color="bg-gray-100 text-gray-500" />
          ))}
        </div>
      </div>

      {/* Create Meeting Modal */}
      {popupAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white w-full max-w-md mx-4 rounded-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setPopupAdd(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-dblue">Create Meeting</h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Meeting Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
                placeholder="e.g. Monthly Budget Review"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Committee Members
                {form.meetmembers.length > 0 && (
                  <span className="ml-2 text-xs text-pblue">{form.meetmembers.length} selected</span>
                )}
              </label>
              <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-1 max-h-44 overflow-y-auto">
                {members.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-2">No committee members found.</p>
                ) : members.map(m => (
                  <label key={m.id} className="flex items-center gap-2 cursor-pointer text-sm py-1.5 px-1 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={form.meetmembers.includes(m.id)}
                      onChange={() => toggleMember(m.id)}
                      className="accent-pblue w-4 h-4"
                    />
                    <span className="text-gray-700 flex-1">{m.User?.fullName}</span>
                    <span className="text-gray-400 text-xs">{m.UserRole?.roleName}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={saveMeeting}
              disabled={saving || !form.name || !form.date || !form.time}
              className="bg-pblue hover:bg-dblue text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60 mt-1"
            >
              {saving ? 'Creating...' : 'Create Meeting'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meeting;
