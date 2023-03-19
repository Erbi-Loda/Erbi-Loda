//importacion de librerias para generacion del puerto y testeo de endpoints
import express from "express";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import { Server as SocketServer } from "socket.io";

//importacion y configuracion para lectura del archivo .env
import * as dotenv from "dotenv";
dotenv.config();

//Conexion con la base de Datos
import { connectDB } from "./src/db/mongodb.js";
connectDB();

//importacion de las rutas
import index_router from "./src/routes/index.router.js";

//Preparacion del servidor
const app = express();
const server = http.createServer(app);
//Puerto configurable
const { PORT } = process.env;
const portServ = PORT || 3001;

const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

//midlws
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas aqui
app.use(index_router);

io.on("connection", (socket) => {
  console.log(`id: ${socket.id}`);
});

//escuchador del server/app
server.listen(portServ, () => {
  console.log(`Server on port ${portServ}`);
});
