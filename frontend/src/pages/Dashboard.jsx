function Dashboard() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex">

      <div className="w-64 bg-slate-900 p-6">

        <h2 className="text-3xl font-bold text-cyan-400 mb-10">
          Admin
        </h2>

        <ul className="space-y-5">

          <li className="cursor-pointer hover:text-cyan-400">
            Dashboard
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Projects
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Skills
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Certificates
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Education
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Contact Messages
          </li>

          <li className="cursor-pointer hover:text-red-400">
            Logout
          </li>

        </ul>

      </div>

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-cyan-400 text-4xl">10</h2>
            <p>Total Projects</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-cyan-400 text-4xl">12</h2>
            <p>Certificates</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-cyan-400 text-4xl">8</h2>
            <p>Skills</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl">
            <h2 className="text-cyan-400 text-4xl">25</h2>
            <p>Messages</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;
