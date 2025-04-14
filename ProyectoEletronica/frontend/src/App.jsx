import { useEffect, useState } from "react";
import { fetchTankStatus, fetchSimulatedData } from "./services/api";
import TankInfo from "./components/TankInfo";
import Navbar from "./components/NavBar";

function App() {
  const [data, setData] = useState(null);
  const [simulate, setSimulate] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const status = simulate
        ? await fetchSimulatedData()
        : await fetchTankStatus();
      setData(status);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [simulate]);

  return (
    <>
      <div className="min-h-screen bg-[#efefef]">
        <Navbar />
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-[#183b62]">
              Estado del Tanque
            </h1>

            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-md
          ${
            simulate
              ? "bg-[#cd202d] hover:bg-[#b91d2f]"
              : "bg-[#1e5a9b] hover:bg-[#17598a]"
          } text-white`}
              onClick={() => setSimulate(!simulate)}
            >
              {simulate ? "Usar datos reales" : "Simular datos"}
            </button>
          </div>

          <TankInfo data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
