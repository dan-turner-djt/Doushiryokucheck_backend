import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { QuestionInfo } from './defs';
import https from 'https';
import path from 'path';
import fs from 'fs';

const app: Express = express();
app.use(cors());
const port = 5000;

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '..', 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '..', 'cert', 'cert.pem'))
}, app);

//sslServer.listen(port, () => console.log(`Secure server is running on ${port}`));

app.listen(port, () => console.log(`Server is running on ${port}`));

app.get('/', (req: Request, res: Response) => res.json("Successful request"));

app.get('/question', (req: Request, res: Response) => {

  const verbInfo = {verb: {kana: "たべる", kanji: "食べる"}, type: 0};
  const formInfo = {displayName: "Present", info: {formName: 1}};

  const info: QuestionInfo = {verbInfo: verbInfo, formInfo: formInfo};

  return res.json(info);
});