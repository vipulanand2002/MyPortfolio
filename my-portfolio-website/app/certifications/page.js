"use client";

import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";

const certifications = [
  {
    id: 1,
    name: "Introduction to Data Analytics",
    issuer: "IBM - Coursera",
    date: "June 2024",
    pdfUrl: "/certifications/Data Analytics.pdf",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/Q699SLAYCNY7",
    externalLink: "https://www.coursera.org/learn/introduction-to-data-analytics",
  },
  {
    id: 2,
    name: "Principles of UX/UI Design",
    issuer: "Meta - Coursera",
    date: "November 2023",
    pdfUrl: "/certifications/Coursera Principles of UI UX.pdf",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/4W2Q6NBEE34D",
    externalLink: "https://www.coursera.org/learn/principles-of-ux-ui-design",
  },
  {
    id: 3,
    name: "Create the User Interface in Android Studio",
    issuer: "Meta - Coursera",
    date: "August 2023",
    pdfUrl: "/certifications/User Interface in Android Studio.pdf",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/D8GZ4T4G25MY",
    externalLink: "https://www.coursera.org/learn/create-the-user-interface-android-studio",
  },
  {
    id: 4,
    name: "Programming Fundamentals in Kotlin",
    issuer: "Meta - Coursera",
    date: "June 2023",
    pdfUrl: "/certifications/Kotlin Fundamentals.pdf",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/EDVMB5ZB8XAK",
    externalLink: "https://www.coursera.org/learn/meta-programming-fundamentals-kotlin",
  },
  {
    id: 5,
    name: "Version Control",
    issuer: "Meta - Coursera",
    date: "April 2023",
    pdfUrl: "/certifications/Version Control.pdf",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/P7A6Y4Q8ZF4X",
    externalLink: "https://www.coursera.org/learn/introduction-to-version-control",
  },
  {
    id: 6,
    name: "Introduction to Android Mobile Application Development",
    issuer: "Meta - Coursera",
    date: "February 2023",
    pdfUrl: "/certifications/Introduction to Mobile app development.pdf",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/4947DWPATKGD",
    externalLink: "https://www.coursera.org/learn/introduction-to-android-mobile-application-development",
  },
];

export default function CertificationsPage() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <motion.section 
      className="container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold text-blue-600 text-center">Certifications</h1>
      <p className="mt-4 text-lg text-gray-700 text-center">
        A list of certifications I have completed.
      </p>

      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="relative p-4 border border-gray-300 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col"
          >
            {/* Eye Icon with Tooltip */}
            <div
              className="absolute top-3 right-5 cursor-pointer"
              onMouseEnter={() => setHovered(cert.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelectedPdf(cert.pdfUrl)}
            >
              <FiEye
                className="text-gray-500 hover:text-blue-600 transition-transform hover:scale-110"
                size={22}
              />
              {hovered === cert.id && (
                <span className="absolute -top-8 right-5 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-md">
                  View Certificate
                </span>
              )}
            </div>

            {/* Certification Details */}
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 pr-5">{cert.name}</h2>
              <h3 className="text-md text-gray-600">{cert.issuer}</h3>
              <p className="text-sm text-gray-500">{cert.date}</p>
            </div>

            {/* Buttons at Bottom */}
            <div className="mt-auto pt-4 flex space-x-3">

              {/* External Link (Optional) */}
              {cert.verifyLink && (
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform hover:scale-110 hover:bg-gray-500 w-full text-center"
                >
                  Verify
                </a>
              )}

              {cert.externalLink && (
                <a
                  href={cert.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform hover:scale-110 hover:bg-gray-500 w-full text-center"
                >
                  Course Page
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PDF Preview Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg animate-slideIn">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-2 right-2 text-red-600 text-xl hover:scale-125 transition-transform"
            >
              ✖
            </button>

            {/* Improved PDF Preview with Fallback */}
            <object
              data={selectedPdf}
              type="application/pdf"
              width="100%"
              height="490px"
            >
              <p className="text-center text-gray-600 mt-2">
                PDF preview not available.{" "}
              </p>
            </object>
          </div>
        </div>
      )}
    </motion.section>
  );
}
