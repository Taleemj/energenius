"use client";
import { useEffect, useState, useRef, FC } from "react";
import Globe from "react-globe.gl";
import { MeshPhongMaterial } from "three";
import { useRouter } from "next/navigation";
import { GlobeMethods } from "react-globe.gl";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { useParams } from "next/navigation";

interface Props {
  centerCoordinates: [number, number];
}
const WorldGlobe: FC<Props> = ({ centerCoordinates }) => {
  const params = useParams();
  const router = useRouter();
  const globeRef = useRef<GlobeMethods | undefined>();
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [geoLocations, setGeoLocations] = useState<any>(null);

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="grey" cx="14" cy="14" r="7"></circle>
  </svg>`;

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

    if (!geoJsonData) {
      fetch("/maps/countries.geojson")
        .then((response) => response.json())
        .then((data) => setGeoJsonData(data));
    }

    if (!geoLocations) {
      fetch("/maps/locations.geojson")
        .then((response) => response.json())
        .then((data) =>
          setGeoLocations(
            data.features.map((d: any) => ({
              lat: d.geometry.coordinates[1],
              lng: d.geometry.coordinates[0],
              size: 30,
              properties: {
                ...d.properties,
              },
            }))
          )
        );
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const recenterGlobe = () => {
    if (globeRef.current) {
      if (windowWidth > 768) {
        globeRef.current.pointOfView({ lat: 38, lng: -99, altitude: 2.5 }, 600);
        setWindowHeight(window.innerHeight);
      } else {
        globeRef.current.pointOfView({ lat: 38, lng: -99, altitude: 3.5 }, 600);
        setWindowHeight(window.innerHeight * 0.7);
      }
    }
  };
  useEffect(() => {
    if (geoLocations && params?.slug) {
      if (globeRef.current) {
        geoLocations.map((d: any) => {
          if (d.properties.href.includes(params.slug)) {
            globeRef.current?.pointOfView({ lat: d.lat, lng: d.lng, altitude: 0.7 }, 600);
          }
        });
      }
    } else if (!params?.slug) {
      recenterGlobe();
    }
  }, [params, geoLocations, globeRef.current]);

  const locationClick = (d: any) => {
    router.push(d.properties.href);

    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: d.lat, lng: d.lng, altitude: 0.7 }, 600);
    }
  };

  useEffect(() => {
    if (centerCoordinates[0] !== 0 && centerCoordinates[1] !== 0) {
      globeRef.current?.pointOfView({ lat: centerCoordinates[1], lng: centerCoordinates[0], altitude: 0.7 }, 600);
    }
  }, [centerCoordinates, globeRef.current]);

  return (
    <div className="fixed w-[100vw] h-[100vh] z-[-1] flex items-start justify-start top-[10px] left-0">
      <Globe
        width={windowWidth}
        height={windowHeight}
        atmosphereAltitude={0.45}
        backgroundColor="rgba(19,28,39,0)"
        animateIn={true}
        ref={globeRef}
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
        htmlElementsData={geoLocations ? geoLocations : []}
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.innerHTML = `${markerSvg} <p>${d.properties.name}</p>`;
          el.classList.add("marker");
          el.style.width = `${d.size}px`;
          // @ts-ignore
          el.style["pointer-events"] = "auto";
          el.style.cursor = "pointer";
          el.onclick = () => locationClick(d);
          return el;
        }}
      />
      <FaCompressArrowsAlt
        onClick={recenterGlobe}
        className="fixed bottom-[45%] md:bottom-10 right-5 cursor-pointer text-[20px] md:text-[30px] z-20"
      />
    </div>
  );
};

export default WorldGlobe;
