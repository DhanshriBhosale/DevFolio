import { useState } from "react";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully ✅");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Contact Me
        </h1>

        <form onSubmit={sendMessage} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
          />

          <textarea
            rows="6"
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400 resize-none"
          />

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-bold duration-300"
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;
