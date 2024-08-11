import express from 'express';
import appRouter from './routes/AppRoute'
import productRouter from './routes/ProductRoute';
import categoryRouter from './routes/CategoryRoute';
import orderRouter from './routes/OrderRoute';
import userRouter from './routes/UserRoute';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1/', appRouter);
app.use('/api/v1/', productRouter);
app.use('/api/v1/', categoryRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', userRouter);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});

export default app;