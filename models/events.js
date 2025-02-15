const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app=express();
app.use(express.json())


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  const eventSchema= new mongoose.Schema({
    collegeName : String,
    title : String,
    description : String,
    date : String,
    link : String,
    tags : [String]
  });

  const Event = mongoose.model('Event',eventSchema);
  export default Event;