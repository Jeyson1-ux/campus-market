import express from 'express';
import { createUniversity } from '../controllers/universityControllers';

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("UNIVERSITY ROUTE IS WORKING"); 
});

router.post("/", createUniversity); // Define a POST route for creating a new university, 
// which will call the createUniversity controller function when accessed.

export default router; // Export the router to be used in the main server file,
// allowing the application to handle university-related routes.