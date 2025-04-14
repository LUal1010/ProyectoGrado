const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

let tankStatus = {
  volume: 0,
  level: 0,
  latitud: null,
  longitud: null,
  satellites: null,
  altitud: null,
};

app.use(cors());
app.use(express.json());

app.post("/api/data", (req, res) => {
  tankStatus = req.body;
  console.log("Datos recibidos:", tankStatus);
  res.send({ message: "Datos recibidos" });
});

app.get("/api/tankStatus", (req, res) => {
  res.json(tankStatus);
});

// Ruta para simular datos si no hay sensores conectados
app.get("/api/simulate", (req, res) => {
  tankStatus = {
    volume: Math.floor(Math.random() * 100),
    level: Math.floor(Math.random() * 100),
    latitud: -16.4326 + Math.random() * 0.01,
    longitud: -68.1332 + Math.random() * 0.01,
    satellites: Math.floor(Math.random() * 10),
    altitud: 4050 + Math.random() * 100,
  };
  console.log("Simulación generada:", tankStatus);
  res.json(tankStatus);
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
