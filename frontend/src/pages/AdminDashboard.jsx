import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaProjectDiagram,
  FaTools,
  FaGraduationCap,
  FaCertificate,
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    education: 0,
    certificates: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const [
        projects,
        skills,
        education,
        certificates,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/projects"),
        axios.get("http://localhost:8080/api/skills"),
        axios.get("http://localhost:8080/api/education"),
        axios.get("http://localhost:8080/api/certificates"),
      ]);

      setStats({
        projects: projects.data.length,
        skills: skills.data.length,
        education: education.data.length,
        certificates: certificates.data.length,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            Admin <span className="text-cyan-400">Dashboard</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome Admin 👋
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg flex gap-2 items-center"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h2 className="text-5xl font-bold text-cyan-400">
            {stats.projects}
          </h2>
          <p className="mt-3">Projects</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h2 className="text-5xl font-bold text-green-400">
            {stats.skills}
          </h2>
          <p className="mt-3">Skills</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h2 className="text-5xl font-bold text-yellow-400">
            {stats.education}
          </h2>
          <p className="mt-3">Education</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h2 className="text-5xl font-bold text-pink-400">
            {stats.certificates}
          </h2>
          <p className="mt-3">Certificates</p>
        </div>

      </div>

      {/* Management Cards */}

      <div className="grid md:grid-cols-3 gap-8">

        <Link to="/admin/projects" className="bg-slate-900 p-8 rounded-xl hover:border-cyan-400 border border-slate-700">
          <FaProjectDiagram className="text-5xl text-cyan-400 mb-5"/>
          <h2 className="text-2xl font-bold">Manage Projects</h2>
        </Link>

        <Link to="/admin/skills" className="bg-slate-900 p-8 rounded-xl hover:border-green-400 border border-slate-700">
          <FaTools className="text-5xl text-green-400 mb-5"/>
          <h2 className="text-2xl font-bold">Manage Skills</h2>
        </Link>

        <Link to="/admin/education" className="bg-slate-900 p-8 rounded-xl hover:border-yellow-400 border border-slate-700">
          <FaGraduationCap className="text-5xl text-yellow-400 mb-5"/>
          <h2 className="text-2xl font-bold">Manage Education</h2>
        </Link>

        <Link to="/admin/certificates" className="bg-slate-900 p-8 rounded-xl hover:border-pink-400 border border-slate-700">
          <FaCertificate className="text-5xl text-pink-400 mb-5"/>
          <h2 className="text-2xl font-bold">Manage Certificates</h2>
        </Link>

        <Link to="/admin/about" className="bg-slate-900 p-8 rounded-xl hover:border-orange-400 border border-slate-700">
          <FaUser className="text-5xl text-orange-400 mb-5"/>
          <h2 className="text-2xl font-bold">Manage About</h2>
        </Link>

        <Link to="/admin/contact" className="bg-slate-900 p-8 rounded-xl hover:border-blue-400 border border-slate-700">
          <FaEnvelope className="text-5xl text-blue-400 mb-5"/>
          <h2 className="text-2xl font-bold">Manage Contact</h2>
        </Link>

      </div>

    </section>
  );
}

export default AdminDashboard;