import express, { Router } from 'express';
import { recordingRoutes } from './routes/recording';
import { apiErrorResponse } from './middleware/api-error-response';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api', [
  Router().use('/recordings', recordingRoutes)
]);
app.use(apiErrorResponse);

app.get('/', (_, res) => res.send('FloresCCTV web service'));

app.listen(port, () => {
  console.log(`FloresCCTV web service started on port ${port}`);
});
