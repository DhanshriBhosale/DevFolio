import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/admin/register", {
        username,
        password,
      });

      alert("Admin Registered Successfully");

      navigate("/admin/login");
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8">

        <div className="flex justify-center mb-6">
          <FaUserPlus className="text-6xl text-cyan-400" />
        </div>

        <h2 className="text-3xl text-white font-bold text-center mb-8">
          Admin Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            Register
          </button>

        </form>

      </div>
    </section>
  );
}

export default Register;
