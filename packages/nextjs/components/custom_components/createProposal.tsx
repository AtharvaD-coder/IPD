import { useState } from "react";
import RentComponent from "./RentComponent";
import Select from "./Select";
import Button from "./button";
import Input from "./input";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ProposalType, RealEstateStatus } from "~~/utils/enums";

export default function CreateProposals({ tokenId }: { tokenId: number }) {
  const proposalTypes = Object.values(ProposalType); // Assuming ProposalType is an object with values
  const proposalTypesArray = proposalTypes.slice(0, Math.floor(proposalTypes.length / 2)); // Use Math.floor
  const [value, setValue] = useState<number>(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const selectOptions = proposalTypesArray.map((type, index) => ({
    value: index,
    text: type.toString(),
  }));
  const { address } = useAccount();
  const { writeAsync: listForRent } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "updateStatus",
    args: [BigInt(tokenId), RealEstateStatus.Renting, BigInt(0)],
  });

  const { writeAsync: unListForRent } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "updateStatus",
    args: [BigInt(tokenId), RealEstateStatus.Listed, BigInt(0)],
  });

  const { data: isSoleOwner } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "isSoleOwner",
    args: [BigInt(tokenId), address],
    watch: true,
  });
  // const {data:balanceOfCurentUser}=useScaffoldContractRead({
  //     contractName:"RealEstateERC1155",
  //     functionName:'balanceOf',
  //     args:[address,BigInt(tokenId)],
  //     watch:true
  // })
  // const {data:realEstate}=useScaffoldContractRead({
  //     contractName:"RealEstateERC1155",
  //     functionName:'realEstates',
  //     args:[BigInt(tokenId)],
  //     watch:true
  // })
  console.log(isSoleOwner);

  return (
    <div>
      <Select
        options={selectOptions}
        onChange={newValue => {
          setValue(Number(newValue));
        }}
      />
      {(() => {
        switch (value) {
          case 3:
            return <RentComponent tokenId={tokenId} />;
          case 0:
            return (
              <div>
                {!isSoleOwner ? (
                  <Input
                    label={"enter deadline"}
                    type="date"
                    value={""}
                    onChange={(newValue: any) => {
                      const timestamp = Date.parse(newValue) / 1000; // Convert to seconds
                      setDeadline(timestamp);
                    }}
                  />
                ) : null}
                <Button
                  label="List for Rent"
                  onClick={() => {
                    listForRent();
                  }}
                />
              </div>
            );
          case 1:
            return (
              <div>
                {!isSoleOwner ? (
                  <Input
                    label={"enter deadline"}
                    type="date"
                    value={""}
                    onChange={(newValue: any) => {
                      const timestamp = Date.parse(newValue) / 1000; // Convert to seconds
                      setDeadline(timestamp);
                    }}
                  />
                ) : null}
                <Button
                  label="UnList for Rent"
                  onClick={() => {
                    unListForRent();
                  }}
                />
              </div>
            );
          // Add more cases for other values if needed
          default:
            return null;
        }
      })()}
    </div>
  );
}
