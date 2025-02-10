"use client";

import { useState } from "react";

const certifications = [
  {
    id: 1,
    name: "Introduction to Data Analytics",
    issuer: "IBM - Coursera",
    date: "March 2023",
    pdfUrl: "/certifications/Data Analytics.pdf",
    externalLink: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    id: 2,
    name: "Principles of UX/UI Design",
    issuer: "Meta - Coursera",
    date: "July 2022",
    pdfUrl: "/certifications/Coursera Principles of UI UX.pdf",
    externalLink: "https://cloud.google.com/certification/cloud-architect",
  },
  {
    id: 3,
    name: "Create the User Interface in Android Studio",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/User Interface in Android Studio.pdf",
    externalLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    id: 4,
    name: "Programming Fundamentals in Kotlin",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/Kotlin Fundamentals.pdf",
    externalLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    id: 5,
    name: "Version Control",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/Version Control.pdf",
    externalLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    id: 6,
    name: "Introduction to Android Mobile Application Development",
    issuer: "Meta - Coursera",
    date: "January 2021",
    pdfUrl: "/certifications/Introduction to Mobile app development.pdf",
    externalLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
];

export default function CertificationsPage() {
  const [selectedPdf, setSelectedPdf] = useState(null);

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
            className="p-4 border border-gray-300 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900">{cert.name}</h2>
            <h3 className="text-md text-gray-600">{cert.issuer}</h3>
            <p className="text-sm text-gray-500">{cert.date}</p>

            <div className="mt-4 flex space-x-3">
              {/* Expand Button */}
              <button
                onClick={() => setSelectedPdf(cert.pdfUrl)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-transform hover:scale-110 hover:bg-blue-500"
              >
                Expand
              </button>

              {/* Download Button */}
              <a
                href={cert.pdfUrl}
                download
                className="bg-green-600 text-white px-4 py-2 rounded-lg transition-transform hover:scale-110 hover:bg-green-500"
              >
                Download
              </a>

              {/* External Link (Optional) */}
              {cert.externalLink && (
                <a
                  href={cert.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform hover:scale-110 hover:bg-gray-500"
                >
                  Learn More
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
              height="400px"
            >
              <p className="text-center text-gray-600 mt-2">
                PDF preview not available.{" "}
                <a href={selectedPdf} download className="text-blue-500 underline">
                  Download here
                </a>
              </p>
            </object>
          </div>
        </div>
      )}
    </section>
  );
}
