import { useEffect, useState } from "react";
import axios from "axios";

function Contact() {

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {

      const res = await axios.get("http://localhost:8080/api/contact");

      if (res.data.length > 0) {
        setContact(res.data[0]);
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
        <h2 className="text-2xl font-bold">Loading Contact...</h2>
      </section>
    );
  }

  return (

    <section className="min-h-screen px-4 sm:px-6 lg:px-10 py-20">

      <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold text-center mb-10">
        Contact Me
      </h1>

      <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">

        <div className="grid grid-cols-1 gap-5">

          {/* Email */}
          <div className="bg-slate-800 rounded-xl p-4 sm:p-5 overflow-hidden">
            <h3 className="font-bold text-cyan-400 mb-2">Email</h3>

            <a
              href={`mailto:${contact.email}`}
              className="block text-gray-300 hover:text-cyan-400 break-all"
            >
              {contact.email || "-"}
            </a>
          </div>

          {/* Phone */}
          <div className="bg-slate-800 rounded-xl p-4 sm:p-5">
            <h3 className="font-bold text-cyan-400 mb-2">Phone</h3>

            <a
              href={`tel:${contact.phone}`}
              className="block text-gray-300 hover:text-cyan-400"
            >
              {contact.phone || "-"}
            </a>
          </div>

          {/* Address */}
          <div className="bg-slate-800 rounded-xl p-4 sm:p-5">
            <h3 className="font-bold text-cyan-400 mb-2">Address</h3>

            <p className="text-gray-300 break-words">
              {contact.address || "-"}
            </p>
          </div>

          {/* LinkedIn */}
          {contact.linkedin && (
            <div className="bg-slate-800 rounded-xl p-4 sm:p-5 overflow-hidden">
              <h3 className="font-bold text-cyan-400 mb-2">
                LinkedIn
              </h3>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block text-cyan-400 hover:underline break-all"
              >
                View LinkedIn Profile
              </a>
            </div>
          )}

          {/* GitHub */}
          {contact.github && (
            <div className="bg-slate-800 rounded-xl p-4 sm:p-5 overflow-hidden">
              <h3 className="font-bold text-cyan-400 mb-2">
                GitHub
              </h3>

              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="block text-cyan-400 hover:underline break-all"
              >
                View GitHub Profile
              </a>
            </div>
          )}

          {/* Portfolio */}
          {contact.portfolio && (
            <div className="bg-slate-800 rounded-xl p-4 sm:p-5 overflow-hidden">
              <h3 className="font-bold text-cyan-400 mb-2">
                Portfolio
              </h3>

              <a
                href={contact.portfolio}
                target="_blank"
                rel="noreferrer"
                className="block text-cyan-400 hover:underline break-all"
              >
                Visit Portfolio
              </a>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Contact;
