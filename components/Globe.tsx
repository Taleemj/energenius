"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });
import { MeshPhongMaterial } from "three";

const WorldGlobe = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [geoJsonData, setGeoJsonData] = useState(null);

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="grey" cx="14" cy="14" r="7"></circle>
  </svg>`;

  const N = 30;
  // @ts-ignore
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 7 + Math.random() * 30,
    color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
  }));

  useEffect(() => {
    fetch("/maps/countries.geojson")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed w-[100vw] h-[100vh] z-[-1] top-[10px] left-0">
      <Globe
        width={windowWidth}
        height={windowHeight}
        atmosphereAltitude={0.45}
        backgroundColor="rgba(19,28,39,0)"
        animateIn={true}
        // @ts-ignore
        polygonsData={geoJsonData ? geoJsonData.features : []}
        polygonAltitude={0.01}
        polygonCapColor={() => "#07B5E6"}
        polygonSideColor={() => "#07B5E6"}
        polygonStrokeColor={() => "#fff"}
        // @ts-ignore
        polygonLabel={({ properties }) => `
          <b>${properties.NAME}</b>
        `}
        polygonsTransitionDuration={300}
        globeMaterial={
          new MeshPhongMaterial({
            color: 0x003468,
          })
        }
        htmlElementsData={gData}
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.innerHTML = markerSvg;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;
          // @ts-ignore
          el.style["pointer-events"] = "auto";
          el.style.cursor = "pointer";
          el.onclick = () => console.info(d);
          return el;
        }}
      />
    </div>
  );
};

export default WorldGlobe;
