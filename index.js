const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());

// Create DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to MySQL on Railway!");
  }
});

// API to insert employee
app.post("/add-employee", (req, res) => {
  const { id,name, number } = req.body;

  const sql = "INSERT INTO emp (id,name, Number) VALUES (?, ?,?)";
  db.query(sql, [id,name, number], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      res.status(500).json({ message: "Error adding employee" });
    } else {
      res.json({ message: "Employee added successfully", id: result.insertId });
    }
  });
});

app.get("/get",(req,res)=>{
    const sql="select * from emp";
    db.query(sql,(err,result)=>{
        console.log(result);
    })
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
