import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function ManageCertificates() {

  const [certificates, setCertificates] = useState([]);

  const [certificate, setCertificate] = useState({
    title: "",
    issuer: "",
    year: "",
    certificateLink: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const res = await axios.get(
        "https://devfolio-backend-production-0511.up.railway.app/api/certificates"
      );
      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCertificate({
      ...certificate,
      [e.target.name]: e.target.value,
    });
  };




  const handleCertificate = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      "https://devfolio-backend-production-0511.up.railway.app/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setCertificate((prev) => ({
      ...prev,
      certificateLink: res.data,
    }));

    alert("Certificate Uploaded Successfully");
  } catch (err) {
    console.log(err);
    alert("Certificate Upload Failed");
  }
};

  const addCertificate = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `https://devfolio-backend-production-0511.up.railway.app/api/certificates/${editingId}`,
          certificate
        );

        alert("Certificate Updated Successfully");

      } else {

        await axios.post(
          "https://devfolio-backend-production-0511.up.railway.app/api/certificates",
          certificate
        );

        alert("Certificate Added Successfully");
      }

      setCertificate({
        title: "",
        issuer: "",
        year: "",
        certificateLink: "",
      });

      setEditingId(null);

      loadCertificates();

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const editCertificate = (item) => {

    setCertificate({
      title: item.title,
      issuer: item.issuer,
      year: item.year,
      certificateLink: item.certificateLink,
    });

    setEditingId(item.id);
  };

  const deleteCertificate = async (id) => {

    if (!window.confirm("Delete this Certificate?"))
      return;

    try {

      await axios.delete(
        `https://devfolio-backend-production-0511.up.railway.app/api/certificates/${id}`
      );

      loadCertificates();

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <section className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-pink-400">
          Manage Certificates
        </h1>

        <Link
          to="/admin/dashboard"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaArrowLeft />
          Dashboard
        </Link>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Form */}

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaPlus />
            {editingId ? "Update Certificate" : "Add Certificate"}
          </h2>

          <form onSubmit={addCertificate} className="space-y-5">

            <input
              type="text"
              name="title"
              placeholder="Certificate Title"
              value={certificate.title}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-800"
              required
            />

            <input
              type="text"
              name="issuer"
              placeholder="Issued By"
              value={certificate.issuer}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-800"
              required
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={certificate.year}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-800"
              required
            />

           <div>
  <label className="block mb-2 text-sm text-gray-300">
    Upload Certificate (PDF / Image)
  </label>

  <input
    type="file"
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={handleCertificate}
    className="w-full p-4 rounded-lg bg-slate-800"
  />

  {certificate.certificateLink && (
    <a
      href={certificate.certificateLink}
      target="_blank"
      rel="noreferrer"
      className="text-green-400 block mt-3"
    >
      ✓ Certificate Uploaded
    </a>
  )}
</div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-pink-500 hover:bg-pink-600"
            >
              {editingId
                ? "Update Certificate"
                : "Add Certificate"}
            </button>

          </form>

        </div>

        {/* List */}

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Certificates
          </h2>

          {certificates.length === 0 ? (

            <p>No Certificates Available</p>

          ) : (

            certificates.map((item) => (

              <div
                key={item.id}
                className="bg-slate-800 rounded-xl p-5 mb-5"
              >

                <h3 className="text-2xl font-bold text-pink-400">
                  {item.title}
                </h3>

                <p className="mt-2">
                  <b>Issued By:</b> {item.issuer}
                </p>

                <p className="mt-2">
                  <b>Year:</b> {item.year}
                </p>

                {item.certificateLink && (
                  <a
                    href={item.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 block mt-3"
                  >
                    View Certificate
                  </a>
                )}

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => editCertificate(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCertificate(item.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </section>
  );
}

export default ManageCertificates;
