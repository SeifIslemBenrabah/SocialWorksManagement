import React from 'react'
import list from '../Assets/list.png'
import MonthlyMoneyChart from './MonthlyMoneyChart';
import SpendingPieChart from './SpendingPieChart';
const DashboardC = () => {
   
  return (
    <div className='w-full px-20 pt-7 flex flex-col items-center justify-center'>
        <div className='w-11/12 h-3/4 border-[0.2px] border-slate-800 rounded-xl pt-4 flex flex-col'>
        <div className='flex flex-row justify-between px-4'>
            <p>Monthly Requests</p>
            <div className='flex flex-row'>
                <p>Date:</p>
                <p>08-09-2003</p>
            </div>
        </div>
        <div className='flex flex-row justify-around mt-3 mb-4'>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p>Total</p>
                    <p>85</p>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p>Total</p>
                    <p>85</p>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p>Total</p>
                    <p>85</p>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <img src={list} alt='list'/>
                <div className='flex flex-col gap-2 items-center'>
                    <p>Total</p>
                    <p>85</p>
                </div>
            </div>
        </div>
        </div>
        <div className='flex flex-row w-11/12 h-3/4 rounded-xl pt-7 justify-between'>
            <div className='border-[0.2px] border-slate-800 rounded-xl px-6 w-7/12'>
                <div className='flex flex-col gap-1 mt-2 mb-6'>
                    <div className='flex flex-row justify-between'>
                        <p>Monthly Money</p>
                        <div className='flex flex-row'>
                            <p>Year Budget</p>
                            <p>5000000.00 DA</p>
                        </div>
                    </div>
                    <p>300000.00 DA</p>
                </div>
            <MonthlyMoneyChart/>
            </div>
            <div className='flex flex-col justify-center items-center border-[0.2px] border-slate-800 rounded-xl px-6 w-5/12 ml-5'>
            <div className='flex flex-col w-full'>
                            <p>Spending Money</p>
                            <p> Total: 5000000.00 DA</p>
                        </div>
            <SpendingPieChart/>
            <div className='flex flex-col w-full'>
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
