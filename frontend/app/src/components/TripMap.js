import {React, useEffect, useRef, useState} from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import mapboxgl from 'mapbox-gl';
import './TripMap.css'

mapboxgl.accessToken = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q";

function TripMap() {
    const ref = useRef(null);
    const [map, setMap] = useState(null);
    useEffect(() => {
      if (ref.current && !map) {
        const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [153.01399090738528, -27.499044512348025],
          zoom: 15
        });
        map.on('load', () => {
          const marker = new mapboxgl.Marker({
            color: "#FFFFFF",
            draggable: true
          })
          .setLngLat([153.01399090738528, -27.499044512348025])
          .addTo(map);
          console.log(marker);
        });
        setMap(map);
      }
    }, [ref, map]);
    return <div className="map" ref={ref} />;
  }

  export default TripMap;