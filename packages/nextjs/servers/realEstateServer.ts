import contracts from '../generated/deployedContracts';
import { ethers } from 'ethers';
import axios from 'axios'
import Rentinfo from '../classes/RentInfo';

async function run() {
  console.log('hello');
  
  const localhostUrl = `http://127.0.0.1:8545/`; // Update the port if needed
  const provider = new ethers.JsonRpcProvider(localhostUrl);
  
  const contractAddress = contracts[31337][0].contracts.RealEstateERC1155.address;
  const contractAbi = contracts[31337][0].contracts.RealEstateERC1155.abi;
  
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);


  // Subscribe to the event
  
  contract.on('RealEstateListed', async (tokenId, owners, noOfTokens, priceOf1Token, event) => {

  
    console.log(`Token ID: ${tokenId}`);
    console.log(`Owners: ${owners}`);
    console.log(`Number of Tokens: ${noOfTokens}`);
    console.log(`Price of 1 Token: ${priceOf1Token}`);
    const data={
      tokenId:Number(tokenId), owners, noOfTokens:Number(noOfTokens), priceOf1Token:Number(priceOf1Token)
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
}

run();
