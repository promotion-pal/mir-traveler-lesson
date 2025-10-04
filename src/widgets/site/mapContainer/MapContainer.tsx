"use client";

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";

import { cn } from "@/shared/lib/utils";
import {
  MapContainer as LeafletMapContainer,
  MapContainerProps as LeafletMapContainerProps,
  Marker,
  MarkerProps,
  TileLayer,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

interface BaloonProps extends Omit<MarkerProps, "icon"> {
  text: string;
  photoUrl?: string;
}

function Baloon({ text, ...props }: BaloonProps) {
  return (
    <Marker
      icon={L.divIcon({
        className: "leaflet-baloon-wrapper",
        html: `<div class="leaflet-baloon">${text}</div>`,
        iconSize: [1, 1],
      })}
      {...props}
    />
  );
}

const iconCreateFunction = function (cluster: any) {
  return L.divIcon({
    html: `<div class="leaflet-baloon">${cluster.getChildCount()}</div>`,
    className: "leaflet-baloon-wrapper",
    iconSize: [1, 1],
  });
};

interface MapContainerProps extends LeafletMapContainerProps {
  points: { key: string | number; position: [number, number]; text: string }[];
  className?: string;
  photoUrl?: string;
}

export default function MapContainer({
  center,
  points,
  className,
  photoUrl,
}: MapContainerProps) {
  return (
    <LeafletMapContainer
      // className='leaflet-map'
      className={cn("rounded-lg z-0", className)}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup
        showCoverageOnHover={false}
        iconCreateFunction={iconCreateFunction}
      >
        {points.map(({ key, position, text }) => (
          <Baloon
            key={key}
            position={position}
            text={text}
            photoUrl={photoUrl}
          />
        ))}
      </MarkerClusterGroup>
    </LeafletMapContainer>
  );
}
