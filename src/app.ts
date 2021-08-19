import express, { Application, Request, Response } from 'express';
import ProductRouter from './routes/ProductRoute';
import StockRoute from './routes/StockRoute';

const port = 3000;

const app: Application = express();

app.use(express.json());

app.use('/products', ProductRouter);
app.use('/stocks', StockRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

console.log('starting Project, Listening on port', port);

app.listen(port);
