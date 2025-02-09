"use client";

import { useState, useEffect } from "react";

const experiences = [
  {
    id: 1,
    title: "Harvard University",
    duration: "2008 - 2011",
    description: "A description of all the lectures and courses I have taken and my final degree.",
  },
  {
    id: 2,
    title: "Apple Inc.",
    duration: "2011 - 2013",
    description: "My first employer. All the stuff I've learned and projects I've been working on.",
  },
  {
    id: 3,
    title: "Freelancer",
    duration: "2013 - present",
    description: "My current employment. Way better than the position before!",
  },
];

export default function ExperiencePage() {
  const [isVisible, setIsVisible] = useState({});

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
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center animate-fade-in motion-safe:animate-[fadeIn_1s_ease-in]">
        Experience
      </h1>
      <p className="mt-4 text-lg text-gray-700 text-center motion-safe:animate-[fadeIn_1s_ease-in]">
        A timeline of my professional journey.
      </p>

      <div className="relative mt-10">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-blue-200 to-transparent" />

        {experiences.map((exp, index) => (
          <div 
            key={exp.id}
            data-id={exp.id}
            className={`timeline-item mb-16 relative opacity-0 transition-all duration-700 ease-out
              ${isVisible[exp.id] ? 'opacity-100 translate-y-0' : 'translate-y-16'}
            `}
            style={{
              transitionDelay: `${index * 200}ms`
            }}
          >
            <div 
              className={`flex items-center justify-between gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content Box */}
              <div className="w-5/12">
                <div className="bg-white p-6 rounded-lg shadow-md 
                  transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:-translate-y-1 hover:scale-105
                  group">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {exp.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{exp.duration}</p>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
              </div>

              {/* Center Point */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-blue-200
                  transition-all duration-300 ease-in-out
                  hover:scale-150 hover:rotate-180 hover:bg-blue-700
                  cursor-pointer" />
              </div>

              {/* Empty space for the other side */}
              <div className="w-5/12" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}