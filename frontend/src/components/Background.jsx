function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">

      <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500 rounded-full blur-[140px] opacity-30"></div>

      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-600 rounded-full blur-[160px] opacity-30"></div>

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500 rounded-full blur-[150px] opacity-20"></div>

    </div>
  );
}

export default Background;