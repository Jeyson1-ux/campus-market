import express from 'express';
import {
    createListing,
    getListingById,
    getListings, 
    updateListing,
    deleteListing,
    getListingStats  
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getListings); // Route to get all listings, with optional query parameters for filtering by universityId and type
router.get("/stats", getListingStats); // Måste ligga före id, annars kommer express tro att stats är ett id, endpoint
router.get("/:id", getListingById); // Route to get a specific listing by its ID
router.post("/", createListing); // Route to create a new listing;
router.put("/:id", updateListing); // Route to update an existing listing by its ID
router.delete("/:id", deleteListing); //Route to delete a specific listing by id

export default router; // Export the router to be used in the main application file (app.js)

