module.exports = (app) => {
  const productController = require("../controllers/product.controllers.js");

  // Create a new product
  app.post("/products", productController.create);

  // Retrieve all products
  app.get("/products", productController.findAll);

  // Retrieve a single product by ID
  app.get("/products/:productId", productController.findOne);

  // Update a product by ID
  app.put("/products/:productId", productController.update);

  // Delete a product by ID
  app.delete("/products/:productId", productController.delete);
};