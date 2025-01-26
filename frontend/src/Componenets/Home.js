import React from 'react'
import Logo from '../Assets/Logo.svg'
import Heropic from '../Assets/Heropic.png'
import esi from '../Assets/esi.svg'
import cnas from '../Assets/cnas.svg'
import aboutus from '../Assets/aboutus.png'
import Testimonial from '../Assets/Testimonial.png'

const Home = () => {
  return (
    <div>
      <div className='w-full flex flex-col md:flex-row bg-white  fixed px-10 py-4 items-center justify-between shadow-md font-poppins'>
        <img src={Logo} alt="logo" className='w-28 hidden md:block'/>
        <div className='hidden md:flex flex-row w-1/3 justify-between '>
          <a href='#home'>Home</a>
          <a href='#aboutus'>About us</a>
          <a href='#contactus'>Contact us</a>
        </div>
        <a href='/login' className='bg-blue-500 px-4 py-2 rounded-xl text-white hidden md:block'>Login</a>
        <div className='flex flex-row justify-between w-full mb-3 md:hidden'>
        <img src={Logo} alt="logo" className='w-28 block md:hidden'/>
        <a href='/login' className='bg-blue-500 px-4 py-2 rounded-xl text-white block md:hidden'>Login</a>
        </div>
        <div className=' flex md:hidden flex-row w-full justify-between '>
          <a href='#home'>Home</a>
          <a href='#aboutus'>About us</a>
          <a href='#contactus'>Contact us</a>
        </div>
      </div>
      <div id='home' className='bg-gradient-to-b from-dblue from-10% to-secondary h-screen pt-0 md:pt-28 flex flex-col-reverse  md:flex-row-reverse items-center'>
        <img src={Heropic} alt='img' className='md:w-1/2 md:float-right md:mr-5'/>
        <div className='md:ml-24 px-4'>
          <h1 className='text-4xl font-bold font-poppins text-black2 text-center mb-10'>ESI SBA Employees</h1>
          <p className='text-2xl font-medium font-poppins text-white'> Join us to get your financial requests are met by the <span className='text-black2 font-semibold'>Committee</span></p>
          <p className='text-gray-600 font-normal font-poppins text-lg mt-2'>To have your demand consulted and have a response in a short time, without wasting time and energy</p>
          <button className='bg-pblue text-white px-20 py-2 rounded-md mt-10 font-medium'>Login Now </button>
        </div>
      </div>
      <div className='w-full flex flex-row-reverse items-center justify-center gap-12 py-8 bg-blue-50 bg-opacity-50'>
        <img src={esi} alt="esi-sba" className='h-14 md:h-32'/>
        <div className='w-[1px] h-14 md:h-32 bg-gray-200'></div>
        <img src={cnas} alt="cnas" className='h-14 md:h-32'/>
      </div>
      <div className='flex flex-col md:flex-row pb-16'>
        <div className='py-8 w-1/2'>
          <img src={aboutus} alt='aboutus' className='float-left mt-12 ml-32 w-96'/>
          <div className='bg-pblue w-20 md:w-44 h-20 md:h-44 rounded-full ml-24 mt-4 md:mt-0 md:ml-14'></div>
          <div className='bg-pblue w-20 md:w-44 h-20 md:h-44 rounded-full relative -z-10 md:left-2/3 top-32 md:top-40'></div>
        </div>
        <div id='aboutus' className='py-8 w-full md:w-1/2 px-4 md:px-8 flex justify-center items-center font-poppins'>
          <div>
            <h1 className='text-2xl text-pblue font-bold mb-6'>About us</h1>
            <p className='text-lg font-semibold mb-4'>We are dedicated to serving the unique needs of ESI SBA employees</p>
            <p>We have made this platform for our workers. Providing them with an easy and efficient way to get their demands met will not only save them time but also make them feel valued.</p>
            <p>We are pleased to inform you that we will be consulting your financial demands and keeping you updated on their progress through our website.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center w-full h-screen pt-24 bg-secondary bg-opacity-60'>
        <h1 className='font-bold text-dblue text-3xl'>Our Services</h1>
        <div className='flex flex-row gap-8 overflow-x-auto h-5/6 w-full items-center scrollbar-hide'>
          <div className='min-w-full md:min-w-[700px] flex flex-col items-center px-5  bg-white shadow-md py-4 rounded-lg'>
            <h1 className='mb-2 text-pblue font-bold text-2xl text-center'>Demand Solfa</h1>
            <p className='font-bold text-xl mb-6'>We provide you the ability to demand an amount of money and you will give it back to us on a monthly deduction.</p>
            <div className='border-[1px] p-2 border-pblue rounded-lg text-lg'>
            <p>Set your Solfa demands on our website and effortlessly track their progress until you receive a response, all done seamlessly and without any time wasted.</p>
            <p>You can set the amount you want based on your salary and you will pay it back in monthly deductions...</p>
          </div>
          </div>
          <div className='min-w-full md:min-w-[700px] flex flex-col items-center px-5 shadow-md  bg-white py-4 rounded-lg'>
            <h1 className='mb-2 text-pblue font-bold text-2xl text-center'>Demand Solfa</h1>
            <p className='font-bold text-xl mb-6'>We provide you the ability to demand an amount of money and you will give it back to us on a monthly deduction.</p>
            <div className='border-[1px] p-2 border-pblue rounded-lg text-lg'>
            <p>Set your Solfa demands on our website and effortlessly track their progress until you receive a response, all done seamlessly and without any time wasted.</p>
            <p>You can set the amount you want based on your salary and you will pay it back in monthly deductions...</p>
          </div>
          </div>
          <div className='min-w-full md:min-w-[700px] flex flex-col items-center px-5 shadow-md bg-white py-4 rounded-lg'>
            <h1 className='mb-2 text-pblue font-bold text-2xl text-center'>Demand Solfa</h1>
            <p className='font-bold text-xl mb-6'>We provide you the ability to demand an amount of money and you will give it back to us on a monthly deduction.</p>
            <div className='border-[1px] p-2 border-pblue rounded-lg text-lg'>
            <p>Set your Solfa demands on our website and effortlessly track their progress until you receive a response, all done seamlessly and without any time wasted.</p>
            <p>You can set the amount you want based on your salary and you will pay it back in monthly deductions...</p>
          </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col pb-16 items-center pt-10'>
        <p className='font-bold text-dblue text-3xl'>Testimonial</p>
        <div className='flex flex-col md:flex-row'>
          <div className='py-8 w-full md:w-1/2 px-8 flex justify-center items-center'>
            <div className='text-center font-semibold text-xl md:text-3xl'>
              "Thanks to this website, I've saved significant time and energy managing my financial needs. It's been an invaluable resource for discovering new programs and offers that have truly made a difference in my life." Worker said
            </div>
          </div>
          <div className='py-8 w-full item md:w-1/2'>
            <img src={Testimonial} alt='aboutus' className='float-none md:float-right ml-6 md:ml-0 md:mt-20 md:mr-28 w-96'/>
            <div className='hidden md:block bg-blue-500 w-44 h-44 rounded-[40px] ml-14'></div>
            <div className='hidden md:block  bg-blue-500 w-44 h-44 rounded-[40px] relative -z-10 left-2/3 top-24'></div>
          </div>
        </div>
      </div>
      <div id='contactus' className='flex flex-col items-center p-8 bg-blue-200'>
        <h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
        <h2 className='text-lg mb-6'>To Get More Information</h2>
        <div className='w-1/3 flex flex-row justify-between mb-4'>
          <p className='font-semibold'>Phone:</p>
          <p>(+213 00000000000)</p>
        </div>
        <div className='w-1/3 flex flex-row justify-between mb-4'>
          <p className='font-semibold'>Email:</p>
          <p>info@example.com</p>
        </div>
        <div className='w-1/3 flex flex-row justify-between mb-4'>
          <p className='font-semibold'>Address:</p>
          <p>123 Main Street, Algiers, Algeria</p>
        </div>
        <div className='w-1/3 flex flex-row justify-between'>
          <p className='font-semibold'>Follow Us:</p>
          <p>Cnas</p>
        </div>
      </div>
    </div>
  )
}

export default Home
