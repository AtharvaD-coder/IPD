'use client';
import { useState, useEffect } from 'react';
import ImageUploader from './components/imageUploader';
import NumberInput from './components/numberInputs';
import Button from '~~/components/custom_components/button';
import Input from '~~/components/custom_components/input';
import { AddressInput } from '~~/components/scaffold-eth';
import { useScaffoldContractRead, useScaffoldContractWrite } from '~~/hooks/scaffold-eth'; // Remove unused import
import Radio from './components/Radio';
import Label from '~~/components/custom_components/labels';
import { useAccount } from 'wagmi';
import { uploadToPinata } from '~~/utils/ipfs';
interface RentProps {
  numberOfMonths?: number;
  rentPerMonth?: number;
  depositAmount?: number;
  lateInstallmentFees?: number;
  contractStartTimestamp?: number;
}

interface ListDetails {
  owner: string;
  initialAmountOfTokens: number;
  priceOf1Token: number;
  rentProps?: RentProps;
}

export default function ListRealEstate() {
  const { address } = useAccount();
  const [files,setFiles]=useState<any>([])
  const [ListDetails, setListDetails] = useState<ListDetails>({
    owner: address ?? '',
    initialAmountOfTokens: 0,
    priceOf1Token: 0,
  });
  const [isForRent, setIsForRent] = useState(false);

  useEffect(() => {
    setListDetails({ ...ListDetails, owner: address ?? '' });
  }, [address]);

  const handleTypeChange = (value: string) => {
    setIsForRent(value === 'Rent');
  };

  const { writeAsync: listRealEstateForSale } = useScaffoldContractWrite({
    contractName: 'RealEstateERC1155',
    functionName: 'listRealEstateForSale',
    args: [
      BigInt(ListDetails?.initialAmountOfTokens??0),
      ListDetails.owner,
      BigInt(ListDetails?.priceOf1Token??0),
      ''

    ],
    onBlockConfirmation: (txnReceipt) => {
      console.log('📦 Transaction blockHash', txnReceipt.blockHash);
    },
  });

  const { writeAsync: listRealEstateForRent } = useScaffoldContractWrite({
    contractName: 'RealEstateERC1155',
    functionName: 'listRealEstateForRent',
    args: [
      BigInt(ListDetails?.initialAmountOfTokens??0),
      ListDetails.owner,
      BigInt(ListDetails?.priceOf1Token??0),
      BigInt(ListDetails.rentProps?.numberOfMonths ?? 0),
      BigInt(ListDetails.rentProps?.rentPerMonth ?? 0),
      BigInt(ListDetails.rentProps?.depositAmount ?? 0),
      BigInt(ListDetails.rentProps?.lateInstallmentFees ?? 0),
      BigInt(200000000000 ?? 0),
      ''
    ],
    onBlockConfirmation: (txnReceipt) => {
      console.log('📦 Transaction blockHash', txnReceipt.blockHash);
    },
  });

  const {data:tokenIdCounter}=useScaffoldContractRead({
    contractName:'RealEstateERC1155',
  functionName:'getTokenIdCounter',
  watch:true
  
})



  const onSubmit=async ()=>{
    console.log('hello')
    const data:string =await uploadToPinata(files,tokenIdCounter,{
      purpose:isForRent?"for-rent":"for-sale",
    });
    console.log(data,"data asfasf")
    if(isForRent){
      listRealEstateForRent({
        args: [
          BigInt(ListDetails?.initialAmountOfTokens??0),
          ListDetails.owner,
          BigInt(ListDetails?.priceOf1Token??0),
          BigInt(ListDetails.rentProps?.numberOfMonths ?? 0),
          BigInt(ListDetails.rentProps?.rentPerMonth ?? 0),
          BigInt(ListDetails.rentProps?.depositAmount ?? 0),
          BigInt(ListDetails.rentProps?.lateInstallmentFees ?? 0),
          BigInt(ListDetails.rentProps?.contractStartTimestamp ?? 0),
          data
        ],
      })
    }else{
      listRealEstateForSale({ args: [
        BigInt(ListDetails?.initialAmountOfTokens??0),
        ListDetails.owner,
        BigInt(ListDetails?.priceOf1Token??0),
        data
      ],})
    }
  }


  console.log(files,"files")
  console.log(ListDetails,"listDetails")


  return (
    <div className="p-9">
      <div className="horizontal-1 flex justify-between items-center w-[90vw] ">
        <div className="m-2 w-[30vw]">
          <ImageUploader files={files} setFiles={setFiles} label={'Upload Image'} />
        </div>
        <div className=" w-[30vw] justify-center items-center flex flex-col ">
          <NumberInput
            value={ListDetails.initialAmountOfTokens}
            onChange={(e: any,val:any) =>
              setListDetails({ ...ListDetails, initialAmountOfTokens: Number(val) })
            }
            label={'number of tokens of your property'}
          />
          <NumberInput
            value={ListDetails.priceOf1Token}
            onChange={(e: any,val:any) =>
              setListDetails({ ...ListDetails, priceOf1Token: Number(val) })
            }
            label={'Price of 1 Token'}
          />
          <NumberInput label={'Square Feet'} />
        </div>
      </div>
      <div className="horizontal-2 w-[90vw] ">
        <Label>Short description</Label>
        <textarea className="textarea rounded-3xl textarea-bordered w-full" placeholder="Short Description" />
      </div>

      <div className="horizontal-3 w-[90vw]">
        {/* <Radio label={'Type Of property'} options={['Residential', 'Commercial', 'Vacation Home', 'PG']} /> */}
        <Radio label={'For'} options={['Sale', 'Rent']} onChange={handleTypeChange} />
        {/* <Radio label={'Size'} options={['1 BHK', '2 BHK', '3BHK', '4BHK']} /> */}
      </div>

      {isForRent && (
        <div className="horizontal-2 w-[90vw] ">
          <NumberInput label={'Number of Months'} />
          <NumberInput label={'Rent per Month'} />
          <NumberInput label={'Deposit Amount'} />
          <NumberInput label={'Fees for Late Installments'} />
          <Input label={'Contract Start Timestamp'} type="date"
value={(ListDetails.rentProps && ListDetails.rentProps.contractStartTimestamp 
  ? new Date(ListDetails.rentProps.contractStartTimestamp).toISOString().slice(0, 10)
  : new Date().toISOString().slice(0, 10))}
          // value={new Date(ListDetails.rentProps?.contractStartTimestamp??'').toISOString().slice(0, 10) } 
          onChange={(val:any) => {
            console.log("hello",val,new Date(val??0).toISOString().slice(0, 10))
            setListDetails((prevGroup) => ({
              ...prevGroup,
              rentProps: {
                ...prevGroup.rentProps,
                contractStartTimestamp: new Date(val).getTime()
              }
            }))
          }}
         />
        </div>
      )}

      <Button
        label={'Submit'}
        onClick={() => {
       onSubmit()
        }}
      />
    </div>
  );
}
