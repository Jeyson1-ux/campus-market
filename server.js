import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

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