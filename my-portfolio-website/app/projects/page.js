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
      className="container mx-auto p-4 sm:p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-6 md:mb-12"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">GitHub Projects</h1>
        <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-700">
          Search and explore my GitHub projects.
        </p>
      </motion.div>

      {/* 🔍 Search Bar (Centered) */}
      <input
        type="text"
        placeholder="Search projects..."
        className="mt-3 w-full md:w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display GitHub Repos (Centered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 w-full justify-center">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-4 md:p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center"
            >
              <h2 className="text-lg md:text-xl font-semibold break-words w-full overflow-hidden">
                {repo.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2 line-clamp-3">
                {repo.description || "No description available."}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 mt-3 hover:text-blue-700 text-sm md:text-base"
              >
                <FaGithub size={18} />
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