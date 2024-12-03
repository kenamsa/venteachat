const responseProductSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],  // Image URLs or paths
        required: true
    },
    condition: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    success: {
        type: Boolean,
        default: true
    },
    message: {
        type: String,
        default: "Product created successfully"
    }
});

module.exports = mongoose.model('ResponseProduct', responseProductSchema);
