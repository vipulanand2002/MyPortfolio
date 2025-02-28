"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactMe() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send email.");
      }
    } catch {
      setStatus("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      className="container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-8 md:mb-16"
      >
      <h1 className="text-3xl font-bold text-blue-600">Contact Me</h1>
      <p className="mt-4 text-lg text-gray-700">Feel free to reach out!</p>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="mt-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          rows={4}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg transition hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && <p className="mt-4 text-green-600">{status}</p>}
      </form>
    </motion.section>
  );
}
