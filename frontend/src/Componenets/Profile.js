import React, { useState } from 'react';
import profile from '../Assets/profile.png';
import { AuthData } from '../Auth/AuthWrapper';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Profile = () => {
  const { User } = AuthData();
  const [fullName, setFullName] = useState(User?.fullName || '');
  const [email, setEmail] = useState(User?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const body = { fullName, email };
      if (newPassword.trim()) body.newPassword = newPassword.trim();
      await axios.put(`${API}/users/profile`, body, {
        headers: { Authorization: `Bearer ${User?.token}` },
      });
      setSuccess('Changes saved successfully!');
      setNewPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-secondary flex items-start justify-center pt-8 font-poppins pb-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 mx-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="flex flex-col items-center gap-2">
            <img
              src={profile}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover"
            />
            <button className="bg-pblue hover:bg-dblue text-white text-xs px-4 py-1.5 rounded-lg transition-colors">
              Change Photo
            </button>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-dblue">{User?.fullName || '—'}</h2>
            <p className="text-gray-500 text-sm">{User?.email || '—'}</p>
            <div className="flex gap-2 justify-center md:justify-start mt-1 flex-wrap">
              <span className="bg-dblue text-white text-xs px-3 py-1 rounded-full font-medium">
                {User?.roletype || '—'}
              </span>
              {User?.roleName && (
                <span className="bg-blue-100 text-dblue text-xs px-3 py-1 rounded-full font-medium">
                  {User.roleName}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 mb-6" />

        {/* Edit form */}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <h3 className="font-bold text-dblue">Account Settings</h3>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
            />
          </div>

          <div className="h-px bg-gray-100 my-1" />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current password (min. 8 characters)"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm font-medium bg-green-50 px-4 py-2 rounded-lg">{success}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-pblue hover:bg-dblue text-white font-bold py-2.5 rounded-xl transition-all mt-1 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
