const express = require("express")
const Database = require("./config/Database")
const taskRoutes = require("./routes/taskRoutes")
const cors = require("cors")

const app = express()

require("dotenv").config();

const PORT = process.env.PORT

Database();

app.use(express.json());

const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true
}

app.use(cors(corsOptions));

app.use("/api/v1",taskRoutes)

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})