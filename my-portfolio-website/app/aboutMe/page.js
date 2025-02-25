"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "🛠 My Skills",
    content: [
      {
        title: "Frontend Development",
        details: [
          "React.js & Next.js",
          "JavaScript & TypeScript",
          "Performance Optimization",
          "State Management (Redux)"
        ]
      },
      {
        title: "Android App Development",
        details: [
          "Java & Kotlin",
          "JetPack Components",
          "Optimized UI/UX",
          "State Management (Redux)"
        ]
      },
      {
        title: "Databases",
        details: [
          "SQL (PostgreSQL, MySQL, SSMS)",
        ]
      },
      {
        title: "Styling & UI Design",
        details: [
          "TailwindCSS & Bootstrap",
          "Component Libraries (Material UI, Next UI)",
          "Tools Like Webflow and Figma",
          "Responsive & Accessible Design"
        ]
      },
      {
        title: "Cloud Platform",
        details: [
          "Basic Idea about Google Cloud Platform",
        ]
      },
      {
        title: "Backend Development",
        details: [
          "Node.js & Express.js",
          "Fast Apis",
          "Authentication (JWT)"
        ]
      },
      {
        title: "Other Skills",
        details: [
          "Object-Oriented Programming (OOPs)"
        ]
      },
    ],
    hasSubsections: true
  },
  {
    title: "💼 My Experience",
    content: [
      {
        title: "Analyst  - TresVista Financial Services Pvt. Ltd (Bengaluru, Karnataka)",
        period: "Jan 2023 - Present",
        details: [
          "Built custom web applications for various clients",
          "Worked on Several POCs for organization including",
          "CSR contribution in form of Open Source Contributions",
          "Worked as in assisting python automation for clients in one of the projects",
          "Handled client communication and project management efficiently"
        ]
      }
    ],
    hasSubsections: true
  },
  {
    title: "📚 My Education",
    content: [
      {
        title: "B.Tech in Computer Science - Vellore Institute of Technology (Bhopal Campus)",
        period: "2020 - 2024",
        details: [
          "GPA: 8.41/10.0",
          "Member of BIT by BIT (Technical Club) and VIT Bhopal",
          "Attended Several Cloud and Android Workshops",
        ]
      },
      {
        title: "XII - CBSE Board - Assisi Convent Senior Secondary School (Noida, UP)",
        period: "2019 - 2020",
        details: [
          "PCM Stream - 75% marks in CBSE Board Exams",
          "School Captain for 2 years (2018 - 2020)"
        ]
      },
      {
        title: "X - CBSE Board - Assisi Convent Senior Secondary School (Noida, UP)",
        period: "2017 - 2018",
        details: [
          "86% marks in CBSE Board Exams",
          "Participated in various Tech Olympiads"
        ]
      }
    ],
    hasSubsections: true
  },
  {
    title: "🎨 My Hobbies",
    content: [
      "Learning Tech Stacks",
      "Reading Tech Blogs",
      "Watching Informative videos related to Tech",
      "Studying new courses",
      "Travelling & Singing",
    ],
  }
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

const SubsectionContent = ({ item, index }) => {
  const [isSubsectionOpen, setIsSubsectionOpen] = useState(false);

  return (
    <motion.div 
      className="mb-4 last:mb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsSubsectionOpen(!isSubsectionOpen)}
        className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-blue-800">{item.title}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-600">{item.period}</span>
            <motion.span
              animate={{ rotate: isSubsectionOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-blue-600"
            >
              ▼
            </motion.span>
          </div>
        </div>
      </button>
      
      <AnimatePresence>
        {isSubsectionOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="mt-2 ml-4 space-y-2">
              {item.details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
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
          Here&apos;s a little more about me!
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
                  <div className="p-5">
                    {section.hasSubsections ? (
                      section.content.map((item, i) => (
                        <SubsectionContent key={i} item={item} index={i} />
                      ))
                    ) : (
                      <ul className="space-y-2">
                        {section.content.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center space-x-2 text-gray-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}