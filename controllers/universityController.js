import University from "../models/university.js";

export const getUniversities = async (req,res) => {
    try {
        const universities = await University.find(); // Retrieve all universities from the database
        res.status(200).json(universities); // Send the list of universities as a JSON response with a 200 OK status
    } catch (error) {
        res.status(500).json({message: "Failed to retrieve universities"});
    }
};
    
export const createUniversity = async (req,res) => {
    try {
        const {name, location, code} = req.body;// Extract the name, location, and code from the request body

        if (!name || !location || !code) {
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUniversity = await University.findOne({ code});
        if (existingUniversity) {
            return res.status(400).json({message: "University code already exists"});
        }

        const university = new University.create({name, location, code}); // Create a new university document in the database
        res.status(201).json(university); // Send the created university as a JSON response with a 201 Created status
    } catch (error) {
        res.status(500).json({message: "Failed to create a university"});
    }
};