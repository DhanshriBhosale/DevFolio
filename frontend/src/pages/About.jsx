import { useEffect, useState } from "react";
import axios from "axios";

function About() {

  const [about, setAbout] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {

      const res = await axios.get("https://devfolio-backend-production-0511.up.railway.app/api/about");

      if (res.data.length > 0) {
        setAbout(res.data[0]);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center text-white">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </section>
    );
  }

  return (

    <section className="min-h-screen px-5 sm:px-8 md:px-12 py-20 text-white">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          About Me
        </h1>

        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 sm:p-8 md:p-10 shadow-lg">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400">
            {about.name || "Your Name"}
          </h2>

          <h3 className="text-lg sm:text-xl md:text-2xl mt-3 text-gray-300">
            {about.profession || "Profession"}
          </h3>

          <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 text-justify">
            {about.bio || "No bio available."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <div className="bg-slate-800 rounded-xl p-5">
              <span className="font-bold text-cyan-400">Email</span>
              <p className="mt-2 break-all">{about.email || "-"}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <span className="font-bold text-cyan-400">Phone</span>
              <p className="mt-2">{about.phone || "-"}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 md:col-span-2">
              <span className="font-bold text-cyan-400">Location</span>
              <p className="mt-2">{about.location || "-"}</p>
            </div>

          </div>

        </div>

      </div>

    </section>

  );
}

export default About;
