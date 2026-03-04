const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// De super credentials trop secure et discret :) :)
const db = mysql.createPool({
  host: "db",
  user: "root",
  password: "root",
  database: "tetris",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function waitForDatabase() {
  return new Promise((resolve) => {
    const tryConnection = () => {
      db.query("SELECT 1", (err) => {
        if (err) {
          console.log("BDD pas prete...");
          setTimeout(tryConnection, 2000);
        } else {
          console.log("BDD connecte !");
          resolve();
        }
      });
    };
    tryConnection();
  });
}

async function startServer() {
  await waitForDatabase();

  db.query(`
    CREATE TABLE IF NOT EXISTS scores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nom VARCHAR(50),
      score INT
    );
  `, (err) => {
    if (err) {
      console.error("Erreur a la creation de table :", err);
    }
  });

  app.listen(8080, () =>
    console.log("Le serveur tourne sur 8080")
  );
}

startServer();


// Routes post et get pour le score 
app.post("/score", (req, res) => {
  const { nom, score } = req.body;

  if (!nom || score == null) {
    return res.status(400).send("Donnees invalides");
  }

  db.query(
    "INSERT INTO scores (nom, score) VALUES (?, ?)",
    [nom, score],
    (err) => {
      if (err) {
        console.error("Erreur d'insertion :", err);
        return res.status(500).send("Erreur BDD");
      }

      res.send("Score sauvegarde");
    }
  );
});

app.get("/scores", (req, res) => {
  db.query(
    "SELECT * FROM scores ORDER BY score DESC LIMIT 10",
    (err, results) => {
      if (err) {
        console.error("Erreur BDD :", err);
        return res.status(500).send("Erreur BDD");
      }

      res.json(results);
    }
  );
});