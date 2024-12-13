import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import { Map } from "../utils/map"; // Certifique-se que esse Map é compatível com a API do Google Maps
import { getCurrentPosition } from "./geolocation"; // Certifique-se que essa função está retornando as coordenadas corretas

export function useMap(containerRef: React.RefObject<HTMLDivElement>) {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    if (!containerRef.current) {
      console.error("Container do mapa não está disponível.");
      return;
    }

    (async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          libraries: ["routes", "geometry", "marker"],
        });

        const [, , , position] = await Promise.all([
          loader.importLibrary("routes"),
          loader.importLibrary("geometry"),
          loader.importLibrary("marker"),
          getCurrentPosition({ enableHighAccuracy: true }).catch(() => ({
            lat: -23.55052,
            lng: -46.633308,
          })),
        ]);

        console.log("Container do mapa:", containerRef.current);
        console.log("Posição inicial do mapa:", position);

        const map = new Map(containerRef.current, {
          mapId: "8e0a97af9386fef",
          zoom: 15,
          center: position,
        });

        setMap(map);
      } catch (error) {
        console.error("Erro ao inicializar o mapa:", error);
      }
    })();
  }, [containerRef]);

  return map;
}
