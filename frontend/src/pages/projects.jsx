import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/api/projects"
      );

      setProjects(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center text-white">
        <h2 className="text-2xl font-bold">Loading Projects...</h2>
      </section>
    );
  }

  return (

    <section className="min-h-screen py-20 px-5 sm:px-8 md:px-12">

      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-white font-bold mb-12">
        My Projects
      </h1>

      {projects.length === 0 ? (

        <div className="text-center text-gray-400 text-lg sm:text-xl">
          No Projects Available
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (

            <div
              key={project.id}
              className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-cyan-500/20 hover:shadow-xl duration-300"
            >

              <img
                src={
                  project.image
                    ? project.image
                    : "https://via.placeholder.com/600x350?text=Project+Image"
                }
                alt={project.title}
                className="w-full h-48 sm:h-56 object-cover"
              />

              <div className="p-6">

                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400">
                  {project.title}
                </h2>

                <p className="text-gray-300 mt-3 text-sm sm:text-base leading-7">
                  {project.description}
                </p>

                <p className="mt-4 text-sm text-gray-400 break-words">
                  <span className="font-semibold text-white">
                    Tech Stack:
                  </span>{" "}
                  {project.techStack}
                </p>

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block w-full text-center bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold duration-300"
                  >
                    View GitHub
                  </a>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}

export default Projects;