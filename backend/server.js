import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from './Routes/auth.routes.js'
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/user.routes.js'

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const __dirname = path.resolve();


dotenv.config();

app.use(express.json());
app.use(cookieParser());   // use before routes


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes)
app.use('/api/user', userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});



server.listen(process.env.PORT,()=>{
  connectToMongoDB();
  console.log(`server listen on port ${process.env.PORT}`)
})