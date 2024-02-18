import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const first = {
  rest: {
    rotate: "-15deg",
    scale: 0.95,
    x: "-50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    x: "-70%",
    scale: 1.1,
    rotate: "-20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};

const second = {
  rest: {
    rotate: "15deg",
    scale: 0.95,
    x: "50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    x: "70%",
    scale: 1.1,
    rotate: "20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
      {...props}
      ref={ref}
    />
  );
});

export default  function App({ label, setFiles, files }: { label: string; setFiles: any; files: any })  {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  const [imageSelector, setImageSelector] = useState<any>(0);
  function handleChange(e: any) {
    console.log(e.target.files);
    setFiles([...files, e.target.files[0]]);
  }
  return (
    <Container my="12">
      
      <AspectRatio width="200" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "md"
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                   <Box height="16" width="12" position="relative">
                  {files.map((imageUrl:any, index:any) => (
                    <PreviewImage
                      key={index}
                      variants={first} // or second, third, depending on the index or other logic
                      backgroundImage={`url(${imageUrl})`}
                    />
                   ))}
                </Box>
                <Stack p="8" textAlign="center" spacing="1">
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    Drop images here
                  </Heading>
                  <Text fontWeight="light">or click to upload</Text>
                </Stack>
              </Stack>
            </Box>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onDragEnter={startAnimation}
              onDragLeave={stopAnimation}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}




// import { useState } from "react";
// import Label from "~~/components/custom_components/labels";

// export default function ImageUploader({ label, setFiles, files }: { label: string; setFiles: any; files: any }) {
//   const [imageSelector, setImageSelector] = useState<any>(0);
//   function handleChange(e: any) {
//     console.log(e.target.files);
//     setFiles([...files, e.target.files[0]]);
//   }
//   return (
//     <div>
//       <Label>{label}</Label>

//       {/* <div className="flex items-center justify-center w-full ">
//         <label
//           htmlFor="dropzone-file"
//           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <svg
//               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//               <span className="font-semibold">Click to upload</span> or drag and drop
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//           </div>
//           <input id="dropzone-file" type="file" className="hidden" />
//         </label>
//       </div> */}
//       <div className=" flex flex-col items-center">
//         {files.length > 0 && (
//           <img
//             className="m-3 w-[200px] h-[200px] object-cover rounded-xl"
//             src={URL.createObjectURL(files[imageSelector])}
//           />
//         )}
//         <div className="flex overflow-x-auto my-3 ">
//           {files.map((file: any, index: Number) => {
//             console.log(file);
//             return (
//               <div
//                 className="m-3 w-[70px] h-[70px] object-cover border-solid border-2 rounded-xl flex justify-center items-center border-black rounded-lg p-2 cursor-pointer"
//                 onClick={() => {
//                   setImageSelector(index);
//                 }}
//               >
//                 <img className="rounded-xl" src={URL.createObjectURL(file)} />
//               </div>
//             );
//           })}
//         </div>
//         <input
//           type="file"
//           onChange={e => handleChange(e)}
//           className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//         />
//       </div>
//     </div>
//   );
// }
