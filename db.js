const mongoose = require('mongoose');
require('dotenv').config();


 mongoURL='mongodb://localhost:27017/Voting1'
// const mongoURL = process.env.MONGODB_URL;
//mongodb+srv://singlaparth15:Parth.15@cluster2.bi8dafv.mongodb.net/


mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;



db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


module.exports = db;