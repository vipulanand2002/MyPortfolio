import { Analytics } from '@vercel/analytics/react';

import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="pt-20 container mx-auto p-6">{children}<Analytics /></main>
        <footer className="bg-gray-800 text-white py-4 text-center mt-10">
          © 2025 My Portfolio
        </footer>
      </body>
    </html>
  );
}
