import { useEffect, useState } from "react";
import axios from "axios";

function Education() {

  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {

      const res = await axios.get(
        "https://devfolio-backend-production-0511.up.railway.app/api/education"
      );

      setEducations(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center text-white">
        <h2 className="text-2xl font-bold">
          Loading Education...
        </h2>
      </section>
    );
  }

  return (

    <section className="min-h-screen px-5 sm:px-8 md:px-12 py-20">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
        Education
      </h1>

      <div className="max-w-6xl mx-auto">

        {educations.length === 0 ? (

          <div className="text-center text-gray-400 text-lg sm:text-xl">
            No Education Found
          </div>

        ) : (

          <div className="space-y-8">

            {educations.map((item) => (

              <div
                key={item.id}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-400/20 duration-300"
              >

                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                  {item.degree}
                </h2>

                <h3 className="text-lg sm:text-xl mt-3 text-white">
                  {item.college}
                </h3>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="bg-slate-800 rounded-lg p-4">
                    <span className="font-semibold text-yellow-400">
                      Passing Year
                    </span>
                    <p className="mt-1 text-gray-300">
                      {item.year}
                    </p>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-4">
                    <span className="font-semibold text-yellow-400">
                      CGPA
                    </span>
                    <p className="mt-1 text-gray-300">
                      {item.cgpa}
                    </p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}

export default Education;
