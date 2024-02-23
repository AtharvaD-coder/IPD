'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { CardBox } from '~~/components/custom_components/cardComponent';
import 'mapbox-gl/dist/mapbox-gl.css'

const MapWithSearchBox = ({ latitude, longitude,setLatitude,setLongitude }: any) => {
    const mapContainerRef = useRef(null);
    const addressInputRef = useRef(null);
    const markerRef = useRef(null);

    const reverseGeocode = (lngLat: LngLatLike, geocoder: any, map: any) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then((data: { features: { place_name: string }[] }) => {
                const address = data.features[0].place_name;

                geocoder.setInput(address);
                geocoder.setFlyTo({ center: lngLat });
                map.flyTo({
                    center: [lngLat.lng, lngLat.lat],
                    zoom: 8.8,
                    speed: 0.7,
                    curve: 1,
                });
                // alert(address);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [longitude, latitude],
            zoom: 8.8,
        });

        const geocoder = new MapboxGeocoder({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
            mapboxgl: mapboxgl,
            types: 'address,poi',
            proximity: [longitude, latitude],
        });

        map.addControl(geocoder);

        map.on('click', function (e) {
            const coordinates = e.lngLat;
            reverseGeocode(coordinates, geocoder, map);
            setLatitude(coordinates.lat);
            setLongitude(coordinates.lng);

            if (markerRef.current) {
                markerRef.current.setLngLat(coordinates);
            } else {
                const marker = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .addTo(map);
                markerRef.current = marker;
            }
        });

        map.on('load', function () {
            map.resize();
        });

        return () => map.remove();
    }, []);

    return (
        <CardBox className='w-[100%] h-[600px] '>
            <h1 className="text-3xl font-bold">Location </h1>
            <div id='map' ref={mapContainerRef} style={{ position: 'absolute', width: '90%', height: '400px' }} />
        </CardBox>
    );
};

export default MapWithSearchBox;
