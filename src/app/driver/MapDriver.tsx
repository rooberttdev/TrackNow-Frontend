"use client";

import { useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";
import { socket } from "@/utils/socket-io";


export type MapDriverProps = {
  route_id: string | null ;
}

export function MapDriver(props: MapDriverProps) {
  const { route_id } = props;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = useMap(mapContainerRef as any);

    useEffect(() => {

      if(!map|| !route_id ) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      socket.disconnect() ? socket.connect() : socket.offAny();

      socket.on('connect', () => {
        socket.emit(`client:new-points/${route_id}`)
      })

      socket.on(`server:new-points/${route_id}:list`, (data) =>{

      })
    }, [route_id, map]); 
  
  return <div className="w-full h-screen" ref={mapContainerRef} />;
}