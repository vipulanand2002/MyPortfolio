"use client";

import { useState } from "react";
import { FiEye } from "react-icons/fi"; // Eye Icon

const certifications = [
  {
    id: 1,
    name: "Introduction to Data Analytics",
    issuer: "IBM - Coursera",
    date: "March 2023",
    pdfUrl: "/certifications/Data Analytics.pdf",
    courseLink: "",
    externalLink: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    id: 2,
    name: "Principles of UX/UI Design",
    issuer: "Meta - Coursera",
    date: "July 2022",
    pdfUrl: "/certifications/Coursera Principles of UI UX.pdf",
    courseLink: "",
    externalLink: "https://cloud.google.com/certification/cloud-architect",
  },
  {
    id: 3,
    name: "Create the User Interface in Android Studio",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/User Interface in Android Studio.pdf",
    courseLink: "",
    externalLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    id: 4,
    name: "Programming Fundamentals in Kotlin",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/Kotlin Fundamentals.pdf",
    courseLink: "",
    externalLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    id: 5,
    name: "Version Control",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/Version Control.pdf",
    courseLink: "",
    externalLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    id: 6,
    name: "Introduction to Android Mobile Application Development",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/Introduction to Mobile app development.pdf",
    courseLink: "https://www.coursera.org/account/accomplishments/verify/4947DWPATKGD",
    externalLink: "https://www.coursera.org/learn/introduction-to-android-mobile-application-development",
  },
];

export default function CertificationsPage() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <section className="container mx-auto p-6">
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
              {cert.externalLink && (
                <a
                  href={cert.courseLink}
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
    </section>
  );
}
