import express, { Express, Request, Response } from 'express'
import { FormName, FullFormInfo, VerbInfo, VerbType } from './defs';

const app: Express = express();
const port = 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));

app.get('/', (req: Request, res: Response) => res.json("Successful request"));

app.get('/question', (req: Request, res: Response) => {

  const verbInfo = {verb: {kana: "たべる", kanji: "食べる"}, type: VerbType.Ichidan};
  const formInfo = {displayName: "Present", info: {formName: FormName.Present}};

  const info: {verbInfo: VerbInfo, formInfo: FullFormInfo} = {verbInfo: verbInfo, formInfo: formInfo};

  return res.json(info);
});