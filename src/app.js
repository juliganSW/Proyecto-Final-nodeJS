//Importacion de Express para crear el servidor
import express from "express";
//Importacion para las variables de entorno desde el archivo .env
import "dotenv/config";
//Importacion del router de productos
import productsRouter from "./routes/products.routes.js";
//Importacion de CORS para permitir requests desde otros dominios
import cors from "cors";

//Se crea la aplicación de Express
const app = express();

/***Middlewares globales***/
   
//Middleware para poder leer JSON en las requests
app.use(express.json());

// Middleware CORS
app.use(cors());

/***Rutas***/
//las rutas se manejan con productsRouter   
app.use("/products", productsRouter);
app.use("/productos", productsRouter);

//Manejo de rutas
// Este middleware se ejecuta si ninguna ruta coincide
app.use((req, res) => {
    res.status(404).json({
        error: "No se encontró la ruta"
    });
});

/***Inicio del servidor***/
  
//Puerto del servidor, desde .env o por 3001
const PORT = process.env.PORT || 3001;

//Se levanta el servidor
app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
