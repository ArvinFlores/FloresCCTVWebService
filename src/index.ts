import express from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/', (_, res) => res.send('FloresCCTV web service'));

app.listen(port, () => {
  console.log(`FloresCCTV web service started on port ${port}`);
});
