import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Importar imágenes directamente (solución para Vite)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configurar iconos para Leaflet
const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function TankInfo({ data }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!data?.latitud || !data?.longitud) return;

    // Limpiar mapa existente
    if (mapRef.current) {
      mapRef.current.off();
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Crear nuevo mapa
    const map = L.map("map", {
      preferCanvas: true,
      zoomControl: false,
    }).setView([data.latitud, data.longitud], 13);
    mapRef.current = map;

    // Añadir capa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      detectRetina: true,
    }).addTo(map);

    // Limpiar marcador anterior
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    // Añadir nuevo marcador con el icono configurado
    const marker = L.marker([data.latitud, data.longitud], {
      icon: defaultIcon,
    })
      .addTo(map)
      .bindPopup("Tu ubicación GPS")
      .openPopup();
    markerRef.current = marker;

    // Limpieza
    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerRef.current = null;
    };
  }, [data]);

  if (!data) return <p>No hay conexión con el servidor.</p>;
  if (typeof data.level === "undefined") return <p>Cargando datos...</p>;

  return (
    <div className="p-6 space-y-6 bg-white shadow-md rounded-xl max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold text-[#183b62] mb-4">Datos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Volumen", value: `${data.volume ?? "N/A"} L` },
          { label: "Nivel", value: `${data.level ?? "N/A"} %` },
          { label: "Latitud", value: data.latitud ?? "N/A" },
          { label: "Longitud", value: data.longitud ?? "N/A" },
          { label: "Satélites", value: data.satellites ?? "N/A" },
          { label: "Altitud", value: `${data.altitud ?? "N/A"} m` },
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 bg-[#f9f9f9] rounded-lg shadow-sm border border-gray-200"
          >
            <p className="text-sm text-[#535859] font-semibold mb-1">
              {item.label}
            </p>
            <p className="text-[#183b62] text-lg font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Animación de nivel */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-[#183b62] mb-4">
          Nivel del tanque
        </h2>

        {/* Contenedor principal del camión */}
        <div className="flex items-end">
          {/* Cabina del camión (opcional) */}
          <div className="h-16 w-20 bg-red-500 rounded-l-lg mr-2 flex items-center justify-center">
            <span className="text-white text-xs">VOLVO</span>
          </div>

          {/* Tanque de combustible horizontal */}
          <div className="relative h-16 w-64 border-4 border-[#4c7e7d] rounded-r-lg overflow-hidden bg-gray-100">
            {/* Nivel de combustible */}
            <div
              className="absolute bottom-0 left-0 h-full transition-all duration-700 ease-in-out"
              style={{
                width: `${data.level ?? 0}%`,
                background: "linear-gradient(to right, #4c7e7d, #89b6a7)",
              }}
            />

            {/* Marcadores de nivel */}
            <div className="absolute inset-0 flex">
              {[0, 25, 50, 75, 100].map((mark) => (
                <div
                  key={mark}
                  className="h-full w-px bg-black opacity-20 absolute"
                  style={{ left: `${mark}%` }}
                />
              ))}
            </div>

            {/* Indicador de porcentaje */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold bg-white bg-opacity-70 px-2 py-1 rounded">
                {data.level ?? 0}%
              </span>
            </div>
          </div>
        </div>

       
      </div>

      {/* Mapa */}
      <div>
        <h1 className="text-2xl font-bold text-[#183b62] mb-2">Mapa</h1>
        <div
          id="map"
          key={`map-${data.latitud}-${data.longitud}`}
          className="h-[400px] w-full rounded-lg border border-[#535859] shadow-sm z-10"
        />
      </div>
    </div>
  );
}

export default TankInfo;
