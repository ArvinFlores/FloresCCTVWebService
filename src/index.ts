import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import https from 'https';
import { recordingRoutes } from './routes/recording';
import { apiErrorResponse } from './middleware/api-error-response';
import { apiHeaders } from './middleware/api-headers';

const app = express();
const port = process.env.PORT ?? 3000;
const server = process.env.APP_ENV === 'prod'
  ? https.createServer({
    key: fs.readFileSync(process.env.CERT_KEY ?? ''),
    cert: fs.readFileSync(process.env.CERT_FILE ?? '')
  }, app)
  : app;

app.use(express.json());
app.use(apiHeaders);
app.use('/api', [recordingRoutes]);
app.use(apiErrorResponse);

app.get('/', (_, res) => res.send('FloresCCTV web service'));
app.get('*', (_, res) => {
  res.redirect('/');
});

server.listen(port, () => {
  console.log(`FloresCCTV web service started on port ${port}`);
});
