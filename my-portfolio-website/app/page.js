"use client";

import { Analytics } from '@vercel/analytics/react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Linkedin, Github, Download, Mail } from 'lucide-react';

export default function HomePage() {
  const [chatVisible, setChatVisible] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [userData, setUserData] = useState({ name: "", email: "", message: "" });
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello there! Please enter your name to proceed." }]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserInput = (input) => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setMessage("");

    setTimeout(() => {
      let botResponse = "";
      const updatedUserData = { ...userData };

      if (chatStep === 0) {
        updatedUserData.name = input;
        botResponse = `Nice to meet you, ${input}! Please enter your email:`;
      } else if (chatStep === 1) {
        updatedUserData.email = input;
        botResponse = "Got it! What message would you like to send me?";
      } else if (chatStep === 2) {
        updatedUserData.message = input;
        botResponse = `Thanks, ${updatedUserData.name}! Submitting your message...`;
        sendEmail(updatedUserData);
      }

      setUserData(updatedUserData);
      setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
      setChatStep(prev => prev + 1);
    }, 800);
  };

  const sendEmail = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setMessages(prev => [...prev, { sender: "bot", text: result.success ? 
        `Message sent! I'll reply to ${data.email} soon. ✅` : 
        "Oops! Something went wrong. Please try again later." 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "Network error! Try again later." }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Analytics />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-20 md:py-16 relative">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between p-10 bg-white shadow-lg rounded-xl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600">Hi, I&apos;m Vipul Anand 👋</h1>
            <p className="mt-4 text-lg text-gray-700">A passionate developer specializing in React & Next.js.</p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link href="/VipulAnand_Resume.pdf" target="_blank" className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <Download size={20} /> Resume
              </Link>
              <Link href="/contactMe" className="bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-700">
                <Mail size={20} /> Contact Me
              </Link>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-6">
              <a href="https://linkedin.com/in/anandvipul2002" target="_blank" className="text-blue-600 hover:text-blue-800">
                <Linkedin size={32} />
              </a>
              <a href="https://github.com/vipulanand2002" target="_blank" className="text-gray-800 hover:text-gray-900">
                <Github size={32} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <Image src="/mainprofile.jpg" alt="Vipul Anand" width={350} height={350} className="rounded-xl shadow-xl border-2 border-white" priority />
          </div>
        </motion.div>
      </section>

      {/* Chatbot Toggle Button */}
      <motion.div className="fixed bottom-6 right-6 z-30" animate={{ scale: [1, 1.05, 1], transition: { duration: 1, repeat: Infinity } }}>
        <button onClick={() => setChatVisible(!chatVisible)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition">
          {chatVisible ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {chatVisible && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <span className="font-bold text-lg">Chat with Vipul</span>
              <button onClick={() => setChatVisible(false)} className="ml-auto p-1 rounded-full hover:bg-opacity-20 transition">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto bg-gray-50" ref={chatBoxRef}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-2 my-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}>
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <div className="p-3 flex items-center bg-white">
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleUserInput(message)}
                className="flex-1 p-2 border rounded-lg" placeholder="Type here..." />
              <button onClick={() => handleUserInput(message)} className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
