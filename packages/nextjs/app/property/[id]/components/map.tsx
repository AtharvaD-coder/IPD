
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CardBox } from '~~/components/custom_components/cardComponent';

export default function Map({latitude,longitude}:any) {
    const mapContainerRef = useRef(null);
    
    if(!latitude || !longitude){
        return (
            <CardBox
            className='h-[100%] min-h-[300px] w-[100%] flex justify-center items-center flex-col '
            >
                <Image src={'/assets/no-gps.png'} alt='no locatin provided' width={100} height={100} />
                <h1 className='text-xl font-bold mt-5 '> Location not provided</h1>
            </CardBox>
        )
    }

    useEffect(() => {
        if(!latitude || !longitude) return;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [latitude??0, longitude??0],
            zoom: 8.8,
            width: 100,
            height: 100



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



        return () => map.remove();
    }, []);


    return (
        <CardBox
            className='w-[100%] '
        >
            <h1 className="text-3xl font-bold">Location </h1>
            <div className='h-[300px] w-[300px] rounded-xl'>
                <div id='map' ref={mapContainerRef} style={{ width: '100%', height: '100%', }} />
            </div>
        </CardBox>
    )
}