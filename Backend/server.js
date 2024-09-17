import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();            // to get access to .env
const app = express();

const PORT = process.env.BACKEND_PORT || 8080;

app.use(cors({ origin: ["http://localhost:5173"] , credentials: true }));
app.use(express.json());    // parse incoming req with JSON payloads
app.use(cookieParser());    // parse incoming cookies


app.get("/",(req,res)=>{
  res.send("Hello World");
})


app.use("/api/auth",authRoutes);

// ==== app.listen() ====

const startServer = async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    console.log("DB connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} - http://localhost:${PORT}`);
    });
  } else {
    console.error("Error connecting to the database. Server not started.");
    process.exit(1); // Exit the process with failure code
  }
};

startServer();






/*  app.use(express.json());

It automatically parses the JSON data in the body of incoming requests and makes it available in req.body. This is particularly useful for handling POST, PUT, or PATCH requests where the request body contains JSON data.

Use app.use(express.json()); to ensure that your Express.js application can correctly parse and handle JSON data in request bodies.
 
What Happens If You Don’t Use It
req.body Undefined

*/