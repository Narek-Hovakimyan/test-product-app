const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is working" });
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 250000 },
    { id: 2, name: "Phone", price: 180000 },
    { id: 3, name: "Headphones", price: 40000 }
  ]);
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});