import { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";

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

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-14">
        Certificates
      </h1>

      <div className="max-w-6xl mx-auto">

        {certificates.length === 0 ? (

          <div className="text-center text-gray-400 text-xl">
            No Certificates Available
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {certificates.map((certificate) => (

              <div
                key={certificate.id}
                className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden hover:border-pink-500 hover:shadow-xl hover:shadow-pink-500/20 hover:-translate-y-2 duration-300"
              >

                {/* PDF Preview */}

                <div className="h-60 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex flex-col justify-center items-center border-b border-slate-700">

                  <div className="bg-red-500 p-6 rounded-full shadow-lg shadow-red-500/40">

                    <FaFilePdf className="text-white text-7xl" />

                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-white">
                    PDF Certificate
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Click below to view
                  </p>

                </div>

                {/* Details */}

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-pink-400">
                    {certificate.title}
                  </h2>

                  <div className="mt-5 space-y-2">

                    <p className="text-gray-300">
                      <span className="font-semibold text-white">
                        Issued By :
                      </span>{" "}
                      {certificate.issuer}
                    </p>

                    <p className="text-gray-300">
                      <span className="font-semibold text-white">
                        Year :
                      </span>{" "}
                      {certificate.year}
                    </p>

                  </div>

                  <a
                    href={certificate.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 block text-center bg-pink-500 hover:bg-pink-600 py-3 rounded-xl text-white font-semibold duration-300"
                  >
                    View Certificate
                  </a>

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
