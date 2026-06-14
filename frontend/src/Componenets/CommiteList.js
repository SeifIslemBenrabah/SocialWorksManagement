import React, { useEffect, useState } from 'react';
import profile from '../Assets/profile.png';
import EmployeCard from './EmployeCard';
import axios from 'axios';
import { AuthData } from '../Auth/AuthWrapper';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CommiteList = () => {
  const { User } = AuthData();
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${API}/users/commite`, {
          headers: { Authorization: `Bearer ${User?.token}` },
        });
        if (Array.isArray(res.data)) {
          setMembers(res.data);
        }
      } catch (err) {
        console.error('Error fetching committee members:', err);
      }
    };
    fetchMembers();
  }, [User?.token]);

  const filtered = members.filter((m) =>
    m.User?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-screen top-0 fixed">
      <div className="w-full flex flex-row py-5 justify-between pl-6 pr-60 items-center shadow-md bg-transparent">
        <div className="text-xl font-bold text-dblue">All Committee Members</div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-row items-center gap-2">
            <div className="relative">
              <div className="absolute top-2 left-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type="search"
                className="py-2 pl-10 border-[1px] border-pblue rounded-md focus:outline-none w-72"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary w-full flex-grow -z-10">
        <div className={`h-screen overflow-scroll grid gap-4 p-7 scrollbar-hide ${selected ? 'grid-cols-5 w-9/12' : 'grid-cols-5 w-11/12'}`}>
          {filtered.length === 0 && (
            <p className="col-span-5 text-gray-500 text-center pt-10">No committee members found.</p>
          )}
          {filtered.map((member) => (
            <EmployeCard
              key={member.id}
              img={profile}
              name={member.User?.fullName}
              onClick={() => setSelected(member)}
            />
          ))}
          {selected && (
            <div className="col-span-4 col-start-4 bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-dblue">Committee Member Details</h2>
              <img src={profile} alt="Profile" className="w-24 h-24 rounded-full my-3" />
              <p className="text-lg font-semibold">{selected.User?.fullName}</p>
              <p className="text-gray-600">{selected.User?.email}</p>
              <p className="text-sm text-blue-500 mt-1">{selected.UserRole?.roleName || selected.UserRole?.roletype}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommiteList;
