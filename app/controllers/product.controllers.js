const Product = require('../model/product.model');

// Create and save a new product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.images) {
    return res.status(400).send({
      message: "The product details cannot be empty.",
    });
  }

  // Create a new product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    images: req.body.images,  // Expecting an array of images
    condition: req.body.condition,  // Optional field
    location: req.body.location,  // Optional field
    brand: req.body.brand,  // Optional field
    model: req.body.model,  // Optional field
    createdAt: new Date(),  // Creation date
  });

  // Save product in the database
  product
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the product.",
      });
    });
};

// Retrieve all products from the database
exports.findAll = (req, res) => {
  Product.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving the products.",
      });
    });
};

// Retrieve a single product by ID
exports.findOne = (req, res) => {
  Product.findById(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with ID " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with ID " + req.params.productId,
      });
    });
};

// Update a product by ID
exports.update = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.images) {
    return res.status(400).send({
      message: "Product details to update cannot be empty.",
    });
  }

  // Find and update the product
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
      condition: req.body.condition,  // Optional field
      location: req.body.location,  // Optional field
      brand: req.body.brand,  // Optional field
      model: req.body.model,  // Optional field
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with ID " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error updating product with ID " + req.params.productId,
      });
    });
};

// Delete a product by ID
exports.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with ID " + req.params.productId,
        });
      }
      res.send({ message: "Product deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with ID " + req.params.productId,
      });
    });
};
