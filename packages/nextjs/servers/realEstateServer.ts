import contracts from '../generated/deployedContracts';
import { ethers } from 'ethers';
import axios from 'axios'

async function run() {
  console.log('hello');
  
  const localhostUrl = `http://127.0.0.1:8545/`; // Update the port if needed
  const provider = new ethers.providers.JsonRpcProvider(localhostUrl);
  
  const contractAddress = contracts[31337][0].contracts.RealEstateERC1155.address;
  const contractAbi = contracts[31337][0].contracts.RealEstateERC1155.abi;
  
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  const eventName = 'RealEstateListed';

  // Subscribe to the event
  contract.on(eventName, async (tokenId, owners, noOfTokens, priceOf1Token, event) => {
    // Log event data
    console.log(`Event ${eventName} received:`);
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
   


    // Log the entire event object for additional details
    // console.log('Full Event Object:', event);
  });
}

run();
