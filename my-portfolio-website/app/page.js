"use client";
import { Analytics } from '@vercel/analytics/react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Linkedin, Github, Download, Mail } from 'lucide-react';

export default function HomePage() {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello there! Please enter your name to proceed further." }]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  <Analytics />

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Handle resize for responsive adjustments
    const handleResize = () => {
      if (window.innerWidth < 768 && chatVisible) {
        // Adjust chat window size on mobile
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
          chatWindow.style.width = '90vw';
          chatWindow.style.right = '5vw';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chatVisible]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Email sent successfully!");
        setMessages((prev) => [...prev, { sender: "bot", text: `Thank you for reaching out, ${formData.name}! I'll respond to ${formData.email} as soon as possible. ✅` }]);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send email.");
        setMessages((prev) => [...prev, { sender: "bot", text: "Failed to send email. Please try again." }]);
      }
    } catch {
      setStatus("Server error. Try again later.");
      setMessages((prev) => [...prev, { sender: "bot", text: "Server error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
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

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated Blob 1 */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Animated Blob 2 */}
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Animated Blob 3 */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      </div>
      <section className="container mx-auto px-4 pt-8 pb-20 md:py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between py-10 bg-white rounded-xl shadow-lg p-6 md:p-10 backdrop-blur-sm bg-opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Side - Introduction */}
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hi, I&apos;m Vipul Anand 👋
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-gray-700 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Passionate Developer specializing in creating responsive and intuitive user experiences with React & Next.js.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/VipulAnand_Resume.pdf" target="_blank"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-500 shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:translate-y-1 hover:scale-105"
              >
                <Download size={20} />
                <span>Resume</span>
              </Link>
              <Link href="/contactMe"
                className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:translate-y-1 hover:scale-105"
              >
                <Mail size={20} />
                <span>Contact Me</span>
              </Link>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              className="mt-8 flex space-x-6 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.a
                href="https://linkedin.com/in/anandvipul2002"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                variants={socialIconVariants}
                whileHover="hover"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={32} />
              </motion.a>
              <motion.a
                href="https://github.com/vipulanand2002"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-900 transition-colors duration-300"
                variants={socialIconVariants}
                whileHover="hover"
                aria-label="GitHub Profile"
              >
                <Github size={32} />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side - Profile Image */}
          <motion.div
            className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-70 blur-xl"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <Image
                src="/mainprofile.jpg"
                alt="Vipul Anand"
                width={350}
                height={350}
                className="relative z-10 shadow-xl object-cover rounded-xl border-2 border-white"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Chatbot Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-30"
        variants={pulseVariants}
        animate="pulse"
      >
        <motion.button
          onClick={() => setChatVisible(!chatVisible)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={chatVisible ? "Close chat" : "Open chat"}
        >
          {chatVisible ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
      </motion.div>
      {/* Chatbot Window */}
      <AnimatePresence>
        {chatVisible && (
          <motion.div
            id="chat-window"
            className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white shadow-2xl rounded-xl overflow-hidden z-20 border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center space-x-3">
              <Image
                src="/profile.jpeg"
                alt="Chat Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-white shadow-md"
              />
              <span className="font-bold text-lg">Chat with Vipul</span>
              <button
                onClick={() => setChatVisible(false)}
                className="ml-auto bg-white bg-opacity-20 p-1 rounded-full hover:bg-opacity-30 transition-all"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 h-64 sm:h-80 overflow-y-auto bg-gray-50" ref={chatBoxRef}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`my-3 flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                      <Image
                        src="/profile.jpeg"
                        alt="Vipul"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === "bot"
                    ? "bg-white shadow-md text-gray-800 border border-gray-100"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="my-3 flex justify-center"
                >
                  <div className="max-w-[80%] p-3 rounded-xl bg-white shadow-md text-gray-800 border border-gray-100">
                    {status}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              className="p-3 border-t border-gray-200 flex items-end bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="flex w-full">
                <div className="flex-grow mr-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700 mb-2"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700 mb-2"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700"
                    rows={2}
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg shadow-md"
                  disabled={loading}
                  aria-label="Send message"
                >
                  {loading ? "Sending..." : <Send size={20} />}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>

  );
}
