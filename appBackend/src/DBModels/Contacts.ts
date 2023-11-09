import { any, string } from 'joi';
import mongoose from 'mongoose';

// Define the schema for the Kapan object
const Schema = new mongoose.Schema({
  id:{
    type : Number,
    unique  : true
  } ,
  name : {type : String,required : true},
  email: String,
  dob : String,
  number : {type : Number,unique : true}
});

// Create the Mongoose model for Kapan
const Contactmodel = mongoose.model('Contacts', Schema);

export default Contactmodel;


