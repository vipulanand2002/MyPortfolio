"use client";

import { useState } from "react";

const experiences = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    duration: "Jan 2022 - Present",
    description: "Developing scalable web applications and enhancing user experience.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Microsoft",
    duration: "Jun 2020 - Dec 2021",
    description: "Worked on React-based applications and optimized performance.",
  },
  {
    id: 3,
    title: "Intern - Web Developer",
    company: "Startup X",
    duration: "Jan 2020 - May 2020",
    description: "Built and maintained frontend components for the company’s main product.",
  },
];

export default function ExperiencePage() {
  const [data, setData] = useState(experiences);

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600">Experience</h1>
      <p className="mt-4 text-lg text-gray-700">A brief overview of my professional journey.</p>

      <div className="mt-6 space-y-6">
        {data.map((exp) => (
          <div key={exp.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold text-gray-900">{exp.title}</h2>
            <h3 className="text-md text-gray-600">{exp.company}</h3>
            <p className="text-sm text-gray-500">{exp.duration}</p>
            <p className="mt-2 text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
