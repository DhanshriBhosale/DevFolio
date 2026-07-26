import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function ManageSkills() {

  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await axios.get("https://devfolio-backend-production-0511.up.railway.app/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addSkill = async (e) => {
    e.preventDefault();

    if (skill.trim() === "") return;

    try {

      if (editingId) {

        await axios.put(
          `https://devfolio-backend-production-0511.up.railway.app/api/skills/${editingId}`,
          {
            name: skill,
          }
        );

        alert("Skill Updated Successfully");

      } else {

        await axios.post(
          "https://devfolio-backend-production-0511.up.railway.app/api/skills",
          {
            name: skill,
          }
        );

        alert("Skill Added Successfully");

      }

      setSkill("");
      setEditingId(null);

      loadSkills();

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const editSkill = (item) => {
    setSkill(item.name);
    setEditingId(item.id);
  };

  const deleteSkill = async (id) => {

    if (!window.confirm("Delete Skill?")) return;

    try {

      await axios.delete(
        `https://devfolio-backend-production-0511.up.railway.app/api/skills/${id}`
      );

      loadSkills();

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <section className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-green-400">
          Manage Skills
        </h1>

        <Link
          to="/admin/dashboard"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaArrowLeft />
          Dashboard
        </Link>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Form */}

        <div className="bg-slate-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <FaPlus />
            {editingId ? "Update Skill" : "Add Skill"}
          </h2>

          <form onSubmit={addSkill} className="space-y-4">

            <input
              type="text"
              placeholder="Skill Name"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 outline-none"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg"
            >
              {editingId ? "Update Skill" : "Add Skill"}
            </button>

          </form>

        </div>

        {/* Skills List */}

        <div className="bg-slate-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            All Skills
          </h2>

          {skills.length === 0 ? (
            <p>No Skills Found</p>
          ) : (

            skills.map((item) => (

              <div
                key={item.id}
                className="bg-slate-800 rounded-lg p-4 mb-4 flex justify-between items-center"
              >

                <h3 className="text-xl">
                  {item.name}
                </h3>

                <div className="flex gap-3">

                  <button
                    onClick={() => editSkill(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSkill(item.id)}
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

export default ManageSkills;
