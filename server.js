import express from 'express';
import appRouter from './routes/AppRoute'
import productRouter from './routes/ProductRoute';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1/', appRouter);
app.use('/api/v1/', productRouter);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});

export default app;