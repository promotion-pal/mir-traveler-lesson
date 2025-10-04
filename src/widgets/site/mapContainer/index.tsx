import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("./MapContainer"), {
  ssr: false,
  loading: () => (
    <div className="h-full animate-pulse rounded-xl bg-gray-200" />
  ),
});

export default MapContainer;
