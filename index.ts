import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import https from 'https';
import fs from 'fs';
import { getQuestionInfo } from './src/question';
import { SettingsObject, VerbFormsInfo } from './src/defs';
import { getFullVerbList } from './src/verbInfo';
import { VerbInfo } from 'jv-conjugator';
import { convertVerbFormsInfo } from './src/formInfo';

const secureServer = true;
let isLive = false;

const app: Express = express();
const jsonParser = bodyParser.json();
app.use(cors());
const port = 5000;

if (secureServer) {
  const sslServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/drc-be.djt-backend-serv.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/drc-be.djt-backend-serv.xyz/fullchain.pem')
  }, app);
  
  sslServer.listen(port, () => console.log(`Secure server is running on ${port}`));
} else {
  app.listen(port, () => console.log(`Server is running on ${port}`));
}

isLive = true;

type SettingsInfo = {verbInfo: VerbInfo[], formsInfo: VerbFormsInfo};
const settingsInfo: Map<string, SettingsInfo> = new Map();


app.get('/', (req: Request, res: Response) => res.json("Successful request"));

app.get('/checkLive', (req: Request, res: Response) => res.json({isLive: isLive}));


app.post('/settings/:id', jsonParser, (req: Request, res: Response) => {
  const uid = req.params.id;
  const settings: SettingsObject = req.body.settings;

  getFullVerbList(settings)
    .then((info: VerbInfo[]) => {
      const formsInfo: VerbFormsInfo = convertVerbFormsInfo(settings.verbForms, settings.auxForms, settings.exclusiveAux);

      const newInfo: SettingsInfo = {verbInfo: info, formsInfo: formsInfo};
      settingsInfo.set(uid, newInfo);
      res.send("Settings received");
    })
    .catch(err => {
      console.log(err);
			res.status(500).send((err as Error).message);
		});
});


app.get('/question/:id', (req: Request, res: Response) => {
  const uid = req.params.id;

  try {
    let info: SettingsInfo | undefined = settingsInfo.get(uid);
    if(!info) {
      throw new Error("Uid not in store");
    }

    const questionInfo = getQuestionInfo(info.verbInfo, info.formsInfo);
    return res.json(questionInfo);
  } catch (e) {
    console.log((e as Error).message);
    return res.status(500).send((e as Error).message);
  }
});