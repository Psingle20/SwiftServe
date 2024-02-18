
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import axios from "axios"

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  let [uploadId, setUploadId] = useState("123");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black dark:bg-gray-900 p-4 ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Deploy your  Frontend Application</CardTitle>
          <CardDescription>Enter the URL of your GitHub repository to deploy it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-url">GitHub Repository URL</Label>
              <Input 
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                }} 
                placeholder="https://github.com/username/repo" 
              />
            </div>
            <Button className="justify-center ml-40" onClick={async () => {
             
              const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
                repoURL: repoUrl
              });
              setUploadId(res.data.id);
            }
          }>
            Deploy
            
            </Button>
            {
              uploadId!=="123" && <div>
              You Can Visit Your Website At: <span  className="cursor-pointer hover:underline hover:font-semibold text-sm"><a href={`http://${uploadId}.swiftserve.duckdns.org:31425`}>http://{uploadId}.swiftserve.duckdns.org:31425</a></span>
               </div>
            }
           
          </div>
        </CardContent>
      </Card>
      </main>
     )}