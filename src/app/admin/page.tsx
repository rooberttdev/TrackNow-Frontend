"use client"


import { useRef } from "react";
import { useMap } from "../../hooks/useMap";

export function AdminPage(){
 const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useMap(mapContainerRef as any);

  return <div className="w-full h-screen" ref={mapContainerRef} />;
}
 
export default AdminPage;