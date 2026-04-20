import mongoose from 'mongoose';

const uniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true // Each user must have a unique email address
    },

    password: {
        type: String,
        required: true
    },

    universityId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the University model, ObjectId = unique identifier for each document in MongoDB
        ref: "University",
        required: true
    }
});

export default mongoose.model("User", userSchema);

//ObjectID was used to show a relationship between user and university
//with the fact that each user is belongig to a specific university, 
//Unless the students is taking distant courses too