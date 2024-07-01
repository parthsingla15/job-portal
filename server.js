const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();

const bodyParser=require('body-parser')
app.use(bodyParser.json());

//const User=require('./models/userSchema')


const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

//const passport=require('./auth')
//app.use(passport.initialize());
//const localauthmiddleware=passport.authenticate('local',{session:false});



app.listen(3000,()=>{ 
    console.log('server is active')
  })