import express, { Express, Request, Response } from 'express'
import { QuestionInfo } from './defs';

const app: Express = express();
const port = 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));

app.get('/', (req: Request, res: Response) => res.json("Successful request"));

app.get('/question', (req: Request, res: Response) => {

  const verbInfo = {verb: {kana: "たべる", kanji: "食べる"}, type: 0};
  const formInfo = {displayName: "Present", info: {formName: 1}};

  const info: QuestionInfo = {verbInfo: verbInfo, formInfo: formInfo};

  return res.json(info);
});