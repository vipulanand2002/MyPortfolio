"use client";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/vipulanand2002/repos")
      .then((response) => response.json())
      .then((data) => setRepos(data))
      .catch((error) => console.error("Error fetching repos:", error));
  }, []);

  // Filter projects based on search input
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.section
      className="container mx-auto p-6 flex flex-col items-center text-center"
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
      <h1 className="text-3xl font-bold text-blue-600">GitHub Projects</h1>
      <p className="mt-4 text-lg text-gray-700">
        Search and explore my GitHub projects.
      </p>
      </motion.div>

      {/* 🔍 Search Bar (Centered) */}
      <input
        type="text"
        placeholder="Search projects..."
        className="mt-4 w-full md:w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display GitHub Repos (Centered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 justify-center">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold">{repo.name}</h2>
              <p className="text-gray-600">
                {repo.description || "No description available."}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 mt-3 hover:text-blue-700"
              >
                <FaGithub size={20} />
                View on GitHub
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full mt-4">No projects found.</p>
        )}
      </div>
    </motion.section>
  );
}
