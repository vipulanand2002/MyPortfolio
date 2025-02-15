"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container mx-auto p-4 mt-10">
      {/* Hero Section */}
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-between py-10"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Introduction */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-600">
            Hi, I'm Vipul Anand 👋
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Passionate Frontend Developer specializing in React & Next.js.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link 
              href="/resume.pdf" 
              target="_blank"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500"
            >
              View/Download Resume
            </Link>
            <Link 
              href="/contactMe"
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <motion.div 
          className="md:w-1/2 flex justify-center mt-6 md:mt-0"
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image 
            src="/profile.jpg" 
            alt="Your Image" 
            width={350} 
            height={350} 
            className="shadow-lg object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
