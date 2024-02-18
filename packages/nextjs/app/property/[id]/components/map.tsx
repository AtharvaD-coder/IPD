
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { useEffect, useRef } from 'react';

export default function Map(){
    const mapContainerRef = useRef(null);
    const ACCESS_TOKEN='pk.eyJ1IjoiYW51cmFnODYiLCJhIjoiY2xtcjdvemQ5MDRnaDJqcXZmdmwzZGk0NCJ9.Rtfd_h0kJc3kwbHuEYUPyw'
    useEffect(() => {
        mapboxgl.accessToken = ACCESS_TOKEN;
        const map = new mapboxgl.Map({
          container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-73.99209, 40.68933],
            zoom: 8.8,
            width:100,
            height:100



        });

        // const geocoder = new MapboxGeocoder({
        //     accessToken: ACCESS_TOKEN,
        //     mapboxgl: mapboxgl,
        //     marker: true,
        //     types: 'address,poi',
        //     proximity: [-73.99209, 40.68933],
            
            
        // });
        
        map.on('load', function () {
            map.resize();
        });

        // map.addControl(geocoder);
      
        // map.on('click', function (e) {
        //     const coordinates = e.lngLat;
        //     reverseGeocode(coordinates,geocoder,map);
        // });

        return () => map.remove();
    }, []);


    return (
        <div className='h-[200px] w-auto'>
            <div id='map' ref={mapContainerRef} style={{width: '100%', height: '100%'}} />
        </div>
    )
}