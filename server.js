import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import universityRoutes from "./routes/universityRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies from incoming requests

app.use("/api/listings", listingRoutes); // Use the listing routes for any requests to /api/listings

app.use("/api/universities", universityRoutes); // Use the university routes for any requests to /api/universities

app.get("/", (req, res) => {
    res.send("API IS RUNNING");
});

const startServer = async () => {
    try{
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
       });
    } catch (err) {
        console.error("FAILED TO START SERVER", err.message);
    }
};

startServer();

//The server should not start before the database connection is ready.
//I initialized the backend with Express, connected MongoDB using Mongoose, 
// and configured environment variables.