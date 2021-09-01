import {React, useEffect, useRef, useState} from 'react'
import mapboxgl, { getRTLTextPluginStatus } from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';


import 'mapbox-gl/dist/mapbox-gl.css';
import './TripMap.css'

mapboxgl.accessToken = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q";
mapboxgl.workerClass = MapboxWorker;
let firstCo = [152.99141492007297, -27.497658078942994];
let secondCo = [153.01399090738528, -27.499044512348025];


function TripMap() {
    const ref = useRef(null);
    const [map, setMap] = useState(null);
    useEffect(() => {
      if (ref.current && !map) {
        
        let dd = fetch("https://api.mapbox.com/directions/v5/mapbox/driving/" + firstCo + ";" + secondCo
        + "?geometries=geojson&access_token=" + "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q").
        then(response => response.json()).
        then(data => {
            dd = data
          })
          const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [153.01399090738528, -27.499044512348025],
          zoom: 12
        });

        map.on('load', () => {
          const mark = document.createElement('div');
          mark.className = 'custom-marker';

          const startMarker = new mapboxgl.Marker({
            draggable: true,
            color: "red"
          })
          .setLngLat(firstCo)
          .addTo(map);

          const endMarker = new mapboxgl.Marker({
            draggable: true,
            color: "green"
          })
          .setLngLat(secondCo)
          .addTo(map);
          addRoute();

          })
          async function addRoute() {
            let des = {}
            await fetch("https://api.mapbox.com/directions/v5/mapbox/driving/152.99141492007297,%20-27.497658078942994;153.01399090738528,%20-27.499044512348025?geometries=geojson&access_token=pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q").
            then(response => response.json()).
            then(data => {
            des = data
            map.addSource('route', {
              'type': 'geojson',
              'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
              'type': 'LineString',
              'coordinates': des.waypoints
              }
              }
              });
              map.addLayer({
              'id': 'route',
              'type': 'line',
              'source': 'route',
              'layout': {
              'line-join': 'round',
              'line-cap': 'round'
              },
              'paint': {
              'line-color': '#888',
              'line-width': 8
              }
              });
            console.log(des)
            });
          };

        setMap(map);
      }
    }, [ref, map]);
    return <div className="map" ref={ref} />;
  }

  export default TripMap;