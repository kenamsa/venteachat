const mongoose = require("mongoose");

const PartSchema = new mongoose.Schema({
  title:  String, 
  description: String,   
  brand:  String,   
  model:  String,
  condition:  ['new', 'refurbished', 'used'], 
  price:  Number,   
  location: String, 
  createdAt:  Date, 
   
});

module.exports = mongoose.model("Part", PartSchema);
