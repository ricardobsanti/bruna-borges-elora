import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./docs/',import.meta.url));
const prefix='/bruna-borges-elora/';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/'){res.writeHead(302,{Location:prefix});return res.end()}if(!url.pathname.startsWith(prefix)){res.writeHead(404);return res.end('Not found')}let relative=decodeURIComponent(url.pathname.slice(prefix.length));if(relative.endsWith('/')||!relative)relative+='index.html';const file=path.resolve(root,relative);if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}}).listen(Number(process.env.PORT)||4175,'127.0.0.1',()=>console.log('Prévia: http://127.0.0.1:'+(process.env.PORT||4175)+'/bruna-borges-elora/'));
