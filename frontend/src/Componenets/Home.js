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
      <div className='w-full flex flex-row bg-white  fixed px-10 py-4 items-center justify-between shadow-md'>
        <img src={Logo} alt="logo" className='w-28'/>
        <div className='flex flex-row w-1/3 justify-between'>
          <a href=''>Home</a>
          <a>About us</a>
          <a>Contact US</a>
        </div>
        <a href='/login' className='bg-blue-500 px-4 py-2 rounded-xl text-white'>Login</a>
      </div>
      <div className='bg-gradient-to-b from-blue-800 to-white h-screen pt-28'>
        <img src={Heropic} alt='img' className='w-1/2 float-right mr-5'/>
        <div className='ml-28'>
          <h1>ESI SBA Employees</h1>
          <p>Join us to get your financial requests are met by the Committee</p>
          <p>To have your demand consulted and have a response in a short time, without wasting time and energy</p>
          <button>Login Now </button>
        </div>
      </div>
      <div className='w-full flex flex-row-reverse items-center justify-center gap-12 py-8 '>
        <img src={esi} alt="esi-sba" className='h-32'/>
        <div className='w-[1px] h-32 bg-gray-200'></div>
        <img src={cnas} alt="cnas" className='h-32'/>
      </div>
      <div className='flex flex-row pb-16'>
        <div className='py-8 w-1/2'>
          <img src={aboutus} alt='aboutus' className='float-left mt-12 ml-32 w-96'/>
          <div className='bg-blue-500 w-44 h-44 rounded-full ml-14'></div>
          <div className='bg-blue-500 w-44 h-44 rounded-full relative -z-10 left-2/3 top-40'></div>
        </div>
        <div className='py-8 w-1/2 px-8 flex justify-center items-center'>
          <div>
            <h1>About us</h1>
            <p>We are dedicated to serving the unique needs of ESI SBA employees</p>
            <p>We have made this platform for our workers. Providing them with an easy and efficient way to get their demands met will not only save them time but also make them feel valued.</p>
            <p>We are pleased to inform you that we will be consulting your financial demands and keeping you updated on their progress through our website.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center w-full h-screen pt-24 gap-16'>
        <h1>Our Services</h1>
        <div className='flex flex-row overflow-x-auto h-5/6 w-full items-center scrollbar-hide'>
          <div className='min-w-[700px] flex flex-col items-center px-5 text-center bg-slate-200 py-4'>
            <h1 className='mb-12'>Demand Solfa</h1>
            <p>We provide you the ability to demand an amount of money and you will give it back to us on a monthly deduction.</p>
            <p>Set your Solfa demands on our website and effortlessly track their progress until you receive a response, all done seamlessly and without any time wasted.</p>
            <p>You can set the amount you want based on your salary and you will pay it back in monthly deductions...</p>
          </div>
          <div className='min-w-[700px] flex flex-col items-center px-20 text-center'>
            <h1>Demand Solfa</h1>
            <p>We provide you the ability to demand an amount of money and you will give it back to us on a monthly deduction.</p>
            <p>Set your Solfa demands on our website and effortlessly track their progress until you receive a response, all done seamlessly and without any time wasted.</p>
            <p>You can set the amount you want based on your salary and you will pay it back in monthly deductions...</p>
          </div>
          <div className='min-w-[700px] flex flex-col items-center px-20 text-center'>
            <h1>Demand Solfa</h1>
            <p>We provide you the ability to demand an amount of money and you will give it back to us on a monthly deduction.</p>
            <p>Set your Solfa demands on our website and effortlessly track their progress until you receive a response, all done seamlessly and without any time wasted.</p>
            <p>You can set the amount you want based on your salary and you will pay it back in monthly deductions...</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col pb-16 items-center pt-36'>
        Testimonial
        <div className='flex flex-row'>
          <div className='py-8 w-1/2 px-8 flex justify-center items-center'>
            <div>
              "Thanks to this website, I've saved significant time and energy managing my financial needs. It's been an invaluable resource for discovering new programs and offers that have truly made a difference in my life." Worker said
            </div>
          </div>
          <div className='py-8 w-1/2'>
            <img src={Testimonial} alt='aboutus' className='float-right mt-20 mr-28 w-96'/>
            <div className='bg-blue-500 w-44 h-44 rounded-[40px] ml-14'></div>
            <div className='bg-blue-500 w-44 h-44 rounded-[40px] relative -z-10 left-2/3 top-24'></div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center p-8 bg-blue-200'>
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
