const mongoose = require('mongoose');
require('dotenv').config();


// const mongoURL= 'mongodb://localhost:27017/hotels'  //Replace 'hotels' with yur databse
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL=process.env.MONGODB_URL_LOCAL
// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser :true,
    useUnifiedTopology:true

})
const db = mongoose.connection;  //Mongoose maintains a default connection object representing the MongoDB connection

// Define event listeners for databases connection

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=> {
    console.error('Mongodb connection error',err);
});
db.on('disconnected',() =>{
    console.log('Mongodb disconnected');
});

// export the db object - export the database connection . 
module.exports= db;

// db.js file act as a central Module that manages the connection to your MongoDB database using Mongoose. It sets up the connection , handles connection events and exports the connection object to interact with the database. 