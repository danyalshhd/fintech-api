import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { errorHandler, NotFoundError } from '@dstransaction/common';

import { quotesRouter } from './routes/quotes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieParser());
app.use(
    cookieSession({
        signed: false,
        secure: true,
        name: 'session',
    })
);

app.use(quotesRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };