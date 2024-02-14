import { createClient, commandOptions } from "redis";
import { copyFinalDist, downloadS3Folder } from "./Minio";
import { buildProject } from "./build";


const subscriber = createClient({
    url: 'redis://127.0.0.1:6379'});
subscriber.on('connect', () => {
    console.log('Subscriber connected to Redis server');
});

subscriber.on('error', (error) => {
    console.error('Error connecting to Redis server:', error);
});

subscriber.on('message', (channel, message) => {
    console.log(`Received message from channel ${channel}: ${message}`);
});
subscriber.connect();

async function GetIds() {
    while(1) {
        const response = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'Build-Queue',
            0
          );
        // @ts-ignore
          const id = response.element
          await downloadS3Folder(`output/${id}`);
          await buildProject(id);
           copyFinalDist(id);
              
				console.log(response);
    }
}
GetIds();



