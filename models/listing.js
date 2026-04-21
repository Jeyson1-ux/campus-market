import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema( // Define the schema for a listing , new mongoose = create a new instance of the mongoose library
    {
        title: {
            type: String,
            required: true,
            trim: true // Remove whitespace from both ends of the title string
        },
        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0 // Ensure price is a positive number
        },

        condition: {
            type: String,
            required: true,
            enum: ["Okay", "Good", "Great", "Like new", "New"] // Define allowed values for condition, Enum = a set of predefined values that the condition field can take
        },
        type: {
            type: String,
            required: true,
            enum: ["Sell", "Lend"] // Define allowed values for type
        },

        imageUrl: {
            type: String,
            default: "" // If user dont send an image URL, default will be string empty
        },

        contactInfo: {
            type: String,
            required: true,
            trim: true // Remove whitespace from both ends of the contact info string
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },

        universityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "University",
            required:true
        }
    },
    { timestamps: true} // Automatically add createdAt and updatedAt fields
);

export default mongoose.model("Listing", listingSchema); // Export the model based on the schema, "Listing" is the name of the collection in MongoDB