import {React, useEffect, useRef, useState} from 'react'
import mapboxgl, { getRTLTextPluginStatus } from 'mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';


import 'mapbox-gl/dist/mapbox-gl.css';
import './TripMap.css';
let x = "https://api.mapbox.com/directions/v5/mapbox/driving/152.99141492007297,-27.497658078942994;153.01399090738528,-27.499044512348025?steps=true&access_token=pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"
const access_token = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"

mapboxgl.accessToken = access_token;
mapboxgl.workerClass = MapboxWorker;

function TripMap(props) {
    const ref = useRef(null);
    const [map, setMap] = useState(null);
    let [center, setCenter] = useState(0);
    const [route, setRoute] = useState(null);
    const [markers, setMarkers] = useState(null)
    
    let firstCo = [152.99141492007297, -27.497658078942994];
    let secondCo = [153.01399090738528, -27.499044512348025];
    
   
    useEffect(() => {
      
      if (props.locations[0] != 0 && props.locations[1] != 0) {
        //console.log("Coords updated")
        firstCo = props.locations[0]
        secondCo = props.locations[1]
      }
      
      let call = "https://api.mapbox.com/directions/v5/mapbox/driving/" + firstCo + ";" + secondCo
      + "?overview=simplified&geometries=geojson&access_token=" + "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q";
      
      async function addRoute(map) {
        let des = {}

        await fetch(call).
        then(response => response.json()).
        then(data => {
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
            //console.log("Updating data")
            //console.log(map.getSource('route'))
            map.getSource('route').setData({
              'type': 'Feature',
              'properties': {},
              'geometry': {
              'type': 'LineString',
              'coordinates': des.routes[0].geometry.coordinates
              }})
          }
          props.updateBookTrip("duration", des.routes[0].duration)
        });
      };
      
      if (ref.current && !map) {
        //console.log(call)
        let dd = fetch("https://api.mapbox.com/directions/v5/mapbox/driving/" + firstCo + ";" + secondCo
        + "?geometries=geojson&access_token=" + "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q").
        then(response => response.json()).
        then(data => {
            //console.log("HERES THE DATA")
            //console.log(data)
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
        markers[1].setLngLat(firstCo)
        markers[0].setLngLat(secondCo)
        map.fitBounds([firstCo, secondCo], {padding: 125})
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