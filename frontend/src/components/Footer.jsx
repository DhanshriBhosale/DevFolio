import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white py-10">

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div className="text-center md:text-left">

            <h2 className="text-2xl sm:text-3xl font-bold">
              Dev<span className="text-cyan-400">Folio</span>
            </h2>

            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Building Modern Web Applications 🚀
            </p>

          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 text-2xl">

            <a
              href="https://github.com/DhanshriBhosale"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 hover:scale-110 duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/dhanshri-bhosale/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 hover:scale-110 duration-300"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:dhanshribhosale11@gmail.com"
              className="hover:text-cyan-400 hover:scale-110 duration-300"
            >
              <FaEnvelope />
            </a>

          </div>

        </div>

        {/* Bottom Line */}

        <div className="border-t border-slate-800 mt-8 pt-6 text-center">

          <p className="text-gray-400 text-sm sm:text-base">
            © {new Date().getFullYear()} DevFolio | Designed & Developed by{" "}
            <span className="text-cyan-400 font-semibold">
              Dhanshri Bhosale
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;