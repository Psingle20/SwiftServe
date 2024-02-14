import { S3 } from "aws-sdk";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

//r2-congif 
// const s3 = new S3({
//     accessKeyId: "4f5a2948ec333fa6fd7c05c09f9e6755",
//     secretAccessKey: "6b79c4d49309182eb9fd7bb9cf3c99f95ebb08df830fce94e20e1d72896077af",
//     endpoint: "https://2f23de4b98ddafd57ec70554794c0e1b.r2.cloudflarestorage.com "

    
    
// })
const s3Client = new S3Client({
    region: 'us-east-1', // Replace with your desired region
    credentials: {
        accessKeyId: "Fiy8g1zSzb1RkGRlgc6v",
        secretAccessKey: "Gx7IX5SNlT7fLpAiMPDCTukRtTi7aZvpKc0OnZhU"
    },
    endpoint: 'http://34.70.88.177:9000/', // Replace with your MinIO server address
    tls: false // Ensure SSL is explicitly disabled
});


// export const uploadFile = async (fileName: string, localFilePath: string) => {
//     const fileContent = fs.readFileSync(localFilePath);
//     const response = await s3.upload({
//         Body: fileContent,
//         Bucket: "swiftserve",
//         Key: fileName,
//     }).promise();
//     console.log(response);
// }
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = readFileSync(localFilePath);
    
    try {
        const params = {
            Bucket: "swiftserve",
            Key: fileName,
            Body: fileContent
        };

        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        
        console.log(response);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};