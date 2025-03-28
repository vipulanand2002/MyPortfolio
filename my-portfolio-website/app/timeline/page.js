"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: 1,
    title: "Assisi Convent Senior Secondary School (Sector 33 - Noida, UP)",
    duration: "2007 - 2020",
    description: [
      "Class 12th (PCM stream) - 75% marks in CBSE Board Exams.",
      "Class 10th - 86% marks in CBSE Board Exams.",
      "School House Captain for 2 years (2018 - 2020)",
    ],
    icon: "🎓",
    skills: []
  },
  {
    id: 2,
    title: "Vellore Institute of Technology (Bhopal Campus, MP)",
    duration: "2020 - 2024",
    description: [
      "Pursued B.Tech in Computer Science and Engineering.",
      "Member of BIT by BIT (Technical Club) and VIT Bhopal.",
      "Attended Several Cloud and Android Workshops.",
      "Completed an Externship from SmartInternz in Android Development.",
    ],
    icon: "🎓",
    skills: []
  },
  {
    id: 4,
    title: "SmartInternz - Android Mobile Application Development Internship (Remote)",
    duration: "2023",
    description: [
      "Gained experience in designing user interfaces, managing app lifecycles, and debugging effectively.",
      "Worked with RESTful APIs for app functionalities.",
      "Enhanced ability to communicate while coordinating effectively with team members and mentors.",
      "Created a News App as a final project.",
    ],
    icon: "🎓",
    skills: ["Project Management", "Teamwork"]
  },
  {
    id: 5,
    title: "TresVista Financial Services Pvt. Ltd. (Bengaluru, Karnataka)",
    duration: "2024 - present",
    description: [
      "Built custom web applications for various clients.",
      "Worked on Several POCs for organization including.",
      "CSR contribution in form of Open Source Contributions.",
      "Worked as in assisting python automation for clients in one of the projects.",
      "Handled client communication and project management efficiently."
    ],
    icon: "💼",
    skills: ["Project Management", "Client Relations", "Front-End Development", "Data Visualization"]
  },
];

const DescriptionCard = ({ description, isVisible }) => {
  const descriptionRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [isVisible]);

  const handleScroll = () => {
    if (descriptionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = descriptionRef.current;
      setScrollPosition(scrollTop / (scrollHeight - clientHeight));
    }
  };

  return (
    <motion.div
      className="absolute inset-0 bg-white dark:bg-gray-800 p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        ref={descriptionRef}
        className="overflow-y-auto pr-2 max-h-[280px] md:max-h-[320px] scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-700 scrollbar-track-transparent"
        onScroll={handleScroll}
      >
        <ul className="list-none space-y-3">
          {description.map((point, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
            >
              <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      {isOverflowing && (
        <motion.div 
          className="h-1 bg-blue-100 dark:bg-blue-900 mt-4 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
            style={{ width: `${scrollPosition * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default function ExperiencePage() {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section 
      className="container mx-auto p-4 md:p-6 min-h-screen dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-8 md:mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Timeline
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
          A timeline of my professional journey
        </p>
      </motion.div>

      <div className="relative">
        <motion.div 
          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 dark:from-blue-900 dark:via-blue-700 dark:to-blue-900 rounded-full" />
        </motion.div>

        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            data-id={exp.id}
            className={`timeline-item mb-8 md:mb-20 relative opacity-0 transition-all duration-700 ease-out
              ${isVisible[exp.id] ? 'opacity-100 translate-y-0' : 'translate-y-16'}
            `}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className={`
              flex 
              ${isMobile ? 'ml-8' : `items-center justify-between gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            `}>
              <motion.div 
                className={`${isMobile ? 'w-full' : 'w-5/12'} relative`}
                onHoverStart={() => !isMobile && setHoveredId(exp.id)}
                onHoverEnd={() => !isMobile && setHoveredId(null)}
                onClick={() => isMobile && setHoveredId(hoveredId === exp.id ? null : exp.id)}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/30 overflow-hidden"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 md:p-6">
                    <motion.div
                      animate={{
                        opacity: hoveredId === exp.id ? 0 : 1,
                        y: hoveredId === exp.id ? -20 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl md:text-2xl">{exp.icon}</span>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {exp.title}
                        </h2>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{exp.duration}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {hoveredId === exp.id && (
                        <DescriptionCard 
                          description={exp.description} 
                          isVisible={hoveredId === exp.id}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>

              {/* Center Point */}
              <motion.div 
                className={`absolute ${isMobile ? 'left-2' : 'left-1/2 transform -translate-x-1/2'}`}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-blue-200 dark:border-blue-900 cursor-pointer"
                  animate={{
                    rotate: hoveredId === exp.id ? 180 : 0,
                    backgroundColor: hoveredId === exp.id ? "#1d4ed8" : "#2563eb"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {!isMobile && <div className="w-5/12" />}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}