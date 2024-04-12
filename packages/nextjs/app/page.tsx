"use client";

import React from "react";
import pic from "../public/hero-image.png";
import CountUp from "react-countup";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
} from "chart.js";  

// import { motion } from "framer-motion"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
const Home: React.FC = () => (
  <div className="flex bg-gray-800  ">
    <div className="flex-1 h-screen ">
      <div className="flex flex-col items-center justify-center h-full">
        {/* <motion.h1
        initial={{y:"2rem", opacity:0}}
        animate={{y:"0rem", opacity:1}}
        transition={{duration:2, type:'spring'}}
        >
        <h1 className='font-bold text-6xl mt-[-200px] text-white leading-loose'>
          Your Gateway <br className="mt-10"  />
          To Digital Ownership!
        </h1>
        </motion.h1> */}

        <h1 className="font-bold text-6xl mt-[-200px] text-white leading-loose">
          Your Gateway <br className="mt-10" />
          To Digital Ownership!
        </h1>

        <h3 className="text-zinc-400 mt-10 ml-[-100px] italic">
          search from a plethora of homes <br />
          and choose the right one for your stay, investment, or purchase.
        </h3>

        <div className="text-white mt-20 flex">
          <div className="flex flex-col items-center mr-8 bg-slate-700 rounded-lg p-1 font text-2xl">
            <div className="flex items-center">
              <CountUp end={10000} />
              <span className="ml-1 text-orange-400">+</span>
            </div>
            <h1 className="text-zinc-400 mt-1 font-bold">Premium Estates</h1>
          </div>

          <div className="flex flex-col items-center mr-8  bg-slate-700 rounded-lg p-1 text-2xl">
            <div className="flex items-center">
              <CountUp end={2000} />
              <span className="ml-1 text-orange-400">+</span>
            </div>
            <h1 className="text-zinc-400 mt-1 font-bold">Happy customers</h1>
          </div>

          <div className="flex flex-col items-center  bg-slate-700 rounded-lg p-1 text-2xl">
            <div className="flex items-center">
              <CountUp end={30} />
              <span className="ml-1 text-orange-400">+</span>
            </div>
            <h1 className="text-zinc-400 mt-1 font-bold">Awards</h1>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 h-screen ">
      <img
        style={{
          width: "25rem",
          height: "35rem",
          border: "3px solid ",
          borderRadius: "15rem 15rem 0 0",
          marginTop: "35px",
          marginLeft: "180px",
        }}
        src={pic.src}
        alt=""
      />
    </div>
  </div>
);

export default Home;

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Flex, Box, Text, Button } from '@chakra-ui/react';
// import buy from '../public/buy.png'
// interface BannerProps {
//   purpose: string;
//   title1: string;
//   title2: string;
//   desc1: string;
//   desc2: string;
//   buttonText: string;
//   linkName: string;
//   imageUrl: string;
// }

// const Banner: React.FC<BannerProps> = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
//   <Flex justifyContent='center' alignItems='center' m='5'>
//     <Box mx='2'>
//       <Image src={imageUrl} width={500} height={300} alt='' />
//       <Box p='5'>
//         <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
//         <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
//         <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
//         <Button fontSize='xl' borderRadius='full' borderWidth='2px' borderColor='blue.300'>
//           <Link href={linkName}>{buttonText}</Link>
//         </Button>
//       </Box>
//     </Box>
//   </Flex>
// );

// const Home: React.FC = () => (
//   <div>
//     <div className='flex items-center justify-center m-6'>
//       <Banner
//         purpose='RENT A HOME'
//         title1='Rental your dream home!'
//         title2=''
//         desc1=' Explore flats, bunglows, villas'
//         desc2='and more'
//         buttonText='Explore Renting'
//         linkName='/realEstates?purpose=for-rent'
//         imageUrl='https://media.istockphoto.com/id/1294492188/video/slow-pan-of-beautiful-custom-home-and-for-rent-real-estate-sign.jpg?s=640x640&k=20&c=RKac7HEnbbOKbAU57yHnTR8aJlrxCQhfJVeC1U6GuTM='
//       />
//       <Banner
//         purpose='BUY A HOME'
//         title1=' Find, Buy & Own Your'
//         title2='Dream Home'
//         desc1=' Explore from Apartments, land, builder floors,'
//         desc2=' villas and more'
//         buttonText='Explore Buying'
//         linkName='/realEstates?purpose=for-sale'
//         imageUrl={buy}
//       />
//       <Banner
//         purpose='List a  HOME'
//         title1=' Get the best deals '
//         title2='for your beloved abode!'
//         desc1=' Choose between various types of listing:'
//         desc2=' selling, renting, tokenising'
//         buttonText='Explore Listing'
//         linkName='/listRealEstate'
//         imageUrl='https://media.istockphoto.com/id/1269776313/photo/suburban-house.jpg?s=612x612&w=0&k=20&c=iNaSdrxJt7H37rjQZumXYScrmSTRm2fDJrqZzxpDL_k='
//       />
//     </div>
//   </div>
// );

// export default Home;
