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
    type: String, // image URL from /upload or seed
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

// ================== ORDER MODEL ==================
const Order = mongoose.model("Order", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  items: [
    {
      productId: { type: Number, required: true }, // Product.id
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    default: "Not provided",
  },
  status: {
    type: String,
    enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PLACED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ================== REVIEW MODEL ==================
const Review = mongoose.model("Review", {
  productId: {
    type: Number,
    required: true, // Product.id
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer", // ⭐ default
  },
  cartData: {
    type: Object,
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

// Admin-only guard
const requireAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }
    next();
  } catch (err) {
    console.error("requireAdmin error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
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
    const { name, image, category, new_price, old_price, id } = req.body;

    // basic validation
    if (!name || !image || !category || new_price == null || old_price == null) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 1) decide product id
    let numericId;

    // if admin sends an id, use it
    if (id !== undefined && id !== null) {
      numericId = Number(id);
    } else {
      // else generate next id based on max existing id
      const lastProduct = await Product.findOne().sort({ id: -1 }).lean();
      numericId = lastProduct ? lastProduct.id + 1 : 1;
    }

    // 2) create product
    const product = new Product({
      id: numericId,
      name,
      image,
      category,
      new_price,
      old_price,
    });

    await product.save();
    console.log("✅ Product saved:", product);

    return res.json({
      success: true,
      product,
    });
  } catch (err) {
    console.error("❌ Add product error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
});

// Edit product
app.post("/editproduct", async (req, res) => {
  try {
    const { id, name, image, category, new_price, old_price, available } =
      req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product id is required" });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (new_price !== undefined) updateData.new_price = new_price;
    if (old_price !== undefined) updateData.old_price = old_price;
    if (available !== undefined) updateData.available = available;

    const product = await Product.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("Updated product:", product.id);
    res.json({ success: true, product });
  } catch (err) {
    console.error("Edit product error:", err.message);
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
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found with same email",
      });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
      // role: "customer"  // optional, default already set
    });

    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");

    // ⭐ include role + name
    res.json({
      success: true,
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== LOGIN ROUTE ==================
app.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.json({ success: false, errors: "Wrong Email Id" });
    }

    const passCompare = req.body.password === user.password;
    if (!passCompare) {
      return res.json({ success: false, errors: "Wrong Password" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");

    // ⭐ include role + name
    return res.json({
      success: true,
      token,
      role: user.role,
      name: user.name,
    });
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

// ================== PRODUCT REVIEWS ==================

// Add review to a product
app.post("/products/:id/reviews", fetchUser, async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const review = new Review({
      productId,
      userId: req.user.id,
      rating,
      comment: comment || "",
    });

    await review.save();
    res.json({ success: true, review });
  } catch (err) {
    console.error("Add review error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get reviews + average rating for a product
app.get("/products/:id/reviews", async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const reviews = await Review.find({ productId }).sort({
      createdAt: -1,
    });

    const count = reviews.length;
    const avg =
      count === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.rating, 0) / count;

    res.json({
      success: true,
      averageRating: avg,
      count,
      reviews,
    });
  } catch (err) {
    console.error("Get reviews error:", err.message);
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
    const userId = req.user.id;
    const itemId = req.body.itemId;

    let user = await Users.findById(userId);

    if (!user) {
      console.log("AddToCart: user not found:", userId);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cartData) user.cartData = {};

    const key = String(itemId);
    if (user.cartData[key] == null) {
      user.cartData[key] = 0;
    }

    user.cartData[key] += 1;

    await user.save();

    console.log("AddToCart: cart after add =", user.cartData);

    // ⭐ return full latest cart so frontend uses THIS as truth
    return res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Remove item from cart (decrement, not delete) for logged-in user
 * body: { itemId: <number> }
 */
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    let user = await Users.findById(userId);

    if (!user) {
      console.log("RemoveFromCart: user not found:", userId);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cartData) user.cartData = {};

    const key = String(itemId);
    if (user.cartData[key] > 0) {
      user.cartData[key] -= 1;
    }

    await user.save();

    console.log("RemoveFromCart: cart after remove =", user.cartData);

    return res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (err) {
    console.error("Remove from cart error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Get cart for logged-in user
 * returns: { ...cartData }
 */
app.post("/getcart", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("GetCart for user:", userId);

    let user = await Users.findById(userId);

    if (!user) {
      console.log("GetCart: user not found:", userId);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cartData) user.cartData = {};

    console.log("GetCart: sending cart =", user.cartData);

    return res.json(user.cartData);
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== CHECKOUT / ORDERS ==================

// Place order using current cart
app.post("/checkout", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress } = req.body;

    const user = await Users.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {};
    const productIds = Object.keys(cartData)
      .filter((id) => cartData[id] > 0)
      .map((id) => Number(id));

    if (productIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty" });
    }

    const products = await Product.find({ id: { $in: productIds } });

    const items = products.map((p) => {
      const quantity = cartData[p.id] || 0;
      return {
        productId: p.id,
        name: p.name,
        price: p.new_price,
        quantity,
      };
    });

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress: shippingAddress || "Not provided",
      status: "PLACED",
    });

    await order.save();

    // clear cart entries for these products
    const newCart = { ...cartData };
    productIds.forEach((id) => {
      newCart[id] = 0;
    });
    user.cartData = newCart;
    await user.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
      order,
    });
  } catch (err) {
    console.error("Checkout error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get current user's orders
app.get("/orders", fetchUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Get orders error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get single order (only if it belongs to user)
app.get("/orders/:orderId", fetchUser, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id,
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error("Get order error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== ADMIN: ORDERS (Monitor Transactions / View Sales) ==================

// Admin: see all orders
app.get("/admin/orders", fetchUser, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Admin orders error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Admin: update order status
app.put(
  "/admin/orders/:orderId/status",
  fetchUser,
  requireAdmin,
  async (req, res) => {
    try {
      const { status } = req.body;
      const allowed = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

      if (!allowed.includes(status)) {
        return res.status(400).json({ success: false, message: "Bad status" });
      }

      const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status },
        { new: true }
      );

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      res.json({ success: true, order });
    } catch (err) {
      console.error("Update order status error:", err.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// ================== ADMIN: MANAGE USERS ==================

// list users
app.get("/admin/users", fetchUser, requireAdmin, async (req, res) => {
  try {
    const users = await Users.find({}, "name email role");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Admin users error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// change user role (customer / seller / admin)
app.put(
  "/admin/users/:userId/role",
  fetchUser,
  requireAdmin,
  async (req, res) => {
    try {
      const { role } = req.body;
      const allowedRoles = ["customer", "seller", "admin"];

      if (!allowedRoles.includes(role)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid role value" });
      }

      const user = await Users.findByIdAndUpdate(
        req.params.userId,
        { role },
        { new: true, select: "name email role" }
      );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      console.log("Admin updated user role:", user.email, "->", user.role);
      res.json({ success: true, user });
    } catch (err) {
      console.error("Admin update user role error:", err.message);
      res
        .status(500)
        .json({ success: false, message: "Server error" });
    }
  }
);

// ================== START SERVER ==================
app.listen(port, (error) => {
  if (!error) {
    console.log("🚀 Server running on port " + port);
  } else {
    console.error("❌ Server failed to start:", error);
  }
});
