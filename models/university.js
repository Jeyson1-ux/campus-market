import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    location: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true // Each university have it own unique identifier code
    }
});

export default mongoose.model('University', universitySchema);

