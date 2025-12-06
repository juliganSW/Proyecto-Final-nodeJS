import express from "express"
import "dotenv/config"
//import usersRouter from "./routes/users.routes.js"
import productsRouter from "./routes/products.routes.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

//app.use(['/users','usuarios'], usersRouter)
app.use("/products", productsRouter);
app.use("/productos", productsRouter);


app.use((req, res)=>{
    res.status(404).json({error: 'no se encontró la ruta'})
})

const PORT = process.env.PORT || 3001
app.listen (PORT,()=>console.log(`http://localhost:${PORT}`))
