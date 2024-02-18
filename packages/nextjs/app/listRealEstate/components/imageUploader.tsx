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
import Image from "next/image";
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

export default function App({ label, setFiles, files }: { label: string; setFiles: any; files: any }) {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  const [imageSelector, setImageSelector] = useState<any>(0);
  function handleChange(e: any) {
    console.log(e.target.files);
    setFiles([...files, e.target.files[0]]);
  }
  if (files.length === 0) {
    return (
      <div className="h-[500px]">


        <AspectRatio ratio={1}>
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
                  <Image src={'/assets/home.png'} width={200} height={200} alt="Home Image" />
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
                onChange={handleChange}
              />
            </Box>
          </Box>
        </AspectRatio>

      </div>
    );
  }

  else {
    return (
      <ImageUploader label="anurag" files={files} setFiles={setFiles} />
    )
  }


}




// import { useState } from "react";
// import Label from "~~/components/custom_components/labels";

export function ImageUploader({ label, setFiles, files }: { label: string; setFiles: any; files: any }) {
  const [imageSelector, setImageSelector] = useState<any>(0);
  function handleChange(e: any) {
    console.log(e.target.files);
    setFiles([...files, e.target.files[0]]);
  }
  return (
    <div>



      <div className=" flex flex-col items-center">
        {files.length > 0 && (
          <img
            className="m-3 w-[200px] h-[200px] object-cover rounded-xl"
            src={URL.createObjectURL(files[imageSelector])}
          />
        )}
        <div className="flex overflow-x-auto my-3 ">
          {files.map((file: any, index: Number) => {
            console.log(file);
            return (
              <div
                className={`relative m-3 w-[70px] h-[70px] object-cover  ${imageSelector === index ? "border-double border-8" : "border-solid border-2"}   rounded-xl flex justify-center items-center border-black rounded-lg p-2 cursor-pointer`}
                onClick={() => {
                  setImageSelector(index);
                }}
              >
                {index === imageSelector && (
                  <div className="absolute inset-0 bg-black opacity-10 rounded-xl"></div>
                )}
                <img className="rounded-xl" src={URL.createObjectURL(file)} />
              </div>
            );
          })}
        </div>
        <input
          type="file"
          onChange={e => handleChange(e)}
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
      </div>
    </div>
  );
}
