import express, { Express, Request, Response } from 'express'

const app: Express = express();
const port = 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));

app.get('/', (req: Request, res: Response) => res.json("Hello Mr Khin"));