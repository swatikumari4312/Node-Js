const mongoose =require('mongoose');

//Define the MongoDB connection URL

const mongoURL ='mongodb://localhost:27017/home'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

//Get default connection
const db = mongoose.connection;

//default event listiners for database connection

db.on('connected',() => {
    console.log('Connected to MongoDB server');
});

db.on('error',(err) => {
    console.log('MongoDB connection error:' ,err);
});

db.on('disconnected',() => {
    console.log('MongoDB disconnected');
});

//Export the database
module.exports = db;