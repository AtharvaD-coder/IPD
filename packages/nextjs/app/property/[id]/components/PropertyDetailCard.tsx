



export default function PropertyDetailCard({ price = 20, bhkTypes = '1 Bhk', noOfBathrooms = 2, noOfBedrooms = 2, area = 1000 }: any) {

    return (

        <div className=" w-fit h-[100px] items-center flex border-2 border-black rounded-xl justify-center  pt-5 pb-5 p-10  ">
            <div className="m-5">
                <p className=" mb-0 opacity-75 text-md">
                    Price
                </p>
                <p className=" mt-0 text-xl font-bold">
                    {price}
                </p>

            </div>
            <div className="divider  divider-horizontal "></div>

            <div className="m-5">
                <p className=" mb-0 opacity-75 text-md">
                    BHK Type
                </p>
                <p className=" mt-0 text-xl font-bold">
                    {bhkTypes}
                </p>
            </div>
            <div className="divider  divider-horizontal "></div>
            <div className="m-5">
                <p className=" mb-0 opacity-75 text-md">
                    BathRooms
                </p>
                <p className=" mt-0 text-xl font-bold">
                    {noOfBathrooms}
                </p>
            </div>

            <div className="divider  divider-horizontal "></div>
            <div className="m-5">
                <p className=" mb-0 opacity-75 text-md">
                    BedRooms
                </p>
                <p className=" mt-0 text-xl font-bold">
                    {noOfBedrooms}
                </p>
            </div>
            <div className="divider  divider-horizontal "></div>
            <div className="m-5">
                <p className=" mb-0 opacity-75 text-md">
                    Area
                </p>
                <p className=" mt-0 text-xl font-bold">
                    {area} sq ft
                </p>
            </div>
        </div>
    )

}