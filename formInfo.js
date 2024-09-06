const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const movieRoutes = require("./routes/movieRoutes"); // Import movie routes

// Instantiating Express
const app = express();
app.use(express.static("public"));

// Middleware Use
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection error and success handlers
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Successfully connected to MongoDB!");
});

// Use movie routes
app.use("/api", movieRoutes);

// Catch-all route to serve React frontend (if built)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(45, () => {
  console.log("Server is running on port 45");
});
