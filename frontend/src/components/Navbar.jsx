import { useState } from "react";
import { FaCode, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <FaCode className="text-3xl text-cyan-400" />
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Dev<span className="text-cyan-400">Folio</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">

          <li><Link to="/" className="text-white hover:text-cyan-400 transition duration-300">Home</Link></li>

          <li><Link to="/about" className="text-white hover:text-cyan-400 transition duration-300">About</Link></li>

          <li><Link to="/skills" className="text-white hover:text-cyan-400 transition duration-300">Skills</Link></li>

          <li><Link to="/projects" className="text-white hover:text-cyan-400 transition duration-300">Projects</Link></li>

          <li><Link to="/education" className="text-white hover:text-cyan-400 transition duration-300">Education</Link></li>

          <li><Link to="/certificates" className="text-white hover:text-cyan-400 transition duration-300">Certificates</Link></li>

          <li><Link to="/contact" className="text-white hover:text-cyan-400 transition duration-300">Contact</Link></li>

        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden bg-slate-900 border-t border-slate-700">

          <ul className="flex flex-col text-center py-5 space-y-5 text-lg">

            <li>
              <Link className="text-white hover:text-cyan-400" to="/" onClick={closeMenu}>Home</Link>
            </li>

            <li>
              <Link className="text-white hover:text-cyan-400" to="/about" onClick={closeMenu}>About</Link>
            </li>

            <li>
              <Link className="text-white hover:text-cyan-400" to="/skills" onClick={closeMenu}>Skills</Link>
            </li>

            <li>
              <Link className="text-white hover:text-cyan-400" to="/projects" onClick={closeMenu}>Projects</Link>
            </li>

            <li>
              <Link className="text-white hover:text-cyan-400" to="/education" onClick={closeMenu}>Education</Link>
            </li>

            <li>
              <Link className="text-white hover:text-cyan-400" to="/certificates" onClick={closeMenu}>Certificates</Link>
            </li>

            <li>
              <Link className="text-white hover:text-cyan-400" to="/contact" onClick={closeMenu}>Contact</Link>
            </li>

          </ul>

        </div>

      )}

    </nav>
  );
}

export default Navbar;