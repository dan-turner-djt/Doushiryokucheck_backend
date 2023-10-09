import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import https from 'https';
import path from 'path';
import fs from 'fs';
import { getQuestionInfo } from './src/question';

const secureServer = true;
const isLive = true;

const app: Express = express();
app.use(cors());
const port = 5000;

if (secureServer) {
  const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'cert.pem'))
  }, app);
  
  sslServer.listen(port, () => console.log(`Secure server is running on ${port}`));
} else {
  app.listen(port, () => console.log(`Server is running on ${port}`));
}

app.get('/', (req: Request, res: Response) => res.json("Successful request"));

app.get('/checkLive', (req: Request, res: Response) => res.json({isLive: isLive}));


app.get('/question', (req: Request, res: Response) => {
  try {
    const info = getQuestionInfo();
    return res.json(info);
  } catch (e) {
    console.log((e as Error).message);
    return res.errored;
  }
});