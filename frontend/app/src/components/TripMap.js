import {React, useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';


import 'mapbox-gl/dist/mapbox-gl.css';
import './TripMap.css';
// let x = "https://api.mapbox.com/directions/v5/mapbox/driving/152.99141492007297,-27.497658078942994;153.01399090738528,-27.499044512348025?steps=true&access_token=pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"
const access_token = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"

mapboxgl.accessToken = access_token;
mapboxgl.workerClass = MapboxWorker;

function TripMap(props) {
    const ref = useRef(null);
    const [map, setMap] = useState(null);
    let [center, setCenter] = useState(0);
    // const [route, setRoute] = useState(null);
    const [markers, setMarkers] = useState(null)
    
    let firstCo = [0, 0];
    let secondCo = [0, 0];
    
   
    useEffect(() => {
      
      if (props.tProps.setFlag) {
        firstCo = props.tProps.home_coords;
        secondCo = props.tProps.end_coords;
      } else if (props.locations[0] !== 0 && props.locations[1] !== 0) {
        // eslint-disable-next-line
        firstCo = props.locations[0]
        // eslint-disable-next-line
        secondCo = props.locations[1]
      }
      
      // eslint-disable-next-line
      let call = "https://api.mapbox.com/directions/v5/mapbox/driving/" + firstCo + ";" + secondCo
      // eslint-disable-next-line
      + "?overview=simplified&geometries=geojson&access_token=" + "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q";
      
      async function addRoute(map) {
        let des = {}

        await fetch(call)
        .then(response => response.json())
        .then(data => {
        des = data
        if (!map.getSource('route')) {
          map.addSource('route', {
            'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': des.routes[0].geometry.coordinates
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
          //console.log(des)
          } else {
            map.getSource('route').setData({
              'type': 'Feature',
              'properties': {},
              'geometry': {
              'type': 'LineString',
              'coordinates': des.routes[0].geometry.coordinates
              }})
          }
          props.updateBookTrip("route", des.routes[0].geometry.coordinates)
          props.updateBookTrip("duration", des.routes[0].duration)
        });
      };

      if (props.tProps.setFlag) {
        firstCo = props.tProps.home_coords;
        secondCo = props.tProps.end_coords;
      }

      if (ref.current && !map) {
        fetch("https://api.mapbox.com/directions/v5/mapbox/driving/" + firstCo + ";" + secondCo
        // eslint-disable-next-line
        + "?geometries=geojson&access_token=" + "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q")
        .then(response => response.json())
        .then(data => {
          })
          const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [153.01399090738528, -27.499044512348025],
          zoom: 12
        });
        map.on('load', () => {
          const startMarker = new mapboxgl.Marker({
            draggable: false,
            color: "red"
          })
          .setLngLat(firstCo)
          .addTo(map);
  
          const endMarker = new mapboxgl.Marker({
            draggable: false,
            color: "green"
          })
          .setLngLat(secondCo)
          .addTo(map);
  
          setMarkers([startMarker, endMarker])
          addRoute(map);
          setMap(map);
        })
      } else {
        const mark = document.createElement('div');
        mark.className = 'custom-marker';
        
        //If the user has selected a tutorial slot, prefill the booking screen with the tutorial props (tProps)
       

        if (markers[1]._lngLat.lng != firstCo[0] && markers[1]._lngLat.lat != firstCo[1]) {
          markers[1].setLngLat(firstCo)
        }
        if (markers[0]._lngLat.lng != secondCo[0] && markers[0]._lngLat.lat != secondCo[1]) {
          markers[0].setLngLat(secondCo)
        }
        if (!(firstCo[0] == 0 && firstCo[1] == 0 && secondCo[0] == 0 && secondCo[0] == 0)) {
          map.fitBounds([firstCo, secondCo], {padding: 125})
        } 

        if (map.getCenter().lat != center.lat && map.getCenter().lng != center.lng) {
          setCenter(map.getCenter())
          props.updateBookTrip("center", [map.getCenter().lng, map.getCenter().lat])
        }
        addRoute(map)
      }
    });
    return (
      <>
      <div className="map" ref={ref} />;
      </>
    )
  }

  export default TripMap;