require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Bonus: request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET / → serve HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET /api → "My Week 2 API!"
app.get("/api", (req, res) => {
  res.send("My Week 2 API!");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  res.status(201).json({ message: `Hello, ${name}!` });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} profile` });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));