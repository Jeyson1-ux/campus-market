import dotenv from 'dotenv';
import connectDB from './config/db.js';
import University from './models/university.js';
import User from "./models/user.js";
import Listing from "./models/listing.js";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();
        await Listing.deleteMany();
        await User.deleteMany();
        await University.deleteMany();

        const universities = await University.insertMany([ 
            {name: "Högskolan Kristianstad", location: "Kristianstad", code: "HKR"},
            {name: "Lunds universitet", location: "Kristianstad", code: "LU"},
            {name: "Malmö universitet", location: "Kristianstad", code: "MAU"},
            {name: "Stockholms universitet", location: "Kristianstad", code: "SU"},
            {name: "Linköpings univeristet", location: "Kristianstad", code: "LIU"}
        ]);

        const users = await User.insertMany([
            {
                name: "Jeyson",
                email: "Jeyson@student.com",
                password:"icicestparis",
                universityId: universities[0]._id
            },

            {
                name: "Alicia",
                email: "Alicia@student.com",
                password:"alicia123",
                universityId: universities[0]._id
            },

            {
                name: "Erik",
                email: "Erik@student.com",
                password:"Erikisbest",
                universityId: universities[0]._id
            },

            {
                name: "Alma",
                email: "Alma@student.com",
                password:"queenalma",
                universityId: universities[0]._id
            },

            {
                name: "Cecilia",
                email: "Celicia@student.com",
                password:"celicialind",
                universityId: universities[0]._id
            }
        ]);

        await Listing.insertMany([
            {
                title: "T1-84 Calculator",
                description: "Used in math course, works perfectly",
                price: 350,
                condition: "Great",
                type: "sell",
                imageUrl: "",
                contactInfo: "jeyson@student.com",
                userId: users[0]._id,
                universityId: universities[0]._id
            },
            
             {
                title: "Physics textbook",
                description: "Used in Physics course, still in good shape",
                price: 200,
                condition: "Good",
                type: "sell",
                imageUrl: "",
                contactInfo: "Alicia@student.com",
                userId: users[0]._id,
                universityId: universities[0]._id
            },

             {
                title: "Laptop stand",
                description: "Useful for long study sessions",
                price: 350,
                condition: "Good",
                type: "sell",
                imageUrl: "",
                contactInfo: "Erik@student.com",
                userId: users[0]._id,
                universityId: universities[0]._id
            },

             {
                title: "Law book",
                description: "Used for the law course in second year, comes with excellent notes",
                price: 275,
                condition: "Great",
                type: "sell",
                imageUrl: "",
                contactInfo: "Alma@student.com",
                userId: users[0]._id,
                universityId: universities[0]._id
            },

             {
                title: "Macbook charger",
                description: "I am lending out my macbook charger for anyone in need",
                price: 0,
                condition: "Great",
                type: "lend",
                imageUrl: "",
                contactInfo: "cecilia@student.com",
                userId: users[0]._id,
                universityId: universities[0]._id
            },
        ]);

        console.log("Seed data inserted successfully");
        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err.message);
        process.exit(1);
    }
};

seedData();