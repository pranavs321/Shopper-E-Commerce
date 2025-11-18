// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
const port = 4000;

// ================== MIDDLEWARES ==================
app.use(cors());
app.use(express.json()); // parses JSON bodies

// ================== MONGODB CONNECT ==================
const MONGODB_URI =
  "mongodb+srv://pranavshomys_db_user:drtgkeme@cluster0.0dpwlrz.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// ================== MULTER STORAGE (IMAGE UPLOAD) ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "upload/images")); // backend/upload/images
  },
  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Serve uploaded images at: http://localhost:4000/images/<filename>
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// ================== BASIC ROUTE ==================
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// ================== PRODUCT MODEL ==================
const Product = mongoose.model("Product", {
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
    type: String, // image URL from /upload
    required: true,
  },
  category: {
    type: String, // "men", "women", "kid"
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
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// ================== USER MODEL ==================
const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object, // {0:0, 1:0, ..., 299:0}
    default: {},
  },
});

// ================== AUTH MIDDLEWARE ==================
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No auth token provided" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user; // { id: ... }
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid auth token" });
  }
};

// ================== IMAGE UPLOAD ROUTE ==================
app.post("/upload", (req, res) => {
  upload.single("product")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err.message);
      return res.status(400).json({
        success: 0,
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: 0,
        message:
          "No file received. Send form-data with a 'product' file field named 'product'.",
      });
    }

    const url = `http://localhost:${port}/images/${req.file.filename}`;

    return res.json({
      success: 1,
      image_url: url,
    });
  });
});

// ================== PRODUCT ROUTES ==================

// Add product
app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = 1;

    if (products.length > 0) {
      const last_product = products[products.length - 1];
      id = last_product.id + 1;
    }

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log("New product:", product);
    await product.save();
    console.log("Product Saved");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Remove product
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed product with id:", req.body.id);
    res.json({
      success: true,
    });
  } catch (err) {
    console.error("Remove product error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all products
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("All products fetched:", products.length);
    res.json(products); // plain array
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== SIGNUP ROUTE ==================
app.post("/signup", async (req, res) => {
  try {
    // 1) Check if email already exists
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found with same email",
      });
    }

    // 2) Create empty cart object with 300 items
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // 3) Create new user document
    const user = new Users({
      name: req.body.username, // match your frontend field
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    // 4) Create JWT token
    const data = {
      user: {
        id: user.id, // mongoose virtual id (string)
      },
    };

    const token = jwt.sign(data, "secret_ecom");

    // 5) Send token back
    res.json({ success: true, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== LOGIN ROUTE ==================
app.post("/login", async (req, res) => {
  try {
    // find user by email
    let user = await Users.findOne({ email: req.body.email });

    if (user) {
      const passCompare = req.body.password === user.password;

      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };

        const token = jwt.sign(data, "secret_ecom");

        return res.json({ success: true, token });
      } else {
        return res.json({
          success: false,
          errors: "Wrong Password",
        });
      }
    } else {
      return res.json({
        success: false,
        errors: "Wrong Email Id",
      });
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
      success: false,
      errors: "Server error, please try again later",
    });
  }
});

// ================== NEW COLLECTIONS ==================
app.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({});
    const newCollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newCollection);
  } catch (err) {
    console.error("Error fetching newcollections:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== POPULAR IN WOMEN ==================
app.get("/popularinwomen", async (req, res) => {
  try {
    const products = await Product.find({ category: "women" });
    console.log("Popular in women fetched, count:", products.length);
    const popular_in_women = products.slice(0, 4);
    res.send(popular_in_women);
  } catch (err) {
    console.error("Error fetching popular in women:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== CART ROUTES (PROTECTED) ==================

/**
 * Add item to cart for logged-in user
 * body: { itemId: <number> }
 */
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const itemId = req.body.itemId;

    if (userData.cartData[itemId] == null) {
      userData.cartData[itemId] = 0;
    }

    userData.cartData[itemId] += 1;

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    console.log("Added to cart:", itemId);
    res.send("Added");
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Remove item from cart (decrement, not delete) for logged-in user
 * body: { itemId: <number> }
 */
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const itemId = req.body.itemId;

    if (userData.cartData[itemId] > 0) {
      userData.cartData[itemId] -= 1;
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
      );
    }

    console.log("Removed from cart:", itemId);
    res.send("Removed");
  } catch (err) {
    console.error("Remove from cart error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Get cart for logged-in user
 * returns: { ...cartData }
 */
app.post("/getcart", fetchUser, async (req, res) => {
  try {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json(userData.cartData);
  } catch (err) {
    console.error("Get cart error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== START SERVER ==================
app.listen(port, (error) => {
  if (!error) {
    console.log("🚀 Server running on port " + port);
  } else {
    console.error("❌ Server failed to start:", error);
  }
});