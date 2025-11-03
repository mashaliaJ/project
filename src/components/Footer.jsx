import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            {/* <img className='mb-5 w-32 ' src="" alt="logo" /> */}
            <h1 className="text-2xl font-bold text-green-700">AgriLink</h1>
            <p className='w-full md:w-2/3 text-gray-600'>
              Connecting you to fresh, quality agricultural products. Shop easily, track your orders, and enjoy reliable delivery straight to your doorstep.</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><li>Home</li></Link>
                <Link to='/about' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><li>About</li></Link>
                <li>Delivery</li>
                <Link to='/OurPolicy'><li>Privacy Policy</li></Link>
            </ul>
            
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Get in Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+254-785-739-093</li>
                <li>AgriLink@gmail.com</li>
            </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-center'> Copyright 2025 @AgriLink.com. All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
