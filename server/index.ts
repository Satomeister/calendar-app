import express from 'express';
import dotenv from 'dotenv'

dotenv.config({
  path: 'server/.env'
});

import './core/db'

const app = express();

app.get('/test', (req, res) => {
  res.send('TEST WORK');
})

app.listen(3001, () => {
  console.log('Server is running');
});