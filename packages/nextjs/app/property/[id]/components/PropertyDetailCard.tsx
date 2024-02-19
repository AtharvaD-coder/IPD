import { CardBox } from "~~/components/custom_components/cardComponent";

export default function PropertyDetailCard({
  price = 20,
  bhkTypes = "1 Bhk",
  noOfBathrooms = 2,
  noOfBedrooms = 2,
  area = 1000,
}: any) {
  return (
    <CardBox className='w-[100%]'>
      <h1 className="text-3xl font-bold mb-5">Property Details</h1>
      <div className="max-w-[100%] flex flex-wrap border-2 border-black rounded-xl ">
        <div className="flex items-center " >
          <div className="  p-4 w-fit m-3">
            <p className="mb-0 opacity-75 text-md w-fit">Price</p>
            <p className="mt-0 text-xl font-bold w-fit ">{price}</p>
          </div>
          <div className="h-20 border-2 w-0.5 border-gray-400 rounded-full  "></div>
        </div>
        <div className="flex items-center " >
          <div className="  p-4 w-fit  m-3">
            <p className="mb-0 opacity-75 text-md">BHK Type</p>
            <p className="mt-0 text-xl font-bold">{bhkTypes}</p>
          </div>
          <div className="h-20 border-2 w-0.5 border-gray-400 rounded-full  "></div>

        </div>
        <div className="flex items-center " >
          <div className="   p-4 w-fit m-3">
            <p className="mb-0 opacity-75 text-md">BathRooms</p>
            <p className="mt-0 text-xl font-bold">{noOfBathrooms}</p>
          </div>
          <div className="h-20 border-2 w-0.5 border-gray-400 rounded-full  "></div>

        </div>
        <div className="flex items-center " >
          <div className="  p-4 w-fit m-3">
            <p className="mb-0 opacity-75 text-md">BedRooms</p>
            <p className="mt-0 text-xl font-bold">{noOfBedrooms}</p>
          </div>
          <div className="h-20 border-2 w-0.3 border-gray-400 rounded-full  "></div>

        </div>
        <div className="flex items-center " >
          <div className=" p-4 w-fit m-3">
            <p className="mb-0 opacity-75 text-md">Area</p>
            <p className="mt-0 text-xl font-bold">{area} sq ft</p>
          </div>


        </div>
      </div>
    </CardBox>
  );
}
