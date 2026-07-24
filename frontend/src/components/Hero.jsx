import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-10 text-white">

      {/* Hi I'm */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-6xl font-bold"
      >
        Hi, I'm
      </motion.h2>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-4xl sm:text-6xl md:text-8xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
      >
        Dhanshri <br className="sm:hidden" />
        Bhosale
      </motion.h1>

      {/* Profession */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-base sm:text-lg md:text-2xl text-gray-300 max-w-xl"
      >
        Java Full Stack Developer
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center"
      >

        <Link
          to="/projects"
          className="w-full sm:w-auto px-8 py-4 rounded-full border border-cyan-400 text-white hover:bg-cyan-500 duration-300 text-center"
        >
          View Projects
        </Link>

        <a
          href="/resume.pdf"
          download
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 duration-300 text-center"
        >
          Download Resume
        </a>

      </motion.div>

      {/* Scroll Arrow */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="mt-14 text-cyan-400 text-2xl md:text-3xl"
      >
        <FaArrowDown />
      </motion.div>

    </section>
  );
}

export default Hero;