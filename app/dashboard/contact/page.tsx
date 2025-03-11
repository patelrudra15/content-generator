"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'

const Contact = () => {

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // updated for stronger typing
  
    formData.append("access_key", "8976037b-661e-4ae7-b10a-5fde5d1ec413");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());
  
    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Your Message Sent Successfuly!",
        icon: "success"
      });
    }
  };
  

  return (

    <form onSubmit={onSubmit} className="space-y-4">
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-transparent"
      style={{ backgroundImage: "url(https://img.freepik.com/free-photo/vintage-pink-telephone-composition_23-2148913955.jpg?ga=GA1.1.1641619486.1733831726&semt=ais_hybrid)" }}
       // Replace with your background image path
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-black mb-2 text-center">Contact Us</h1>
        <p className="text-gray-700 text-center mb-6">Feel free to drop us a line below!</p>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-800 text-white"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mt-6 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2  border rounded focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-800 text-white"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 mb-2 font-bold mt-6">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-800 text-white"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 mt-6 font-bold mb-2">Message</label>
          <textarea
            name="message"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-800 text-white"
            placeholder="Enter your message"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-green-500 mt-6 font-bold text-white py-2 rounded hover:bg-green-600 transition focus:outline-none"
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
    </form>
    
  );
};

export default Contact;
