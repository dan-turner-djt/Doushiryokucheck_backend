import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import https from 'https';
import fs from 'fs';
import { getQuestionInfo } from './src/question';
import { SettingsObject, VerbFormsInfo } from './src/defs';
import { convertVerbTypesInfo } from './src/verbInfo';
import { convertVerbFormsInfo } from './src/formInfo';
import mysql from 'mysql2/promise';
import { convertVerbs } from './src/convert';
import { convertLevelsInfo } from './src/levelInfo';

require('dotenv').config();

const secureServer = true;
let isLive = false;

const app: Express = express();
const jsonParser = bodyParser.json();
app.use(cors());
const port = process.env.PORT;
const privkey = process.env.PRIVKEY;
const fullchain = process.env.FULLCHAIN;

export const dbConnection = async() => await mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE
});

if (secureServer && privkey && fullchain) {
  const sslServer = https.createServer({
    key: fs.readFileSync(privkey),
    cert: fs.readFileSync(fullchain)
  }, app);
  
  sslServer.listen(port, () => console.log(`Secure server is running on ${port}`));
} else {
  app.listen(port, () => console.log(`Server is running on ${port}`));
}

isLive = true;

type SettingsInfo = {verbsInfo: number[], formsInfo: VerbFormsInfo, levelsInfo: number[]};
const settingsInfo: Map<string, SettingsInfo> = new Map();


app.get('/', (req: Request, res: Response) => res.json("Successful request"));

app.get('/checkLive', (req: Request, res: Response) => {
  res.json({isLive: isLive});
});


app.post('/settings/:id', jsonParser, (req: Request, res: Response) => {
  const uid = req.params.id;
  const settings: SettingsObject = req.body.settings;

  try {
    const verbsInfo: number[] = convertVerbTypesInfo(settings.verbType);
    const formsInfo: VerbFormsInfo = convertVerbFormsInfo(settings.verbForms, settings.auxForms, settings.exclusiveAux);
    const levelsInfo: number[] = convertLevelsInfo(settings.verbLevel);

    const newInfo: SettingsInfo = {verbsInfo: verbsInfo, formsInfo: formsInfo, levelsInfo: levelsInfo};
    settingsInfo.set(uid, newInfo);
    res.send("Settings received");
  }
  catch (err) {
    console.log(err);
		res.status(500).send((err as Error).message);
  }
});


app.get('/question/:id', async (req: Request, res: Response) => {
  const uid = req.params.id;

  try {
    let info: SettingsInfo | undefined = settingsInfo.get(uid);
    if(!info) {
      throw new Error("Uid not in store");
    }

    const questionInfo = await getQuestionInfo(info.verbsInfo, info.formsInfo, info.levelsInfo);
    return res.json(questionInfo);
  } catch (e) {
    console.log((e as Error).message);
    return res.status(500).send((e as Error).message);
  }
});

app.post('/convert', jsonParser, async (req: Request, res: Response) => {
  if (!secureServer) {
    await convertVerbs();
  }
  res.send("Converted");
});