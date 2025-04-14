const Navbar = () => {
  return (
    <nav className="bg-[#183b62] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="../images/logo.webp" alt="Logo EMI" className="h-10 w-10 rounded-3xl" />
          <span className="text-2xl font-bold text-[#efdd86]">Proyecto De Grado</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
