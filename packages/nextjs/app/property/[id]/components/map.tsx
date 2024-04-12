
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CardBox } from '~~/components/custom_components/cardComponent';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css'
export default function Map({ latitude, longitude }: any) {
    const mapContainerRef = useRef(null);



    useEffect(() => {
        if (!latitude || !longitude) return;
        console.log(latitude, longitude, "lat long")

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [longitude, latitude],
            zoom: 8.8,
            width: 100,
            height: 100



        });

        const marker1 = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map);
        map.on('load', function () {
            map.resize();
        });



        return () => map.remove();
    }, [latitude, longitude]);


    if (!latitude || !longitude) {
        return (
            <CardBox
                className='h-[100%] min-h-[300px] w-[100%] flex justify-center items-center flex-col '
            >
                <Image src={'/assets/no-gps.png'} alt='no locatin provided' width={100} height={100} />
                <h1 className='text-xl font-bold mt-5 '> Location not provided</h1>
            </CardBox>
        )
    }
    return (
        <CardBox
            className='w-[100%] '
        >
            <h1 className="text-3xl font-bold">Location </h1>
            <div className='h-[300px] w-[400px] rounded-xl'>
                <div id='map' ref={mapContainerRef} style={{ width: '100%', height: '100%', }} />
            </div>
        </CardBox>
    )
}