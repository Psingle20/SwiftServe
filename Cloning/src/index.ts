import express from "express";
import cors from "cors";
import {generate} from "./id_generate";
import simpleGit from "simple-git";
import { createClient } from "redis";
import { getAllFiles } from "./getFiles";
import path from "path";
import { uploadFile } from "./Upload_file";
const publisher = createClient({
  url: 'redis://127.0.0.1:6379',
});
publisher.connect();
publisher.on('error', err => console.error(err));

const app = express()
app.use(cors());
const port = 3000
app.use(express.json());
app.post("/deploy",async (req,res)=>{
   const repoURL=req.body.repoURL;
  const id:string = generate();
  await simpleGit().clone(repoURL,path.join(__dirname,`output/${id}`) );
   console.log(repoURL);
   
   const files = getAllFiles(path.join(__dirname, `output/${id}`));
console.log(files);

for (const file of files) {
    console.log(file.slice(__dirname.length + 1).replace(/\\/g, '/'));
    await uploadFile(file.slice(__dirname.length + 1).replace(/\\/g, '/'), file);
}
 publisher.lPush("Build-Queue",id);
res.json({
  "id":id
 });

})
app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


