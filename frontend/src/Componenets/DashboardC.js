import React from 'react'
import list from '../Assets/list.png'
import MonthlyMoneyChart from './MonthlyMoneyChart';
import SpendingPieChart from './SpendingPieChart';
const DashboardC = () => {
   
  return (
    <div className='w-full px-0 md:px-20 pt-6 flex flex-col items-center justify-center bg-white md:bg-secondary pb-0 md:pb-5 font-poppins'>
        <div className=' w-full md:w-11/12 h-3/4 border-[0.2px] rounded-xl pt-2 flex flex-col bg-white2'>
        <div className='flex flex-col md:flex-row justify-between px-4'>
            <p className='font-bold text-sm md:text-lg text-dblue'>Monthly Requests</p>
            <div className='flex flex-row text-sm md:text-base text-dblue font-semibold'>
                <p>Date:</p>
                <p>08-09-2003</p>
            </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 justify-around mt-3 mb-4'>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='font-bold text-dblue'>Total</p>
                    <p>85</p>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='font-bold text-dblue'>Total</p>
                    <p>85</p>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='font-bold text-dblue'>Total</p>
                    <p>85</p>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='font-bold text-dblue'>Total</p>
                    <p>85</p>
                </div>
            </div>
        </div>
        </div>
        <div className='flex flex-col md:flex-row w-full md:w-11/12 h-3/4 rounded-xl pt-3 justify-between'>
            <div className='hidden md:block border-[0.2px] bg-white2 rounded-xl px-6 w-7/12'>
                <div className='flex flex-col gap-1 mt-2 mb-6'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='font-extrabold text-xl text-dblue'>Monthly Money</p>
                        <div className='flex flex-row gap-2'>
                            <p>Year Budget:</p>
                            <p>5000000.00 DA</p>
                        </div>
                    </div>
                    <p>300000.00 DA</p>
                </div>
            <MonthlyMoneyChart/>
            </div>
            <div className='flex flex-col justify-center items-center border-[0.2px] bg-white2 rounded-xl px-6 w-full md:w-5/12 ml-0 md:ml-5'>
            <div className='flex flex-col w-full mt-2'>
                            <p className='text-xl font-bold text-dblue'>Spending Money</p>
                            <p> Total: 5000000.00 DA</p>
                        </div>
            <SpendingPieChart/>
            <div className='flex flex-col w-full mb-3'>
                <div className='flex flex-row justify-between'>
                    <p>Loans</p>
                    <p>60000.00 DA</p>
                </div>
                <div className='flex flex-row justify-between'>
                <p>Grantings</p>
                <p>60000.00 DA</p>
                </div>
                <div className='flex flex-row justify-between'>
                <p>Solidarity Services</p>
                <p>60000.00 DA</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardC
