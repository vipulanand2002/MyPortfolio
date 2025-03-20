"use client";

import { useState, useEffect } from "react";
import { FiEye, FiDownload, FiExternalLink } from "react-icons/fi";
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
  const [modalView, setModalView] = useState('options'); // 'options' or 'iframe'

  // Find the selected certification details
  const selectedCert = certifications.find(
    cert => cert.pdfUrl === selectedPdf
  );

  const openPdfModal = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setModalView('options');
  };

  const closeModal = () => {
    setSelectedPdf(null);
    setModalView('options');
  };

  return (
    <motion.section 
      className="container mx-auto p-6 text-gray-800 dark:text-gray-100"
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
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
          Certifications
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 text-center">
          A list of certifications I have completed.
        </p>
      </motion.div>
      
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="relative p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col"
          >
            {/* Eye Icon with Tooltip */}
            <div
              className="absolute top-3 right-5 cursor-pointer"
              onMouseEnter={() => setHovered(cert.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openPdfModal(cert.pdfUrl)}
            >
              <FiEye
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-transform hover:scale-110"
                size={22}
              />
              {hovered === cert.id && (
                <span className="absolute -top-8 right-5 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded px-2 py-1 shadow-md">
                  View Certificate
                </span>
              )}
            </div>

            {/* Certification Details */}
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 pr-5">
                {cert.name}
              </h2>
              <h3 className="text-md text-gray-600 dark:text-gray-400">
                {cert.issuer}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {cert.date}
              </p>
            </div>

            {/* Buttons at Bottom */}
            <div className="mt-auto pt-4 flex space-x-3">
              {/* Verify Link */}
              {cert.verifyLink && (
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform hover:scale-110 w-full text-center"
                >
                  Verify
                </a>
              )}

              {/* Course Link */}
              {cert.externalLink && (
                <a
                  href={cert.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform hover:scale-110 w-full text-center"
                >
                  Course Page
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-Friendly PDF Modal with Dark Mode Support */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-full overflow-auto relative shadow-lg animate-slideIn">
            {/* Modal Header */}
            <div className="p-4 border-gray-200 dark:border-gray-700 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                {selectedCert?.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:scale-125 transition-transform"
                aria-label="Close"
              >
                <span className="text-xl">✖</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {modalView === 'options' ? (
                <div className="flex flex-col space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose how you'd like to view this certificate:
                  </p>
                  
                  {/* Option buttons */}
                  <div className="grid gap-4 mt-4">
                    {/* Direct Download */}
                    <a
                      href={selectedPdf}
                      download
                      className="flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <FiDownload className="h-5 w-5" />
                      <span>Download PDF</span>
                    </a>
                    
                    {/* Open in new tab */}
                    <a
                      href={selectedPdf}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <FiExternalLink className="h-5 w-5" />
                      <span>Open in New Tab</span>
                    </a>
                    
                    {/* Try Embedded Viewer */}
                    <button
                      onClick={() => setModalView('iframe')}
                      className="flex items-center justify-center gap-2 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <FiEye className="h-5 w-5" />
                      <span>Try Embedded Viewer</span>
                    </button>
                  </div>
                  
                  {/* Verification link */}
                  {selectedCert?.verifyLink && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Verify this certification:
                      </p>
                      <a
                        href={selectedCert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                      >
                        <FiExternalLink className="mr-1" /> 
                        Verify on {selectedCert.issuer.split(' - ')[0]}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => setModalView('options')}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      ← Back to Options
                    </button>
                    <a
                      href={selectedPdf}
                      download
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                    >
                      <FiDownload className="mr-1" /> Download
                    </a>
                  </div>
                  
                  {/* iframe PDF viewer with fallback message */}
                  <div className="border border-gray-300 dark:border-gray-700 rounded">
                    <iframe
                      src={selectedPdf}
                      width="100%"
                      height="480"
                      className="border-none w-full bg-white" // Keep PDF iframe background white
                      title={selectedCert?.name}
                      sandbox="allow-same-origin allow-scripts"
                      loading="lazy"
                    >
                      <p className="p-4 text-center text-gray-600 dark:text-gray-300">
                        Your browser doesn't support embedded PDFs.
                        <a 
                          href={selectedPdf} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline block mt-2"
                        >
                          Open the PDF directly instead.
                        </a>
                      </p>
                    </iframe>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Having trouble? Try the download or "Open in New Tab" options.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}