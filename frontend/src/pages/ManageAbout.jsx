import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

function ManageAbout() {

  const [about, setAbout] = useState({
    id: null,
    name: "",
    profession: "",
    email: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {

      const res = await axios.get("https://devfolio-backend-production-6da2.up.railway.app/api/about");

      if (res.data.length > 0) {
        setAbout(res.data[0]);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setAbout({
      ...about,
      [e.target.name]: e.target.value,
    });
  };

  const saveAbout = async (e) => {
    e.preventDefault();

    try {

      if (about.id) {

        await axios.put(
          `https://devfolio-backend-production-6da2.up.railway.app/api/about/${about.id}`,
          about
        );

        alert("About Updated Successfully");

      } else {

        await axios.post(
          "https://devfolio-backend-production-6da2.up.railway.app/api/about",
          about
        );

        alert("About Added Successfully");

      }

      loadAbout();

    } catch (err) {

      console.log(err);
      alert("Failed to Save About Details");

    }
  };

  return (

    <section className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-orange-400">
          Manage About
        </h1>

        <Link
          to="/admin/dashboard"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaArrowLeft />
          Dashboard
        </Link>

      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          About Information
        </h2>

        <form onSubmit={saveAbout} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={about.name}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
            required
          />

          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={about.profession}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={about.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
            required
          />

      

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={about.location}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
            required
          />

          <textarea
            rows="6"
            name="bio"
            placeholder="About Yourself"
            value={about.bio}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-lg flex justify-center items-center gap-2 text-lg font-semibold"
          >
            <FaSave />
            {about.id ? "Update About" : "Save About"}
          </button>

        </form>

      </div>

    </section>

  );
}

export default ManageAbout;
