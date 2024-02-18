import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import fs, { readFileSync } from 'fs';
import path from 'path';
import mimeTypes from "mime-types";

const s3Client = new S3Client({
    region: 'us-east-1', // Replace with your desired region
    credentials: {
        accessKeyId: "Fiy8g1zSzb1RkGRlgc6v",
        secretAccessKey: "Gx7IX5SNlT7fLpAiMPDCTukRtTi7aZvpKc0OnZhU"
    },
    endpoint: 'http://34.70.88.177:9000/', // Replace with your MinIO server address
    tls: false // Ensure SSL is explicitly disabled
});

export async function downloadS3Folder(prefix: string) {
    try {
        const { Contents } = await s3Client.send(new ListObjectsCommand({
            Bucket: 'swiftserve', // Replace with your bucket name
            Prefix: prefix
        }));
        
        if (!Contents) {
            console.log("No files found.");
            return;
        }
        
        await Promise.all(Contents.map(async ({ Key }) => {
            if (!Key) {
                return;
            }
            const finalOutputPath = path.join(__dirname, Key);
            const dirName = path.dirname(finalOutputPath);
            
            if (!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, { recursive: true });
            }
            
            const getObjectParams = {
                Bucket: 'swiftserve', // Replace with your bucket name
                Key: Key
            };
            
            const { Body } = await s3Client.send(new GetObjectCommand(getObjectParams));
            const s3Stream = Body as Readable;
            const outputFile = fs.createWriteStream(finalOutputPath);
            
            s3Stream.pipe(outputFile);
            
            return new Promise<void>((resolve, reject) => {
                outputFile.on('finish', () => resolve());
                outputFile.on('error', (err) => reject(err));
            });
        }));
        
        console.log("Download complete.");
    } catch (error) {
        console.error("Error downloading files:", error);
    }
}
export function copyFinalDist(id: string) {
    console.log("file uploading started");
    const folderPath = path.join(__dirname, `output/${id}/dist`);
    const allFiles = getAllFiles(folderPath);
    allFiles.forEach(file => {
        uploadFile(`dist/${id}/` + file.slice(folderPath.length + 1).replace(/\\/g, '/'), file);
    })
    console.log("File uploaded successfully");
}
const getAllFiles = (folderPath: string) => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }
    });
    return response;
}
export const uploadFile = async (fileName: string, localFilePath: string) => {
    // localFilePath = "C:\Users\ingle\Desktop" + localFilePath;
    const fileContent = readFileSync(localFilePath);
    const contentType = mimeTypes.lookup(localFilePath) || "application/octet-stream";
    console.log("FILE NAME: ", fileName);
    console.log("LOCAL FILE PATH: ", localFilePath);
    console.log("CONTENT TYPE: ", contentType);
    
    try {
        const params = {
            Bucket: "swiftserve",
            Key: fileName,
            Body: fileContent,
            ContentType: contentType
        };

        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        
        console.log(response);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};
