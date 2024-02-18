import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { CardBox } from '~~/components/custom_components/cardComponent';

const ACCESS_TOKEN = 'pk..';

const MapWithSearchBox = () => {
    const mapContainerRef = useRef(null);
    const addressInputRef = useRef(null);

    const reverseGeocode = (lngLat: LngLatLike, geocoder: any, map: any) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then((data: { features: { place_name: string }[] }) => {
                const address = data.features[0].place_name;


                geocoder.setInput(address);
                geocoder.setFlyTo({ center: lngLat })
                map.flyTo({
                    center: [lngLat.lng, lngLat.lat],
                    zoom: 8.8,
                    speed: 0.7,
                    curve: 1,


                });
                alert(address)
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        mapboxgl.accessToken = ACCESS_TOKEN;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-73.99209, 40.68933],
            zoom: 8.8,


        });

        const geocoder = new MapboxGeocoder({
            accessToken: ACCESS_TOKEN,
            mapboxgl: mapboxgl,
            marker: true,
            types: 'address,poi',
            proximity: [-73.99209, 40.68933],


        });



        map.addControl(geocoder);

        map.on('click', function (e) {
            const coordinates = e.lngLat;
            reverseGeocode(coordinates, geocoder, map);
        });
        map.on('load', function () {
            map.resize();
        }
        )

        return () => map.remove();
    }, []);

    return (
        <CardBox
            className='w-[100%] h-[600px] '
        >
            <h1 className="text-3xl font-bold">Location </h1>
            <div id='map' ref={mapContainerRef} style={{ position: 'absolute', width: '90%', height: '400px' }} />
        </CardBox>
    );
};

export default MapWithSearchBox;
