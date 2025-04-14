import axios from "axios";

//nst API = "http://localhost:3001/api";
const API = "https://ac9c-189-28-91-154.ngrok-free.app/api";

export const fetchTankStatus = async () => {
  try {
    const response = await axios.get(`${API}/tankStatus`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del tanque:", error);
    return null;
  }
};

export const fetchSimulatedData = async () => {
  try {
    const response = await axios.get(`${API}/simulate`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos simulados:", error);
    return null;
  }
};