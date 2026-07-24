import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaArrowLeft, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function ManageProjects() {
  const [projects, setProjects] = useState([]);

  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };




  const handleImage = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      "http://localhost:8080/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setProject((prev) => ({
      ...prev,
      image: res.data,
    }));

    alert("Image Uploaded Successfully");
  } catch (err) {
    console.log(err);
    alert("Image Upload Failed");
  }
};

  const addProject = async (e) => {
    if (!project.image) {
  alert("Please upload project image first.");
  return;
}
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8080/api/projects/${editingId}`,
          project
        );

        alert("Project Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:8080/api/projects",
          project
        );

        alert("Project Added Successfully");
      }

      setProject({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        image: "",
      });

      setEditingId(null);

      loadProjects();

    }catch (err) {
  console.log("========== PROJECT ERROR ==========");

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Data:", err.response.data);
  } else if (err.request) {
    console.log("No Response");
    console.log(err.request);
  } else {
    console.log(err.message);
  }

  console.log("==================================");

  alert("Operation Failed");
}
  };

  const editProject = (item) => {
    setProject({
      title: item.title,
      description: item.description,
      techStack: item.techStack,
      githubLink: item.githubLink,
      image: item.image,
    });

    setEditingId(item.id);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/projects/${id}`);
      loadProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-cyan-400">
          Manage Projects
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
            {editingId ? "Update Project" : "Add Project"}
          </h2>

          <form onSubmit={addProject} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={project.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
              required
            />

            <textarea
              rows="4"
              name="description"
              placeholder="Description"
              value={project.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
            />

            <input
              type="text"
              name="techStack"
              placeholder="Tech Stack"
              value={project.techStack}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
            />

            <input
              type="text"
              name="githubLink"
              placeholder="GitHub Link"
              value={project.githubLink}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800"
            />

         <div>
  <label className="block mb-2 text-sm text-gray-300">
    Project Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
    className="w-full p-3 rounded bg-slate-800"
  />

  {project.image && (
    <img
      src={project.image}
      alt="Preview"
      className="mt-4 h-40 w-full object-cover rounded-lg border border-slate-700"
    />
  )}
</div>  <button
              type="submit"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded"
            >
              {editingId ? "Update Project" : "Add Project"}
            </button>

          </form>

        </div>

        {/* Project List */}

        <div className="bg-slate-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            All Projects
          </h2>

          {projects.length === 0 ? (
            <p>No Projects Found</p>
          ) : (
            projects.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800 rounded-lg p-4 mb-4"
              >

                <h3 className="text-xl font-bold text-cyan-400">
                  {item.title}
                </h3>

                <p className="mt-2">{item.description}</p>

                <p className="mt-2">
                  <b>Tech:</b> {item.techStack}
                </p>

                <a
                  href={item.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 block mt-2"
                >
                  GitHub Link
                </a>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => editProject(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProject(item.id)}
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

export default ManageProjects;