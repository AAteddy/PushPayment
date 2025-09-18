import { type Express } from 'express';
import pushRouter from './routes/push.router';


export default function initRoutes(app: Express): void {
    app.use('/v1.0/pushpayment/api', pushRouter);
}