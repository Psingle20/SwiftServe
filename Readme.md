### SWIFTSERVE ###
A deployment service to deploy your React Websites ( Js or Ts ) to the internet. 
Take your projects online with speed and simplicity.


This project uses 3 servers to achieve deployment service :
1. Cloning Server:
 - Clones all your source code files and stores them in AWS S3 or MinioS3 bucket.
 - Generates a random ID and stores the ID into our REDIS Queue.
2. Building Server:
 - NodeJS server builds your code and stores the built code files into Minio S3 bucket.
3. Serving Server:
 - Serves you your deployed website on the internet with a custom URL.
   
The deployment process is quick & efficient and the entire project was deployed on a GKE ( Google Kubernetes Engine ) Cluster.

The `main` branch contains the source code for the 3 essential servers.
The configuration files for the Kubernetes cluster can be found in the `k8-cluster-config` branch.

Witness SwiftServe in action through our demo video: https://youtu.be/B2qUnOyspUQ
