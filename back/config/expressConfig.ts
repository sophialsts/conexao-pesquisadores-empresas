import express from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const app = express();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.FRONT_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;

