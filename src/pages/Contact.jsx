import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question, suggestion, or need support?  
        Our team is always ready to help you. Reach out to us using the form below or contact details provided.
      </p>

      {/* Contact Form */}
      <form className="bg-gray-50 p-6 rounded-lg shadow-sm text-left">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            rows="4"
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-10 text-gray-600">
        <p>📞 +254-785-739-093</p>
        <p>📧 AgriLink@gmail.com</p>
        <p>📍 Nairobi, Kenya</p>
      </div>
    </div>
  );
};

export default Contact;
