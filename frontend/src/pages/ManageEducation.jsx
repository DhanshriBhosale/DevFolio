import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function ManageEducation() {

  const [educations, setEducations] = useState([]);

  const [education, setEducation] = useState({
    degree: "",
    college: "",
    year: "",
    cgpa: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/education");
      setEducations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const addEducation = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `http://localhost:8080/api/education/${editingId}`,
          education
        );

        alert("Education Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:8080/api/education",
          education
        );

        alert("Education Added Successfully");

      }

      setEducation({
        degree: "",
        college: "",
        year: "",
        cgpa: "",
      });

      setEditingId(null);

      loadEducation();

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const editEducation = (item) => {

    setEducation({
      degree: item.degree,
      college: item.college,
      year: item.year,
      cgpa: item.cgpa,
    });

    setEditingId(item.id);
  };

  const deleteEducation = async (id) => {

    if (!window.confirm("Delete Education?")) return;

    try {

      await axios.delete(
        `http://localhost:8080/api/education/${id}`
      );

      loadEducation();

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <section className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-yellow-400">
          Manage Education
        </h1>

        <Link
          to="/admin/dashboard"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg flex gap-2 items-center"
        >
          <FaArrowLeft />
          Dashboard
        </Link>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Form */}

        <div className="bg-slate-900 p-6 rounded-xl">

          <h2 className="text-2xl mb-5 flex gap-2 items-center">
            <FaPlus />
            {editingId ? "Update Education" : "Add Education"}
          </h2>

          <form onSubmit={addEducation} className="space-y-4">

            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={education.degree}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
              required
            />

            <input
              type="text"
              name="college"
              placeholder="College"
              value={education.college}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
              required
            />

            <input
              type="text"
              name="year"
              placeholder="Passing Year"
              value={education.year}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
              required
            />

            <input
              type="text"
              name="cgpa"
              placeholder="CGPA"
              value={education.cgpa}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 rounded"
            >
              {editingId ? "Update Education" : "Add Education"}
            </button>

          </form>

        </div>

        {/* Education List */}

        <div className="bg-slate-900 p-6 rounded-xl">

          <h2 className="text-2xl mb-5">
            Education List
          </h2>

          {educations.length === 0 ? (

            <p>No Education Found</p>

          ) : (

            educations.map((item) => (

              <div
                key={item.id}
                className="bg-slate-800 p-4 rounded-lg mb-4"
              >

                <h3 className="text-xl font-bold text-yellow-400">
                  {item.degree}
                </h3>

                <p>{item.college}</p>

                <p>{item.year}</p>

                <p>{item.cgpa}</p>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => editEducation(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEducation(item.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded flex items-center gap-2"
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

export default ManageEducation;