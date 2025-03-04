const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);

module.exports = app;
