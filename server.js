const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Swapna@123",
  database: "bubun_database",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

// POST route to save expense data
app.post("/api/expenses", (req, res) => {
  const { title, amount, description, category } = req.body;
  const sql =
    "INSERT INTO expenseTracker (title, amount, description, category) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, amount, description, category], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("Expense added successfully.");
  });
});

// GET route to fetch all expense data
app.get("/api/expenses", (req, res) => {
  const sql = "SELECT * FROM expenseTracker ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);  // Send the fetched data back to the client
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});