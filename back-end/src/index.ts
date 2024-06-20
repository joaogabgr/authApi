import { AppDataSource } from "./data-source";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

import dotenv from 'dotenv';
dotenv.config();

import userRouter from "./routes/userRouter";

const app = express()
const port = 5000


AppDataSource.initialize().then(async () => {
    console.log('Conexão com o banco de dados estabelecida');
    
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/users', userRouter);
   
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}).catch(error => {
    throw error;
});