import express from 'express';
import dotenv from 'dotenv';
import appRouter from './routes/AppRoute'
import productRouter from './routes/ProductRoute';
import categoryRouter from './routes/CategoryRoute';
import orderRouter from './routes/OrderRoute';
import userRouter from './routes/UserRoute';
import cartRouter from './routes/CartRoute';
import AuthRoute from './routes/AuthRoute';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/v1/', appRouter);
app.use('/api/v1/', productRouter);
app.use('/api/v1/', categoryRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', userRouter);
app.use('/api/v1/', cartRouter);
app.use('/api/v1/', AuthRoute);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});

export default app;
