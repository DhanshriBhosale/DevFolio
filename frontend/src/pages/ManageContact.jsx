import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

function ManageContact() {

  const [contact, setContact] = useState({
    id: null,
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

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
    }
  };

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const saveContact = async (e) => {
    e.preventDefault();

    try {

      if (contact.id) {

        await axios.put(
          `http://localhost:8080/api/contact/${contact.id}`,
          contact
        );

        alert("Contact Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:8080/api/contact",
          contact
        );

        alert("Contact Added Successfully");

      }

      loadContact();

    } catch (err) {

      console.log(err);
      alert("Failed to Save Contact");

    }
  };

  return (

    <section className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-blue-400">
          Manage Contact
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
          Contact Information
        </h2>

        <form onSubmit={saveContact} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={contact.phone}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={contact.address}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={contact.linkedin}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={contact.github}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
          />

          <input
            type="text"
            name="portfolio"
            placeholder="Portfolio URL"
            value={contact.portfolio}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-slate-800 outline-none"
          />

          <button
            type="submit"
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 rounded-lg flex justify-center items-center gap-2 text-lg font-semibold"
          >
            <FaSave />
            {contact.id ? "Update Contact" : "Save Contact"}
          </button>

        </form>

      </div>

    </section>

  );
}

export default ManageContact;