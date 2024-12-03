const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:  String,
        
    description: String,
        
    price:  Number,  // Updated type for price (prix)
        
    images:  [String],  // Array of strings to store image URLs or paths
        
    condition: [String],  // Optional condition field
        
    createdAt: Date,
        
    location:  String,  // Optional location field
        
    brand:  String,  // Optional brand field
        
    model: String,  // Optional model field
        
    __v:  Number,  // MongoDB versioning field
        
});

// Export the schema as a model
module.exports = mongoose.model('Product', productSchema);
