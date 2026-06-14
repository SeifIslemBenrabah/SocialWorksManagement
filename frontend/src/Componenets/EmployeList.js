import axios from 'axios';
import React, { useEffect, useState } from 'react';
import profile from '../Assets/profile.png';
import EmployeCard from './EmployeCard';
import { AuthData } from '../Auth/AuthWrapper';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EmployeList = () => {
  const { User } = AuthData();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API}/users/employes`, {
          headers: { Authorization: `Bearer ${User?.token}` },
        });
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, [User?.token]);

  const filtered = employees.filter((e) =>
    e.User?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-screen top-0 fixed">
      <div className="w-full flex flex-row py-5 justify-between pl-6 pr-60 items-center shadow-md bg-transparent">
        <div className="text-xl font-bold text-dblue">All Employees</div>
        <div className='flex flex-row gap-8'>
          <div className='flex flex-row items-center gap-2'>
            <div className='relative'>
              <div className='absolute top-2 left-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type='search'
                className='py-2 pl-10 border-[1px] border-pblue rounded-md focus:outline-none w-72'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary w-full flex-grow -z-10">
        <div className='w-10/12 h-screen overflow-scroll grid grid-cols-5 gap-4 p-7 scrollbar-hide'>
          {filtered.length === 0 && (
            <p className="col-span-5 text-gray-500 text-center pt-10">No employees found.</p>
          )}
          {filtered.map((employe) => (
            <EmployeCard key={employe.id} img={profile} name={employe.User?.fullName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeList;
