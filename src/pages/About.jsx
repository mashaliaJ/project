import React from 'react';

const About = () => {
  return (
    <div className='max-w-4xl mx-auto py-16 px-6 text-center'>
      <h1 className='text-3xl font-bold mb-4 text-green-700'>About AgriLink</h1>
      <p className='text-gray-600 mb-6 leading-relaxed'>
        Welcome to <span className='font-semibold text-green-700'>AgriLink</span> — a platform built to
        connect farmers, suppliers, and buyers seamlessly. We aim to make agricultural trade
        easier, faster, and more transparent for everyone involved.
      </p>
      <p className='text-gray-600 leading-relaxed'>
        Our mission is to empower communities by promoting sustainable farming practices
        and improving access to quality agricultural products across Kenya and beyond.
        Whether you’re a smallholder farmer or a large-scale distributor, AgriLink helps you
        reach more customers and grow together.
      </p>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-2 text-green-700'>Our Vision</h2>
        <p className='text-gray-600'>
          To become Africa’s leading agri-commerce platform, fostering prosperity through
          innovation and connection.
        </p>
      </div>
    </div>
  );
};

export default About;
