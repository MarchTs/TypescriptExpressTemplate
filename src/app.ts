import express, { Application, Request, Response } from 'express';
import router from './router';

const port = 3000;

const app: Application = express();

app.use(express.json());

app.use(router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

console.log('starting Project, Listening on port', port);

app.listen(port);
