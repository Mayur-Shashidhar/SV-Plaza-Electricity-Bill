import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());


import fs from 'fs';
const clients = JSON.parse(fs.readFileSync('./clients.json'));

app.get('/api/clients', (req, res) => {
  res.json(clients);
});

// Add more endpoints as needed for readings, calculations, etc.

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
