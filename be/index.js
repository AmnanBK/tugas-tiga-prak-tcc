require('dotenv').config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

// Inisialisasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting Routes
require("./schema/Note"); // Untuk generate Tabel Notes
app.use("/api/notes", noteRoutes); // Untuk setting routes note

// Route dasar untuk testing
app.get("/ping", (req, res) => {
  res.send("Pong!");
});

// Sync Database dan Jalankan Server
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error("Unable to sync the database:", err);
});
