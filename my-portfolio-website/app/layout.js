export const metadata = {
  title: 'My Portfolio',
  description: 'Showcasing my certifications, projects, and resume.',
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/projects">Projects</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2025 My Portfolio</footer>
      </body>
    </html>
  );
}
