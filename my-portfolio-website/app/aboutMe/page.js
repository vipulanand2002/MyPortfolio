"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "🛠 My Skills",
    content: [
      "React.js & Next.js",
      "JavaScript & TypeScript",
      "TailwindCSS & Bootstrap",
      "Node.js & Express.js",
      "MongoDB & SQL",
    ],
  },
  {
    title: "🎨 My Hobbies",
    content: [
      "Coding & Open Source Contributions",
      "Reading Tech Blogs",
      "Sketching & Digital Art",
      "Playing Chess",
      "Exploring new Web Technologies",
    ],
  },
  {
    title: "📚 My Education",
    content: [
      "B.Tech in Computer Science - XYZ University",
      "Certified React Developer",
      "Completed Full-Stack Web Development Bootcamp",
    ],
  },
  {
    title: "💼 My Experience",
    content: [
      "Frontend Developer Intern at ABC Corp",
      "Worked on building scalable Next.js applications",
      "Contributed to open-source projects",
    ],
  },
  {
    title: "🌍 My Interests",
    content: [
      "AI & Machine Learning",
      "Web3 & Blockchain",
      "Cloud Computing & DevOps",
      "Performance Optimization in Web Apps",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
};

export default function AboutMePage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className="container mx-auto p-6 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 12,
          delay: 0.2 
        }}
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          About Me
        </h1>
        <p className="text-lg text-gray-700">
          Here's a little more about me!
        </p>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="rounded-xl overflow-hidden"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.button
              onClick={() => toggleCard(index)}
              className="w-full p-5 flex justify-between items-center text-xl font-semibold bg-white hover:bg-blue-50 transition-colors duration-300 border shadow-sm"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <motion.span
                animate={{
                  color: hoveredIndex === index ? "#2563EB" : "#1F2937",
                }}
                transition={{ duration: 0.2 }}
              >
                {section.title}
              </motion.span>
              <motion.span
                animate={{ 
                  rotate: openIndex === index ? 180 : 0,
                  color: hoveredIndex === index ? "#2563EB" : "#1F2937"
                }}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
              >
                ▼
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: {
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                      },
                      opacity: { duration: 0.3, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.2 }
                    }
                  }}
                  className="bg-white border-t"
                >
                  <motion.ul className="p-5 space-y-2">
                    {section.content.map((item, i) => (
                      <motion.li
                        key={i}
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-2 text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}