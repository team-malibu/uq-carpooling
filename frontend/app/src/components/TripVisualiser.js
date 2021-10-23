import {React, useEffect, useRef, useState} from 'react'
import mapboxgl, { getRTLTextPluginStatus } from 'mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';


import 'mapbox-gl/dist/mapbox-gl.css';
import './TripMap.css';

const access_token = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"

mapboxgl.accessToken = access_token;
mapboxgl.workerClass = MapboxWorker;

function TripMap(props) {
    const ref = useRef(null);
    const [map, setMap] = useState(null);
    const route = props.route;
    const markerCoords = props.markerCoords;
    const firstCo = [props.startLong, props.startLat];
    const firstCo = [props.endLong, props.endLat];
    let markerFeatures = [];
   
    useEffect(() => {

      function addRoute(map) {
      if (!map.getSource('route')) {
        map.addSource('route', {
          'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': route
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
          'line-color': "purple",
          'line-width': 8
          }
          });
        } 
      };
      
      if (ref.current && !map) {
          const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [153.01399090738528, -27.499044512348025],
          zoom: 12
      });

        map.on('load', () => {
          const startMarker = new mapboxgl.Marker({
            draggable: false,
            color: "green"
          })
          .setLngLat(firstCo)
          .addTo(map);

          // for (marker of markerCoords) {
          //   const marker = new mapboxgl.Marker({
          //     draggable: false,
          //     color: "blue"
          //   })
          //   .setLngLat(marker)
          //   .addTo(map);
          // }
          const endMarker = new mapboxgl.Marker({
            draggable: false,
            color: "red"
          })
          .setLngLat(endCo)
          .addTo(map);
  
          setMarkers(markerFeatures)
          addRoute(map);
          setMap(map);
          
        addRoute(map)
        });
      } 
    });
    return (
      <>
      <div className="map" ref={ref} />;
      </>
    )
  }

  export default TripMap;