import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { Readable } from "stream";

// Pinata API endpoint for uploading files
const PINATA_UPLOAD_ENDPOINT = "https://api.pinata.cloud/pinning/pinFileToIPFS";



// Function to upload a single file to Pinata
export async function uploadToPinata(files: any, tokenId: any, metadata: any) {
  try {
    // Create a FormData object to send the file data
    const formData = new FormData();
    let i = 0;
    const json = {
      ...metadata,
    };
    for (const file of files) {
      formData.append(`file`, file, `${tokenId}/image/${file.name}`);
      json[`image${i}`] = file.name;
      i++;
    }
    json["totalImages"] = i;

    const blob = new Blob([JSON.stringify(json)], { type: "text/plain" });
    const file = new File([blob], "filename.txt", { type: "text/plain" });
    formData.append("file", file, `${tokenId}/metaData.txt`);

    const response = await axios.post(PINATA_UPLOAD_ENDPOINT, formData, {
      maxContentLength: -1,
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: process.env.NEXT_PUBLIC_IPFS_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_IPFS_API_SECRET,
      },
      params: {
        pinataOptions: {
          cidVersion: 1,
          wrapWithDirectory: true,
        },
      },
    });

    const { IpfsHash } = response.data;
    console.log(`Pinata ${IpfsHash}`, response.data);

    return IpfsHash;
  } catch (error) {
    // Log any errors that occur during the upload process
    console.error(` Pinata:`, error);
    throw error;
  }
}

// Function to upload multiple files to Pinata
