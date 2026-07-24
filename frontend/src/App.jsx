import { Routes, Route, useLocation } from "react-router-dom";

import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

import ManageProjects from "./pages/ManageProjects";
import ManageSkills from "./pages/ManageSkills";
import ManageEducation from "./pages/ManageEducation";
import ManageCertificates from "./pages/ManageCertificates";
import ManageAbout from "./pages/ManageAbout";
import ManageContact from "./pages/ManageContact";

import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  const location = useLocation();

  // Admin pages check
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>

      {/* User Pages Only */}
      {!isAdminPage && <Background />}
      {!isAdminPage && <Navbar />}

      <Routes>

        {/* User Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Login */}

        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <ManageSkills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/education"
          element={
            <ProtectedRoute>
              <ManageEducation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/certificates"
          element={
            <ProtectedRoute>
              <ManageCertificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/about"
          element={
            <ProtectedRoute>
              <ManageAbout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <ManageContact />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* User Pages Only */}
      {!isAdminPage && <Footer />}

    </>
  );
}

export default App;