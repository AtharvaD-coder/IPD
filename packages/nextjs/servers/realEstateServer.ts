import contracts from '../generated/deployedContracts';
import { ethers } from 'ethers';
import axios from 'axios'
import Rentinfo from '../classes/RentInfo';
import Rentproposal from '../classes/rentProposal';
import { baseUrl, fetchApi } from '../app/utils/fetchApi';

async function run() {
  console.log('hello');
  
  const localhostUrl = `http://127.0.0.1:8545/`; // Update the port if needed
  const provider = new ethers.JsonRpcProvider(localhostUrl);
  
  const contractAddress = contracts[31337][0].contracts.RealEstateERC1155.address;
  const contractAbi = contracts[31337][0].contracts.RealEstateERC1155.abi;
  
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
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
  
  contract.on('RealEstateListed', async (tokenId, owners, noOfTokens, priceOf1Token, event) => {

  
    console.log(`Token ID: ${tokenId}`);
    console.log(`Owners: ${owners}`);
    console.log(`Number of Tokens: ${noOfTokens}`);
    console.log(`Price of 1 Token: ${priceOf1Token}`);
    const data={
      tokenId:Number(tokenId), owners, noOfTokens:Number(noOfTokens), priceOf1Token:Number(priceOf1Token),purpose:'for-sale',price:5000,externalID:Number(tokenId),coverPhoto:{url:"https://bayut-production.s3.eu-central-1.amazonaws.com/image/507408146/d53c488d43a64da08472c74fcbd34287"}
    }
    console.log(data)
    try{
      const res=await axios.post('http://localhost:3000/api/postRealEstate',{data});
      console.log(res.data);
      
    }
    catch(error){
      console.log(error);
      
    }
   


    
  });

  contract.on('RealEstateUpdated', async (tokenId, owners, noOfTokens, priceOf1Token,status,rentInfo,realEstateBalance, event) => {

  
 
        const rentInfoObj=new Rentinfo(rentInfo);
        console.log({...rentInfoObj},'onj')
    const data={
      tokenId:Number(tokenId), owners, noOfTokens:Number(noOfTokens), priceOf1Token:Number(priceOf1Token),realEstateBalance:Number(realEstateBalance),status:Number(status),rentInfo:{...rentInfoObj}
    }

    try{
      const res=await axios.post('http://localhost:3000/api/updateRealEstate',{data:data});
      console.log(res.data);
    }
    catch(error){
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
  
  contract.on('ProposalUpserted', async (proposalId, proposalCreator, positiveVotes, negativeVotes, proposalType, tokenId, executed, rentProposal, deadline, rentInfo,event) => {
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
    const rentinfo=new Rentinfo(rentInfo);
    const rentproposal=new Rentproposal(rentProposal)
    const proposalData={
      proposalId:Number(proposalId),
      proposalCreator:proposalCreator,
      positiveVotes:Number(positiveVotes),
      negativeVotes:Number(negativeVotes),
      proposalType:Number(proposalType),
      tokenId:Number(tokenId),
      executed:executed,
      deadline:Number(deadline),
      Rentinfo:{...rentinfo},
      rentproposal:{...rentproposal}
    }
    try{
      console.log('hello');
      const res=await axios.post('http://localhost:3000/api/upsertProposal',{data:proposalData});
      console.log(res.data);
    }
    catch(error){
      console.log(error);
    }





});
}

run();
