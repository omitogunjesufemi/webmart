import express from 'express';
import appRouter from './routes/AppRoute'
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', appRouter);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});

export default app;