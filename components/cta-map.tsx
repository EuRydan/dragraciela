"use client"

import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from "@/components/ui/map"

export default function CTAMap() {
  const latitude = -23.0201231
  const longitude = -43.4862014

  return (
    <div className="cta-map-wrapper">
      <Map 
        theme="dark" 
        center={[longitude, latitude]} 
        zoom={15}
        className="w-full h-full"
      >
        <MapControls showZoom={true} showCompass={false} />
        <MapMarker longitude={longitude} latitude={latitude}>
          <MarkerContent>
            {/* pulsing premium marker */}
            <div className="relative flex h-10 w-10 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <div 
                className="relative h-5 w-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                style={{ background: "#6B0E08" }}
              >
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="p-2 font-sans text-left min-w-[150px]">
              <div className="text-sm font-semibold text-gray-900 mb-0.5">Dra. Graciela</div>
              <div className="text-xs text-gray-600">Av. das Américas, 19005</div>
              <div className="text-[10px] text-gray-400 mt-1">Recreio dos Bandeirantes, RJ</div>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </div>
  )
}
