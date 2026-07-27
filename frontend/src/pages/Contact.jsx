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

  <section className="min-h-screen px-4 sm:px-6 lg:px-10 py-20 flex items-center justify-center">

```
<div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-10">

  <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold text-center mb-10">
    Contact Me
  </h1>

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
      className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Your Email"
      value={form.email}
      onChange={handleChange}
      className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
      required
    />

    <input
      type="text"
      name="subject"
      placeholder="Subject"
      value={form.subject}
      onChange={handleChange}
      className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400"
      required
    />

    <textarea
      rows="6"
      name="message"
      placeholder="Write your message..."
      value={form.message}
      onChange={handleChange}
      className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-400 resize-none"
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
```

  </section>

);

}

export default Contact;
