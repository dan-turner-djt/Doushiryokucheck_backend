import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.port;

app.listen(5000, () => console.log(`Server is running on ${port}`));

app.get('/', (req, res) => res.json("Hello Mr Khin"));