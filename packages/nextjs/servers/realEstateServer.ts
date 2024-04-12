import { getTargetNetwork } from "~~/utils/scaffold-eth";
import Rentinfo from "../classes/RentInfo";
import Rentproposal from "../classes/rentProposal";
import contracts from "../generated/deployedContracts";
import { Properties } from "./schema/properties";
import axios from "axios";
import { ethers } from "ethers";
import mongoose, { ConnectOptions } from "mongoose";
import Web3 from "web3";
import { baseUrl, fetchApi } from "~~/app/utils/fetchApi";

async function run() {
  const localhostUrl = `https://sepolia.gateway.tenderly.co`; // Update the port if needed
  // const localhostUrl = `http://localhost:8545`; // Update the port if needed
  const provider = new ethers.JsonRpcProvider(localhostUrl);
  const web3 = new Web3(localhostUrl); // Replace 'YOUR_PROVIDER_URL' with your Ethereum node provider URL
  const id=11155111
  // const id=31337
  const contractAddress = contracts[id][0].contracts.RealEstateERC1155.address;
  const contractAbi = contracts[id][0].contracts.RealEstateERC1155.abi;

  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  const contractweb3 = new web3.eth.Contract(contractAbi, contractAddress);

  const eventts = await contractweb3.getPastEvents("allEvents", {
    fromBlock: 0,
    toBlock: "latest",
  });

  console.log(eventts, "eventts");

  //   const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=200`);
  //   const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=200`);
  // function newRun (){
  //   propertyForSale.hits.map(async (data:any)=>{
  //     console.log(data,"scd")
  //     const res=await axios.post('http://localhost:3000/api/postRealEstate',{data});

  //   })
  //   propertyForRent.hits.map(async (data:any)=>{
  //     console.log(data,"ss")
  //     const res=await axios.post('http://localhost:3000/api/postRealEstate',{data});

  //   })

  // }

  // newRun();
  // Subscribe to the event

  contract.on("RealEstateListed", async (tokenId, owners, noOfTokens, priceOf1Token, metadataUri, event) => {
    try {
      console.log(`Token ID: ${tokenId}`);
      console.log(`Owners: ${owners}`);
      console.log(`Number of Tokens: ${noOfTokens}`);
      console.log(`Price of 1 Token: ${priceOf1Token}`);
      console.log("metadataUri", metadataUri);
      let metadata: any = await axios.get(`https://ipfs.io/ipfs/${metadataUri}/metaData.txt`);
      metadata = metadata.data;
      console.log(metadata, "metadata");
      let photos = [];
      for (let i = 0; i < metadata.totalImages; i++) {
        photos.push(`https://ipfs.io/ipfs/${metadataUri}/image/${metadata["image" + i]}`);
      }
      console.log(photos, "phooootoo");
      const data = new Properties({
        tokenId: Number(tokenId),
        owners: owners,
        noOfTokens: Number(noOfTokens),
        priceOf1Token: Number(priceOf1Token),
        coverPhoto: `https://ipfs.io/ipfs/${metadataUri}/image/${metadata.image0}`,
        totalImages: metadata?.totalImages,
        photos: photos,
        purpose: metadata.purpose,
        description: metadata.description,
        metadataUri: metadataUri,
        amenities: metadata.amenities,
        BhkType: metadata.BhkType,
        area: metadata.area,
        noOfBathrooms: metadata.noOfBathrooms,
        noOfBedrooms: metadata.noOfBedrooms,
        latitude: metadata.latitude,
        longitude: metadata.longitude,
        
      });
      await data.save();
      console.log("done");
    } catch (error) {
      console.error(error.toString());
    }

    // try{
    //   const res=await axios.post('http://localhost:3000/api/postRealEstate',{data});
    //   console.log(res.data);

    // }
    // catch(error){
    //   console.log(error);

    // }
  });

  contract.on("RealEstateUpdated", async (tokenId, owners, noOfTokens, priceOf1Token, metadataUri, event) => {
    try {
      console.log(`Token ID: ${tokenId}`);
      console.log(`Owners: ${owners}`);
      console.log(`Number of Tokens: ${noOfTokens}`);
      console.log(`Price of 1 Token: ${priceOf1Token}`);
      console.log("metadataUri", metadataUri);
      // let metadata: any = await axios.get(`https://ipfs.io/ipfs/${metadataUri}/metaData.txt`);
      // metadata = metadata.data
      // console.log(metadata, "metadata")
      // let photos = [];
      // for (let i = 0; i < metadata.totalImages; i++) {
      //   photos.push(metadata['image' + i]);
      // }
      // console.log(photos, "phooootoo")
      // const data = new Properties({
      //   tokenId: Number(tokenId),
      //   owners: owners,
      //   noOfTokens: Number(noOfTokens),
      //   priceOf1Token: Number(priceOf1Token),
      //   coverPhoto: `https://ipfs.io/ipfs/${metadataUri}/image/${metadata.image0}`,
      //   totalImages: metadata?.totalImages,
      //   photos: photos,
      //   purpose: metadata.purpose,
      //   description: metadata.description,
      //   metadataUri: metadataUri,
      //   amenities:metadata.amenities,
      //   BhkType:metadata.BhkType,
      //   area:metadata.area,
      //   noOfBathrooms:metadata.noOfBathrooms,
      //   noOfBedrooms:metadata.noOfBedrooms

      // })
      // await data.save()
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  });
  // uint256 proposalId,
  // address proposalId,
  // uint256 positiveVotes,
  // uint256 negativeVotes,
  // ProposalType proposalType,
  // uint256 tokenId,
  // bool executed,
  // RentProposal rentProposal,
  // uint256 deadline,
  // RentInfo rentInfo

  contract.on(
    "ProposalUpserted",
    async (
      proposalId,
      proposalCreator,
      positiveVotes,
      negativeVotes,
      proposalType,
      tokenId,
      executed,
      rentProposal,
      deadline,
      rentInfo,
      event,
    ) => {
      console.log(`Proposal Added - Proposal ID: ${proposalId}`);
      console.log(`Proposal Creator: ${proposalCreator}`);
      console.log(`Positive Votes: ${positiveVotes}`);
      console.log(`Negative Votes: ${negativeVotes}`);
      console.log(`Proposal Type: ${proposalType}`);
      console.log(`Token ID: ${tokenId}`);
      console.log(`Executed: ${executed}`);
      console.log(`Rent Proposal: `, rentProposal);
      console.log(`Deadline: ${deadline}`);
      console.log(`Rent Info: `, rentInfo);
      const rentinfo = new Rentinfo(rentInfo);
      const rentproposal = new Rentproposal(rentProposal);
      const proposalData = {
        proposalId: Number(proposalId),
        proposalCreator: proposalCreator,
        positiveVotes: Number(positiveVotes),
        negativeVotes: Number(negativeVotes),
        proposalType: Number(proposalType),
        tokenId: Number(tokenId),
        executed: executed,
        deadline: Number(deadline),
        Rentinfo: { ...rentinfo },
        rentproposal: { ...rentproposal },
      };
      try {
        console.log("hello");
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URLL}/api/upsertProposal`, { data: proposalData });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  );
}


mongoose.connect("mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/OpenEstate?retryWrites=true&w=majority").then(() => {
  console.log("connected");
  run();
});
