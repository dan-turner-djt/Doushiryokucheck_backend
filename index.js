import express from 'express'

const app = express();

app.listen(5000, () => console.log('Api running on port 5000'));

app.get('/', (req, res) => res.json("It's running"));