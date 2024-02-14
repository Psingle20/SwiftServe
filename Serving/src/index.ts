import express from "express"

import httpProxy from "http-proxy";

const app = express()
const PORT = 8000

const BASE_PATH = 'http://34.70.88.177:9000/swiftserve/dist'

const proxy = httpProxy.createProxy()

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
  


    // Custom Domain - DB Query
    console.log(subdomain);

    const resolvesTo = `${BASE_PATH}/${subdomain}`;

    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })

})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
   
    if (url === '/')
        proxyReq.path += 'index.html'

})


app.listen(PORT, () => console.log(`Reverse Proxy Running..${PORT}`))