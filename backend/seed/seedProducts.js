// backend/seed/seedProducts.js
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const products = require("./seedProductsData"); // module.exports = all_product array

// 🔹 Use SAME URI as backend/index.js or from .env
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://pranavshomys_db_user:drtgkeme@cluster0.0dpwlrz.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

// 🔹 Define Product schema here (same as your app)
const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL like "http://localhost:4000/images/men1.jpg"
    required: true,
  },
  category: {
    type: String, // "men" | "women" | "kid"
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// 👇 This creates/uses the "products" collection (same as in your backend)
const Product = mongoose.model("Product", ProductSchema);

const run = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Mongo connected");

    const count = await Product.countDocuments();
    console.log("Existing products:", count);

    if (count === 0) {
      console.log("No products, seeding now...");
      const res = await Product.insertMany(products);
      console.log(`✅ Seeded ${res.length} products`);
    } else {
      console.log("Products already exist, not seeding.");
    }
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected. Exiting process.");
    process.exit();
  }
};

run();
