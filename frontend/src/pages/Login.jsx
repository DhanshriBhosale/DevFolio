import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please enter Username and Password");
      return;
    }

    try {

      const response = await axios.post(
        "https://devfolio-backend-production-0511.up.railway.app/api/admin/login",
        {
          username,
          password,
        }
      );

      if (response.data === "Login Successful") {

        localStorage.setItem("admin", "true");

        alert("Login Successful");

        navigate("/admin/dashboard");

      } else {

        alert("Invalid Username or Password");

      }

    } catch (error) {

      console.log("========== LOGIN ERROR ==========");

      if (error.response) {

        console.log("Status :", error.response.status);
        console.log("Data :", error.response.data);

      } else if (error.request) {

        console.log("No Response Received");
        console.log(error.request);

      } else {

        console.log(error.message);

      }

      console.log("===============================");

      alert("Server Error");

    }

  };

  return (

    <section className="min-h-screen flex items-center justify-center px-6 bg-slate-950">

      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8">

        <div className="flex justify-center mb-6">
          <FaUserShield className="text-6xl text-cyan-400" />
        </div>

        <h2 className="text-3xl text-white font-bold text-center mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800 text-white outline-none border border-slate-700"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800 text-white outline-none border border-slate-700"
            required
          />

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold duration-300"
          >
            Login
          </button>

        </form>

      </div>

    </section>

  );

}

export default Login;
