import Listing from "../models/listing.js"; // Import the listing model
import "../models/university.js"; // Import the university model to populate the universityId field in the listing
import "../models/user.js"; // Import the user model to populate the userId field in the listing

// To create a new listing

export const getListings = async (req,res) => {
    try{
        const filter = {} // Create an empty filter object to find the listing by its ID

        if (req.query.universityId){
            filter.universityId = req.query.universityId // If universityId is provided in the query parameters, add it to the filter object
        }

        if (req.query.type) {
            filter.type = req.query.type // If type is provided in the query parameters, add it to the filter object
        }

        const listings = await Listing.find(filter) // Find listings in the database that match the filter criteria
            .populate("userId", "name email")
            .populate("universityId", "name code") // Populate the userId and universityId fields with the corresponding data from the User and University collections
        
        res.status(200).json(listings) // Send the found listings as a JSON response with a 200 status code-
    } catch (err) {
        res.status(500).json({ message: err.message}) // If an error occurs, send a JSON response with the error message and a 500 status code
    }
};

export const getListingById = async (req,res) => {
    try{
        const foundListing = await Listing.findById(req.params.id) // get the listing by its ID from the request parameters
            .populate("userId", "name email")
            .populate("universityId", "name")
        
            if (!foundListing) {
                return res.status(404).json({message: "Listing not found"});
            }
            res.status(200).json(foundListing)// Send the found listing as a JSON response with a 200 status code
    } catch (err) {
        return res.status(500).json({message: err.message}) // If an error occurs, send a JSON response with the error message and a 500 status code
    }
}

export const createListing = async (req,res) => {
    try {
        const{ 
           title,
           description,
           price,
           condition,
           type, 
           imageUrl,
           contactInfo,
           userId, 
           universityId,
        } = req.body; // Destructure the listing details from the request body

        if (
            !title ||
            !description ||
            price === undefined ||
            !condition ||
            !type ||
            !contactInfo ||
            !userId ||
            !universityId 
        ) {
            return res.status(400).json({ message: "All fields must be provided"});
        }

        const newListing = await Listing.create({
            title,
            description,
            price, 
            condition,
            type,
            imageUrl,
            contactInfo,
            userId,
            universityId
        });
        res.status(201).json(newListing)
    } catch (err) {
        res.status(500).json({message: "Failed to create listing"})  
    }
}

export const updateListing = async (req, res) => {
    try {
        const foundListing = await Listing.findById(req.params.id); //Redigera baserat på ID

        if (!foundListing) {
            return res.status(404).json({ message: "Listing was not found"});
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true} // Return the updated listing and run validators on the update
        ); //runValidators = ensure that the updated data adheres to the schema's validation rules

        res.status(200).json(updatedListing); //201 = Created, 200 = OK
    } catch (err) {
        res.status(500).json({ message: "Failed to update the listing"});
    }
};

export const deleteListing = async (req, res) => {
    try {
        const foundListing = await Listing.findById(req.params.id); //Redigera baserat på ID

        if (!foundListing) {
            return res.status(404).json({ message: "Listing was not found"});
        }

        await Listing.findByIdAndDelete(req.params.id);
          
        res.status(200).json({message: "Listing successfully deleted"}); //201 = Created, 200 = OK
    } catch (err) {
        res.status(500).json({ message: "Failed to delete the listing"});
    }
};

export const getListingStats = async (req, res) => {
    try {
        const totalListings = await Listing.countDocuments(); //countdocuments = count the total number of documents in the Listing collection

        const avgPriceResult = await Listing.aggregate([ //aggregate = mongodb sätt att göra beräkningar, 
            //ta alla listing och räkna ut medelvärdet på price componenten
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: "$price"}
                }
            }
        ]);

        res.status(200).json({
            totalListings, 
            averagePrice: avgPriceResult[0]?.averagePrice || 0
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};