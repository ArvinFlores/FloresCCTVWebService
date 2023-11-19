import express from 'express';
import { recordingRoutes } from './routes/recording';
import { apiErrorResponse } from './middleware/api-error-response';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api', [recordingRoutes]);
app.use(apiErrorResponse);

app.get('/', (_, res) => res.send('FloresCCTV web service'));
app.get('*', (_, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`FloresCCTV web service started on port ${port}`);
});
