import { CardBox } from "~~/components/custom_components/cardComponent";

export default function PropertyDetailCard({
  price = 20,
  bhkTypes = "1 Bhk",
  noOfBathrooms = 2,
  noOfBedrooms = 2,
  area = 1000,
}: any) {
  return (
    <CardBox
    className='w-[100%] '
  >
    <h1 className="text-3xl font-bold mb-5">Property Details</h1>
    <div className=" w-fit h-[120px] items-center flex border-2 border-black rounded-xl justify-center  pt-4 pb-4   ">
      <div className="m-5">
        <p className=" mb-0 opacity-75 text-md">Price</p>
        <p className=" mt-0 text-xl font-bold">{price}</p>
      </div>
      <div className="divider  divider-horizontal "></div>

      <div className="m-5">
        <p className=" mb-0 opacity-75 text-md">BHK Type</p>
        <p className=" mt-0 text-xl font-bold">{bhkTypes}</p>
      </div>
      <div className="divider  divider-horizontal "></div>
      <div className="m-5">
        <p className=" mb-0 opacity-75 text-md">BathRooms</p>
        <p className=" mt-0 text-xl font-bold">{noOfBathrooms}</p>
      </div>

      <div className="divider  divider-horizontal "></div>
      <div className="m-5">
        <p className=" mb-0 opacity-75 text-md">BedRooms</p>
        <p className=" mt-0 text-xl font-bold">{noOfBedrooms}</p>
      </div>
      <div className="divider  divider-horizontal "></div>
      <div className="m-5">
        <p className=" mb-0 opacity-75 text-md">Area</p>
        <p className=" mt-0 text-xl font-bold">{area} sq ft</p>
      </div>
    </div>
    </CardBox>
  );
}
