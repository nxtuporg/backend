const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const app = express();
connectDB();

// Middleware setup
const cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 6969;

// Route imports
const eventsRoutes = require("./src/routes/eventsRoutes.js");
const messmenuRoutes = require("./src/routes/messmenuRoutes.js");
const clubRoutes = require("./src/routes/clubRoutes.js");
const carouselRoutes = require("./src/routes/carouselRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js");

// Basic route
app.get("/", (req, res) => {
  res.json("working");
});

// Route handlers
app.use("/api/events", eventsRoutes);
app.use("/api/user", authRoutes);
app.use("/api/messmenu", messmenuRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/carousel", carouselRoutes);

module.exports = app;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
