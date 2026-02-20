const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// De super credentials trop secure et discret :) :)
const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "tetris"
});

db.connect(() => console.log("MySQL est ok !"));

db.query(`CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    score INT);`);

// Routes post et get pour le score 
app.post("/score", (req, res) => {
  const { nom, score } = req.body;
  db.query("INSERT INTO scores (nom, score) VALUES (?, ?)", [nom, score]);
  res.send("Score saved");
});

app.get("/scores", (req, res) => {
  db.query("SELECT * FROM scores ORDER BY score DESC LIMIT 10",
    (err, topScores) => res.json(topScores)
  );
});

app.listen(8080, () => console.log("Le serveur tourne ! :)"));