import { useEffect, useState } from "react";
import axios from "axios";

function Certificates() {

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center text-white">
        <h2 className="text-2xl font-bold">
          Loading Certificates...
        </h2>
      </section>
    );
  }

  return (

    <section className="min-h-screen px-5 sm:px-8 md:px-12 py-20">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
        Certificates
      </h1>

      <div className="max-w-6xl mx-auto">

        {certificates.length === 0 ? (

          <div className="text-center text-gray-400 text-lg sm:text-xl">
            No Certificates Available
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {certificates.map((certificate) => (

              <div
                key={certificate.id}
                className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-pink-400 hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-500/20 duration-300"
              >

                <div className="h-52 flex items-center justify-center bg-slate-800">
                  <h2 className="text-5xl">📄</h2>
                </div>

                <div className="p-6">

                  <h2 className="text-xl sm:text-2xl font-bold text-pink-400">
                    {certificate.title}
                  </h2>

                  <p className="mt-4 text-gray-300">
                    <span className="font-semibold text-white">
                      Issued By:
                    </span>{" "}
                    {certificate.issuer}
                  </p>

                  <p className="mt-2 text-gray-300">
                    <span className="font-semibold text-white">
                      Year:
                    </span>{" "}
                    {certificate.year}
                  </p>

                  {certificate.certificateLink && (
                    <a
                      href={certificate.certificateLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block w-full text-center bg-pink-500 hover:bg-pink-600 py-3 rounded-lg text-white font-semibold duration-300"
                    >
                      View Certificate
                    </a>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}

export default Certificates;
