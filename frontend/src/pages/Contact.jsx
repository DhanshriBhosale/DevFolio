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

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {

    try {

      const res = await axios.get(
        "https://devfolio-backend-production-0511.up.railway.app/api/contact"
      );

      if (res.data.length > 0) {
        setContact(res.data[0]);
      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const sendMessage = async (e) => {

    e.preventDefault();

    setSending(true);

    try {

      const res = await axios.post(
        "https://devfolio-backend-production-0511.up.railway.app/api/email/send",
        form
      );

      alert(res.data);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (err) {

      console.log(err);
      alert("Failed to send message.");

    } finally {

      setSending(false);

    }

  };

  if (loading) {

    return (

      <section className="min-h-screen flex justify-center items-center text-white">

        <h2 className="text-2xl font-bold">
          Loading Contact...
        </h2>

      </section>

    );

  }

  return (

    <section className="min-h-screen px-4 sm:px-6 lg:px-10 py-20">

      <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold text-center mb-10">
        Contact Me
      </h1>

      <div className="w-full max-w-5xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-10">

        <div className="grid grid-cols-1 gap-5">

          {/* Email */}

          <div className="bg-slate-800 rounded-xl p-4 sm:p-5 overflow-hidden">

            <h3 className="font-bold text-cyan-400 mb-2">
              Email
            </h3>

            <a
              href={`mailto:${contact.email}`}
              className="block text-gray-300 hover:text-cyan-400 break-all"
            >
              {contact.email || "-"}
            </a>

          </div>

          {/* Phone */}

          <div className="bg-slate-800 rounded-xl p-4 sm:p-5">

            <h3 className="font-bold text-cyan-400 mb-2">
              Phone
            </h3>

            <a
              href={`tel:${contact.phone}`}
              className="block text-gray-300 hover:text-cyan-400"
            >
              {contact.phone || "-"}
            </a>

          </div>

          {/* Address */}

          <div className="bg-slate-800 rounded-xl p-4 sm:p-5">

            <h3 className="font-bold text-cyan-400 mb-2">
              Address
            </h3>

            <p className="text-gray-300 break-words">
              {contact.address || "-"}
            </p>

          </div>

          {/* LinkedIn */}

          {contact.linkedin && (

            <div className="bg-slate-800 rounded-xl p-4 sm:p-5">

              <h3 className="font-bold text-cyan-400 mb-2">
                LinkedIn
              </h3>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline break-all"
              >
                View LinkedIn Profile
              </a>

            </div>

          )}

          {/* GitHub */}

          {contact.github && (

            <div className="bg-slate-800 rounded-xl p-4 sm:p-5">

              <h3 className="font-bold text-cyan-400 mb-2">
                GitHub
              </h3>

              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline break-all"
              >
                View GitHub Profile
              </a>

            </div>

          )}

          {/* Portfolio */}

          {contact.portfolio && (

            <div className="bg-slate-800 rounded-xl p-4 sm:p-5">

              <h3 className="font-bold text-cyan-400 mb-2">
                Portfolio
              </h3>

              <a
                href={contact.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline break-all"
              >
                Visit Portfolio
              </a>

            </div>

          )}

        </div>

        {/* Contact Form */}

        <div className="mt-10 bg-slate-800 rounded-2xl p-6">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            Send Me a Message
          </h2>

          <form
            onSubmit={sendMessage}
            className="space-y-5"
          >

                        <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
              required
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400 resize-none"
              required
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-bold duration-300"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>
              </div>

    </section>

  );

}

export default Contact;

          
