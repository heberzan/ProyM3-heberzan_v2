import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';

const server: Application = express();

server.use(express.json()); // para poder leer JSON en el cuerpo de las solicitudes
server.use(morgan('dev')); // para ver las peticiones en la consola
server.use(cors()); // para permitir solicitudes de diferentes orígenes

server.use(router); // para usar las rutas definidas en el router

export default server;
