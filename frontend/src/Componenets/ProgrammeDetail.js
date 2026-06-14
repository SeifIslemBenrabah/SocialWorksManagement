import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Field = ({ label, name, type = 'text', value, onChange, required = true, placeholder = '' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30"
    />
  </div>
);

const ProgrammeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { User } = AuthData();
  const programme = location.state;

  const [form, setForm] = useState({
    firstName: '',
    familyName: '',
    phone: '',
    email: User?.email || '',
    corps: '',
    employmentDate: '',
    rank: '',
    amount: '',
    deduction: '',
    months: '',
    justification: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('programmeId', id);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('file', file);

      await axios.post(`${API}/Demand`, fd, {
        headers: {
          Authorization: `Bearer ${User?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setTimeout(() => navigate('/Employee/u-demand'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit demand. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!programme) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
        <p>Programme not found.</p>
        <button onClick={() => navigate(-1)} className="text-pblue hover:underline text-sm">Go back</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="w-full flex flex-row py-4 pl-6 pr-6 items-center shadow-sm bg-white gap-3">
        <button onClick={() => navigate(-1)} className="text-dblue hover:text-pblue transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="text-xl font-bold text-dblue">{programme.title}</div>
      </div>

      {/* Scrollable content */}
      <div className="bg-secondary w-full flex-1 overflow-y-auto px-8 py-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl px-8 pt-6 pb-8 flex flex-col gap-5 max-w-3xl mx-auto">

          {/* Programme info */}
          <div>
            <h2 className="text-lg font-bold text-dblue">{programme.title}</h2>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{programme.description}</p>
          </div>

          {programme.Pconditions?.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-dblue text-sm mb-2">Eligibility Conditions</p>
              <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
                {programme.Pconditions.map((c, i) => (
                  <li key={i}>{c.condition}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="h-px bg-gray-100" />

          {/* Personal info */}
          <p className="font-semibold text-dblue">Personal Information</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
            <Field label="Family Name" name="familyName" value={form.familyName} onChange={handleChange} />
            <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} type="tel" />
            <Field label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
            <Field label="Corps" name="corps" value={form.corps} onChange={handleChange} />
            <Field label="Employment Date" name="employmentDate" value={form.employmentDate} onChange={handleChange} type="date" />
            <Field label="Rank / Grade" name="rank" value={form.rank} onChange={handleChange} />
          </div>

          <div className="h-px bg-gray-100" />

          {/* Financial details */}
          <p className="font-semibold text-dblue">Financial Details</p>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Advance Amount (DA)" name="amount" value={form.amount} onChange={handleChange} type="number" placeholder="0" />
            <Field label="Monthly Deduction (DA)" name="deduction" value={form.deduction} onChange={handleChange} type="number" placeholder="0" />
            <Field label="Duration (Months)" name="months" value={form.months} onChange={handleChange} type="number" placeholder="12" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Justification <span className="text-gray-400 font-normal">(if no official document)</span>
            </label>
            <textarea
              name="justification"
              value={form.justification}
              onChange={handleChange}
              rows={4}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30 resize-none"
              placeholder="Explain why you need this advance..."
            />
          </div>

          <div className="h-px bg-gray-100" />

          {/* File upload */}
          <p className="font-semibold text-dblue">Supporting Document</p>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-pblue mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm text-gray-500">
              {file ? file.name : 'Click to upload (PDF, JPEG, PNG — max 5MB)'}
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={e => setFile(e.target.files[0])}
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm font-medium bg-green-50 px-4 py-2 rounded-lg">
              Demand submitted successfully! Redirecting to your demands...
            </p>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="bg-pblue hover:bg-dblue text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60 mt-1"
          >
            {loading ? 'Submitting...' : 'Submit Demand'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProgrammeDetail;
