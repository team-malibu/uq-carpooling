import BasicPage from '../../components/BasicPage';
import {React, useEffect, useLayoutEffect, useRef, useState} from 'react';
import mapboxgl, { getRTLTextPluginStatus } from 'mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../../components/TripMap.css';
import { useLocation } from 'react-router';

function TripVisualiser(props) {
    const location = useLocation();
    var tripProps = location.trip;
    const access_token = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"
    mapboxgl.accessToken = access_token;
    mapboxgl.workerClass = MapboxWorker;

    function GetTripVisualiser(props) {
        const ref = useRef(null);
        const [map, setMap] = useState(null);
        let route = props.tripProps.route_string;
        let markerCoords = String(props.tripProps.intermediate_coordinates).split(';');
        markerCoords.pop();
        let markerArray = []
        markerCoords.forEach((element) => {
            let specificCoords = String(element).split(',');
            markerArray.push([Number(specificCoords[0]), Number(specificCoords[1])]);
        })
        let firstCo = [props.tripProps.start_long, props.tripProps.start_lat];
        let endCo = [props.tripProps.end_long, props.tripProps.end_lat];
        let markerFeatures = [];
    
        useEffect(() => {
    
        function addRoute(map) {
        var re = /-?\d+.{1}\d+,-?\d+.{1}\d+/g;
        var coordList = []
        //Some fun regexing that required serious research onto the javascript docs, basicaly matches the route string which currently doesn't separate lng, lat
        for (let match = re.exec(route); match != null; match = re.exec(route)) {
            let strCoords = match[0].split(',');
            if (strCoords.length != 2) {
                continue;
            }
            let coord = [Number(strCoords[0]), Number(strCoords[1])];
            coordList.push(coord)
        }
        
        if (!map.getSource('route')) {
                map.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                        'type': 'LineString',
                        'coordinates': coordList
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

            for (let markerCo of markerArray) {
              const marker = new mapboxgl.Marker({
                draggable: false,
                color: "blue"
              })
              .setLngLat(markerCo)
              .addTo(map);
              markerFeatures.push(marker);
            }
            const endMarker = new mapboxgl.Marker({
                draggable: false,
                color: "red"
            })
            .setLngLat(endCo)
            .addTo(map);
            addRoute(map);
            setMap(map);
            map.fitBounds([firstCo, endCo], {padding: 125});
            addRoute(map)
            });
        } 
        });
        return (
            <div className="map" ref={ref} />
        )
    }

    return (
        <BasicPage currentlySelected={2} name='Trip Visualiser' previousPage='/Trips' hide={false} direction={props.direction} key={props.location.key} custom={props.direction} update_direction={props.update_direction} body={GetTripVisualiser({props: props, tripProps: tripProps})} default={props.default} key={props.key} custom={props.custom} />
    )
}

export default TripVisualiser
