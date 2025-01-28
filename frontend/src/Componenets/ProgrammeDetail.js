import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
const ProgrammeDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const programme = location.state;
  
    return (
        <div className="flex flex-col w-full h-screen top-0 fixed">
        <div className="w-full flex flex-row py-5 justify-between pl-6 pr-6 items-center shadow-md bg-transparent">
          <div className="text-xl font-bold text-dblue">Programme</div>
        </div>
        <div className="bg-secondary w-full flex-grow -z-10 flex items-center pl-32 pr-40">
            <div className='bg-white overflow-auto flex flex-col items-center gap-4 w-10/12 h-[80vh] rounded-2xl px-7 pt-6 pb-5 scrollbar-hide'>
                <h2 className='text-3xl'>{programme.title}</h2>
                <div className='w-full flex flex-col items-start'>
                    <h4 className='text-xl'>Description</h4>
                    <p className='text-sm'>{programme.des}</p>
                    
                </div>
                <div className='w-11/12 min-h-[0.5px] bg-pblue my-2'></div>
                <div className='grid gap-y-3 grid-cols-2 w-full'>
                    <div className='w-11/12 flex flex-col gap-1'>
                    <p>First Name</p>
                    <input type='text' 
                    className="w-full py-1 px-3 border rounded-md focus:outline-none"/>
                    </div>
                    <div className='w-11/12 flex flex-col gap-1'>
                    <p>Family Name</p>
                    <input type='text'
                    className="flex-1 py-1 px-3 border rounded-md focus:outline-none " />
                    </div>
                    <div className='w-11/12 flex flex-col gap-1'>
                    <p>Phone Number</p>
                    <input type='text' 
                    className="flex-1 py-1 px-3 border rounded-md focus:outline-none "/>
                    </div>
                    <div className='w-11/12 flex flex-col gap-1'>
                    <p>Email</p>
                    <input type='text' 
                    className="flex-1 py-1 px-3 border rounded-md focus:outline-none "/>
                    </div>
                    <div className='w-11/12 flex flex-col gap-1'>
                    <p>Corps</p>
                    <input type='text' 
                    className="flex-1 py-1 px-3 border rounded-md focus:outline-none "/>
                    </div>
                    <div className='w-11/12 flex flex-col gap-1'>
                    <p>Employment Date</p>
                    <input type='Date'
                    className="flex-1 py-1 px-3 border rounded-md focus:outline-none "/>
                    </div>
                    <div className='w-11/12 flex flex-col gap-1'>
                        <p>Rank</p>
                        <input type='text'
                        className="flex-1 py-1 px-3 border rounded-md focus:outline-none "/>
                    </div>
                    
                </div>
                <div className='w-full flex flex-col items-center mt-2 gap-4'>
                <div className='w-11/12 h-[1px] bg-pblue my-2'></div>
                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-5/12'>
                            <p>Advance amount</p>
                            <input type='text'
                            className="w-full py-1 px-3 border rounded-md focus:outline-none "/>
                        </div>
                        <div className='w-5/12'>
                            <p>Propose monthly deduction</p>
                            <input type='text'
                            className="w-full py-1 px-3 border rounded-md focus:outline-none "/>
                        </div>
                        <div className='w-2/12'>
                            <p>for</p>
                            <input type='number'
                            placeholder='Months'
                            className="w-2/3 py-1 pl-2 border rounded-md focus:outline-none "/>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <p>Justification (if there is no official document justifying the need)</p>
                        <textarea
                        id="comment"
                        className='w-full border-[0.5px] border-dblue rounded-md focus:outline-none py-1 px-2'
                        placeholder="Enter your Description here..."
                        rows={5}>
                        </textarea>
                    </div>
                    <div className='flex flex-col w-full gap-3'>
                        <p className='text-2xl font-semibold'>Requirements</p>
                        <ol className="list-disc list-inside">
                            <li>
                                File 1
                            </li>
                            <li>
                                File 2
                            </li>
                            <li>
                                File 3
                            </li>
                        </ol>
                        <button className='w-4/12 rounded-lg flex flex-row gap-3 items-center bg-pblue text-white justify-center py-2'>
                        <p>Upload Files</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        </button>
                        <div className='w-full flex justify-center my-2'>
                        <button className='w-9/12 rounded-lg flex flex-row gap-5 items-center bg-pblue text-white justify-center py-2'>
                        <p>Send Demand</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
  };
  

export default ProgrammeDetail
