import axios from 'axios';
import fs from 'fs';

// Pinata API endpoint for uploading files
const PINATA_UPLOAD_ENDPOINT = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

// Pinata API key and secret
const PINATA_API_KEY = 'f032f8a9c673beb3d67b';
const PINATA_API_SECRET = '263848db7f281438ea58988526e894e2b65d1b4e1cb82b3aff106432b2893739';

// Function to upload a single file to Pinata
async function uploadFileToPinata(file) {
    try {
        // Create a FormData object to send the file data
        const formData = new FormData();
        formData.append("file", file);
        // Make an HTTP POST request to Pinata API to upload the file
        const response = await axios.post(PINATA_UPLOAD_ENDPOINT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_API_SECRET,
            },
        });

        // Log the CID (Content Identifier) of the uploaded file
        const { IpfsHash } = response.data;
        console.log(`File ${file.name} uploaded successfully. CID: ${IpfsHash}`);

        // Return the CID
        return IpfsHash;
    } catch (error) {
        // Log any errors that occur during the upload process
        console.error(`Error uploading file ${file.name} to Pinata:`, error);
        throw error;
    }
}

// Function to upload multiple files to Pinata
export async function uploadToPinata(files) {
    try {
        // Array to store the CIDs of uploaded files
        const cids = [];

        // Iterate through each file
        for (const file of files) {
            // Upload the file to Pinata and store the CID
            const cid = await uploadFileToPinata(file);
            cids.push(cid);
        }

        // Return the array of CIDs
        return cids[0];
    } catch (error) {
        // Log any errors that occur during the upload process
        console.error('Error uploading files to Pinata:', error);
        throw error;
    }
}
