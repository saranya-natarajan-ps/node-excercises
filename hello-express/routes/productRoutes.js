// productRoutes.js

const express = require("express");
const router = express.Router();

// Sample data - Replace with your database or storage mechanism
let products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 39.99 },
];

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});

// POST a new product
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name: name,
    price: price,
  };
  products.push(newProduct);
  res.send(`Adding new product: ${newProduct.name}`);
});

// PUT update an existing product
router.put("/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const { name, price } = req.body;
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products[index].name = name;
    products[index].price = price;
    res.send(`Updating product: ${products[index].name}`);
  } else {
    res.status(404).send("Product not found");
  }
});

// DELETE a product
router.delete("/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.send(`Deleting product: ${deletedProduct[0].name}`);
  } else {
    res.status(404).send("Product not found");
  }
});

// Assume reviews are stored per product in a reviews array

// GET all reviews for a product
router.get("/:productId/reviews", (req, res) => {
  const productId = parseInt(req.params.productId);
  // Fetch reviews for productId from database or storage
  res.send(`Get reviews for product with ID ${productId}`);
});

// POST a new review for a product
router.post("/:productId/reviews", (req, res) => {
  const productId = parseInt(req.params.productId);
  const { review } = req.body;
  // Save review to database or storage for productId
  res.send(`Adding review '${review}' for product with ID ${productId}`);
});

// DELETE a review for a product
router.delete("/:productId/reviews/:reviewId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const reviewId = parseInt(req.params.reviewId);
  // Delete reviewId for productId from database or storage
  res.send(
    `Deleting review with ID ${reviewId} for product with ID ${productId}`
  );
});

// GET all products with query parameters
router.get("/", (req, res) => {
  try {
    let filteredProducts = [...products];

    // Filter by price range
    if (req.query.minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseInt(req.query.minPrice)
      );
    }
    if (req.query.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= parseInt(req.query.maxPrice)
      );
    }

    // Sort by name or price
    if (req.query.sort === "name") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (req.query.sort === "price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    res.json(filteredProducts);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
