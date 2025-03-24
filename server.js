import express from 'express'
import { config } from 'dotenv'
config()

let app = express()
app.use(express.json())

import { connectDB } from './config/db.config.js'
import { errController } from './controllers/error.controller.js'

connectDB()
app.use(errController);


process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION 💥");
    console.log(err.name, err.message);
    // process.exit(1);
  });
  
  // Unhandled Excpections
  process.on("uncaughtException", (err) => {
    console.log("UNHANDLED Excpections 💥");
    console.log(err.name, err.message);
    // process.exit(1);
  });
app.listen(process.env.PORT, () => console.log("This server is running on " + process.env.PORT))
