import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">Vipul Anand</h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/aboutMe" className="hover:text-gray-200">
              About Me
            </Link>
          </li>
          <li>
            <Link href="/timeline" className="hover:text-gray-200">
              Timeline
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-gray-200">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/certifications" className="hover:text-gray-200">
              Certifications
            </Link>
          </li>
          <li>
            <Link href="/contactMe" className="hover:text-gray-200">
              Contact Me
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}
