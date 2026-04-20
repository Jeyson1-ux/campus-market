import express from 'express';
import { createUniversity, getUniversities } from '../controllers/universityController.js';

const router = express.Router();

router.get("/", getUniversities); // Define a GET route for retrieving all universities, which will call the getUniversities controller function when accessed.

router.post("/", createUniversity); // Define a POST route for creating a new university, 
// which will call the createUniversity controller function when accessed.

export default router; // Export the router to be used in the main server file,
// allowing the application to handle university-related routes.