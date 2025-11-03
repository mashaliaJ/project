import React from 'react';

const OurPolicy = () => {
  return (
    <section className="text-center py-16 px-4">
      {/* Section Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Why Shop With Us
      </h2>
      <p className="text-gray-500 text-sm sm:text-base mb-12">
        We prioritize quality, convenience, and customer satisfaction.
      </p>

      {/* Policies */}
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-8'>
        {/* Policy 1 */}
        <div>
          <img 
            src='https://cdn-icons-png.flaticon.com/512/992/992651.png' 
            alt='exchange-icon' 
            className='w-12 m-auto mb-3' 
          />
          <p className='font-semibold'>Easy Exchange Policy</p>
          <p className='text-gray-400 text-sm'>Hassle-free exchanges on all products</p>
        </div>

        {/* Policy 2 */}
        <div>
          <img 
            src='https://cdn-icons-png.flaticon.com/512/5709/5709755.png' 
            alt='return-icon' 
            className='w-12 m-auto mb-3' 
          />
          <p className='font-semibold'>7 Days Return Policy</p>
          <p className='text-gray-400 text-sm'>Return products within 7 days</p>
        </div>

        {/* Policy 3 */}
        <div>
          <img 
            src='https://cdn-icons-png.flaticon.com/512/724/724715.png' 
            alt='support-icon' 
            className='w-12 m-auto mb-3' 
          />
          <p className='font-semibold'>24/7 Customer Support</p>
          <p className='text-gray-400 text-sm'>We're here to help anytime</p>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
