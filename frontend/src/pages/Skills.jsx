import { useEffect, useState } from "react";
import axios from "axios";

function Skills() {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center text-white">
        <h2 className="text-2xl font-bold">Loading Skills...</h2>
      </section>
    );
  }

  return (

    <section className="min-h-screen px-5 sm:px-8 md:px-12 py-20">

      <h1 className="text-3xl sm:text-4xl md:text-5xl text-white text-center font-bold mb-12">
        My Skills
      </h1>

      <div className="max-w-6xl mx-auto">

        {skills.length === 0 ? (

          <div className="text-center text-gray-400 text-lg sm:text-xl">
            No Skills Available
          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {skills.map((skill) => (

              <div
                key={skill.id}
                className="bg-slate-900 border border-slate-700 rounded-xl p-5 text-center hover:border-cyan-400 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/20 duration-300"
              >

                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-cyan-400 break-words">
                  {skill.name}
                </h2>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}

export default Skills;
