"use client";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

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
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600">GitHub Projects</h1>
      <p className="mt-4 text-lg text-gray-700">
        Search and explore my GitHub projects.
      </p>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search projects..."
        className="mt-4 w-full md:w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display GitHub Repos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div key={repo.id} className="p-4 bg-white shadow-lg rounded-lg">
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
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
    </section>
  );
}
