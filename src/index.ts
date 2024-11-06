import 'dotenv/config';
import express from 'express';
import { recordingRoutes } from './routes/recording';
import { cameraRoutes } from './routes/camera';
import { apiErrorResponse } from './middleware/api-error-response';
import { apiHeaders } from './middleware/api-headers';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(apiHeaders);
app.use('/api', [
  recordingRoutes,
  cameraRoutes
]);
app.use(apiErrorResponse);

app.get('/', (_, res) => res.send('FloresCCTV web service'));
app.get('*', (_, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`FloresCCTV web service started on port ${port}`);
});
