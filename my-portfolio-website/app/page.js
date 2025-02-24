"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Linkedin, Github } from 'lucide-react';

export default function HomePage() {
  const [chatVisible, setChatVisible] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [userData, setUserData] = useState({ name: "", email: "", message: "" });
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello there! Please enter your name to proceed further." }]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserInput = (input) => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setMessage("");

    setTimeout(() => {
      let nextMessage = "";
      if (chatStep === 0) {
        setUserData({ ...userData, name: input });
        nextMessage = "Enter your email ID:";
      } else if (chatStep === 1) {
        setUserData({ ...userData, email: input });
        nextMessage = "What is the message that you would like to send me?";
      } else if (chatStep === 2) {
        setUserData({ ...userData, message: input });
        nextMessage = "Thank you for contacting me! I'll get in touch with you soon. ✅";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: nextMessage }]);
      setChatStep(chatStep + 1);
    }, 800);
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 1, repeat: Infinity }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5,
        type: "spring", 
        stiffness: 300
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents new line on Enter
      handleUserInput(message);
    }
  };

  return (
    <section className="container mx-auto p-4 mt-10">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between py-10 bg-blue-50 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Introduction */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-600">Hi, I'm Vipul Anand 👋</h1>
          <p className="mt-4 text-lg text-gray-700">Passionate Frontend Developer specializing in React & Next.js.</p>
          <div className="mt-6 flex space-x-4">
            <Link href="/resume.pdf" target="_blank" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500">
              View/Download Resume
            </Link>
            <Link href="/contactMe" className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
              Contact Me
            </Link>
          </div>
          
          {/* Added Social Media Icons */}
          <div className="mt-6 flex space-x-6 justify-center md:justify-start">
            <motion.a 
              href="https://linkedin.com/in/anandvipul2002" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a 
              href="https://github.com/vipulanand2002" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Github size={32} />
            </motion.a>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <motion.div
          className="md:w-1/2 flex justify-center mt-6 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image src="/profile.jpg" alt="Your Image" width={350} height={350} className="shadow-lg object-cover rounded-md" />
        </motion.div>
      </motion.div>

      {/* Chatbot Icon */}
      <motion.div 
        className="fixed bottom-6 right-6"
        variants={pulseVariants}
        animate="pulse"
      >
        <motion.button
          onClick={() => setChatVisible(!chatVisible)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {chatVisible ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {chatVisible && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center space-x-3">
              <Image 
                src="/profile.jpg" 
                alt="Chat Profile" 
                width={40} 
                height={40} 
                className="rounded-full border-2 border-white"
              />
              <span className="font-bold">Chat with Vipul</span>
            </div>
            <div className="p-4 h-60 overflow-y-auto" ref={chatBoxRef}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`my-2 flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "bot" 
                      ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
            {chatStep <= 2 && (
              <motion.div 
                className="p-2 border-t flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                 <textarea
                  className="flex-grow p-2 border rounded-l-md focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Type your response... (Shift + Enter for new line)"
                  value={message}
                  rows={2}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUserInput(message)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-r-md"
                >
                  <Send size={20} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}